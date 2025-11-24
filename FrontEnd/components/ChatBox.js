// components/ChatBox.js
import { mcpHealth, mcpConfig, mcpCall } from "../lib/mcp";
import { useEffect, useRef, useState } from "react";
import { useStore } from "react-redux";
import { mcpAgent } from "../lib/mcp";
import ChatActionButtons from "./ChatActionButtons";
import Calendar from "./Calendar";

export default function Chatbox() {
  const [disableInput, setDisableInput] = useState(false);

  const [flowStep, setFlowStep] = useState("menu");

  const store = useStore();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [bookingState, setBookingState] = useState("getDate");
  const [ctx, setCtx] = useState({
    date: "",
    time: "",
    reservationId: "",
  });
  const [selectedDate, setSelectedDate] = useState("");

  const messagesEndRef = useRef(null);
  const scrollRef = useRef(null);
  const [streaming, setStreaming] = useState(false);

  const reDate = /(\d{4}-\d{2}-\d{2})/;
  const reTime = /(\d{2}:\d{2})/;

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3000";

  const [isSending, setIsSending] = useState(false);
  const [quotaExceeded, setQuotaExceeded] = useState(false);

  const [lastSentAt, setLastSentAt] = useState(0);
  const COOLDOWN_MS = 1500;

  const MAX_CHARS = 400;

  useEffect(() => {
    const loadWelcome = async () => {
      const state = store.getState();
      const token = state.user?.accessToken;

      if (!token) return;

      try {
        const res = await fetch(`${API_BASE}/mcp/welcome`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) return;

        const data = await res.json();
        if (data.success && data.data) {
          const normalizedMsg = {
            ...data.data,
            text: data.data.message,
            content: data.data.message,
          };
          setMessages([normalizedMsg]);
          setDisableInput(normalizedMsg.disableInput || false);
        }
      } catch (e) {
        console.error("[ChatBox] Welcome error:", e);
      }
    };

    loadWelcome();
  }, [store, API_BASE]);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function push(role, text, type = "text") {
    setMessages((prev) => [...prev, { role, text, type }]);
  }

  function getFlowButtons() {
    if (flowStep === "menu") return null;

    if (flowStep === "date_selection") {
      return {
        role: "assistant",
        type: "calendar",
        message: "Vers quelles dates seriez-vous disponible ?",
        disableInput: true,
        context: { step: "date_selection" },
      };
    }

    if (flowStep === "free_chat") return null;

    return null;
  }

  async function onActionClick(action) {
    const actionType = action.value?.action;

    push("user", action.label, "action");

    if (actionType === "back_to_menu") {
      setFlowStep("menu");

      const token = store.getState().user.accessToken;
      const res = await fetch(`${API_BASE}/mcp/welcome`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success && data.data) {
        const normalizedMsg = {
          ...data.data,
          text: data.data.message,
          content: data.data.message,
        };
        setMessages([normalizedMsg]);
        setDisableInput(normalizedMsg.disableInput || false);
      }
      return;
    }

    if (actionType === "show_calendar") {
      setFlowStep("date_selection");
      const buttons = getFlowButtons();
      if (buttons) {
        setMessages((prev) => [...prev, buttons]);
      }
      return;
    }

    if (actionType === "free_chat") {
      setFlowStep("free_chat");
      setBookingState(null);
      setDisableInput(false);
      return;
    }

    if (actionType === "back_to_calendar") {
      setFlowStep("date_selection");
      return;
    }

    if (actionType === "reserve_slot") {
      // TODO: Réserver le slot (étape 3)
      push(
        "system",
        `Réservation: ${action.value.date} à ${action.value.time}`
      );
      return;
    }

    if (actionType === "select_date") {
      // TODO: Appeler getAvailableSlots
      push("system", `Date sélectionnée: ${action.value.date}`);
      // On verra ça à l'étape 2
      return;
    }

    if (actionType === "select_alternative_date") {
      handleDateSelect(action.value.date);
      return;
    }
  }

  async function handleDateSelect(date) {
    setSelectedDate(date);
    push("user", `📅 ${date}`, "action");

    try {
      setIsSending(true);

      // ✅ Appeler la nouvelle fonction (retourne slots OU alternatives)
      const res = await mcpCall(
        "getAvailableSlots",
        { date },
        { getState: store.getState }
      );

      if (!res?.success) {
        push(
          "system",
          `Erreur: ${res?.message || "Impossible de récupérer les créneaux"}`
        );
        return;
      }

      // ✅ CAS 1: Slots trouvés
      if (res.type === "slots") {
        const slots = res.availableSlots || [];
        const message = {
          role: "assistant",
          type: "button_response",
          message: res.message,
          disableInput: true,
          actions: slots
            .map((time) => ({
              id: `slot_${time}`,
              label: `🕐 ${time}`,
              value: { action: "reserve_slot", date, time },
              style: "primary",
            }))
            .concat([
              {
                id: "back_calendar",
                label: "← Choisir une autre date",
                value: { action: "back_to_calendar" },
                style: "secondary",
              },
            ]),
        };

        setMessages((prev) => [...prev, message]);
        setFlowStep("time_selection");
        return;
      }

      // ✅ CAS 2: Pas de slots, afficher alternatives
      if (res.type === "alternatives") {
        const message = {
          role: "assistant",
          type: "button_response",
          message: res.message,
          disableInput: true,
          actions: res.alternatives
            .map((alt) => ({
              id: `alt_date_${alt.date}`,
              label: `📅 ${alt.date} (${alt.slotsCount} slots)`,
              value: { action: "select_alternative_date", date: alt.date },
              style: "primary",
            }))
            .concat([
              {
                id: "back_calendar2",
                label: "← Choisir une autre date",
                value: { action: "back_to_calendar" },
                style: "secondary",
              },
            ]),
        };

        setMessages((prev) => [...prev, message]);
        setFlowStep("time_selection");
        return;
      }
    } catch (e) {
      push("system", `Erreur: ${e.message}`);
    } finally {
      setIsSending(false);
    }
  }

  useEffect(() => {
    function onStorage(e) {
      if (e.key === "paymentConfirmed" && e.newValue) {
        push(
          "system",
          "Paiement confirmé ✅. Votre rendez-vous est finalisé. Merci !"
        );
        localStorage.removeItem("paymentConfirmed");
      }
    }

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function handleChange(e) {
    const val = e.target.value;
    if (val.length > MAX_CHARS) return;
    setInput(val);
  }

  async function addReservationToCart() {
    try {
      const token = store.getState().user.accessToken;
      const res = await fetch(`${API_BASE}/shop/cart/add-reservation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          reservationId: ctx.reservationId,
          date: ctx.date,
          time: ctx.time,
        }),
      });

      const data = await res.json();

      if (data.result || data.success) {
        store.dispatch({
          type: "shop/setCartFromServer",
          payload: data.cart,
        });

        push(
          "system",
          "Ajouté au panier 🛒. Vous pouvez payer depuis la boutique."
        );
      } else {
        push(
          "system",
          `Erreur: ${
            data.error ||
            data.message ||
            "Impossible d'ajouter l'acompte au panier."
          }`
        );
      }
    } catch (e) {
      push("system", `Erreur réseau: ${e.message}`);
    }
  }

  async function onSend(e) {
    e?.preventDefault?.();
    if (isSending || quotaExceeded || disableInput) return;

    const text = input.trim();
    if (!text) return;

    const now = Date.now();
    if (now - lastSentAt < COOLDOWN_MS) return;
    setLastSentAt(now);

    const userMsg = { role: "user", text };
    push("user", text);
    setInput("");

    try {
      setIsSending(true);

      if (quotaExceeded) setQuotaExceeded(false);

      if (bookingState === "getDate") {
        const m = text.match(reDate);
        if (!m) {
          push("system", "Donne-moi une date au format YYYY-MM-DD.");
          return;
        }
        const date = m[1];
        setCtx((prev) => ({ ...prev, date }));
        const res = await mcpCall(
          "getAvailableSlots",
          { date },
          { getState: store.getState }
        );
        if (!res?.success) {
          push("system", `Impossible de récupérer les créneaux pour ${date}.`);
          return;
        }
        const list =
          (res.availableSlots || []).map((s) => `• ${s}`).join("\n") ||
          "(aucun)";
        push(
          "system",
          `Créneaux le ${date}:\n${list}\n\nChoisis une heure (HH:MM).`
        );
        setBookingState("getTime");
        return;
      }

      if (flowStep === "free_chat") {
        const history = messages.map((m) => ({
          role: m.role,
          content: m.text || m.content || m.message || "",
        }));
        const result = await mcpAgent(
          [...history, { role: "user", content: text }],
          { getState: store.getState }
        );
      
        push(result.role, result.content);
        return;
      }

      if (bookingState === "getTime") {
        const m = text.match(reTime);
        if (!m) {
          push("system", "Donne-moi une heure au format HH:MM.");
          return;
        }
        const time = m[1];
        setCtx((prev) => ({ ...prev, time }));
        const res = await mcpCall(
          "reserveSlot",
          { date: ctx.date, time, service: "General Consultation" },
          { getState: store.getState }
        );
        if (!res?.success) {
          push("system", `Échec de réservation: ${res?.message || "inconnu"}`);
          return;
        }
        setCtx((prev) => ({ ...prev, reservationId: res.reservationId }));

        const mail = await mcpCall("sendConfirmationEmail", {
          reservationId: res.reservationId,
        });

        if (!mail?.success) {
          push(
            "system",
            `Réservé pour ${ctx.date} ${time} ✅\n⚠️ Email non envoyé: ${
              mail?.message || "inconnu"
            }.`
          );
        } else {
          push(
            "system",
            `Réservé pour ${ctx.date} ${time} ✅\nEmail de confirmation envoyé 📧\nID: ${res.reservationId}\nTape "reset" pour recommencer.`
          );
        }
        setBookingState("done");
        return;
      }

      if (bookingState === "done") {
        if (text.toLowerCase().includes("reset")) {
          setCtx({ date: "", time: "", email: "", reservationId: "" });
          setBookingState("getDate");
          push("system", "Ok, on repart. Donne une date (YYYY-MM-DD).");
        } else {
          push("system", 'Tape "reset" pour recommencer une réservation.');
        }
      }
    } catch (e) {
      if (e?.response?.status === 429 || e?.message?.includes("quota")) {
        setQuotaExceeded(true);
        push(
          "system",
          "⚠️ Vous avez atteint la limite journalière d'utilisation."
        );
      } else {
        push("system", `Erreur: ${e.message}`);
      }
    } finally {
      setIsSending(false);
    }
  }

  const stripeUrlRegex = /https:\/\/checkout\.stripe\.com\/\S*/;

  function renderMessageText(msg) {
    const text = msg.text || msg.content || "";
    const match = text.match(stripeUrlRegex);

    if (!match) {
      return text;
    }

    const url = match[0];
    const before = text.slice(0, match.index);
    const after = text.slice(match.index + url.length);

    return (
      <>
        {before && <span>{before}</span>}
        <br />
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={styles.stripeBtn}
        >
          Payer la réservation 💳
        </a>
        <button style={styles.cartBtn} onClick={() => addReservationToCart()}>
          Ajouter au panier 🛒
        </button>
        {after && (
          <>
            <br />
            <span>{after}</span>
          </>
        )}
      </>
    );
  }

  return (
    <div style={styles.wrap}>
      <div style={styles.header}>
        <div style={styles.dot} />
        <div style={{ fontWeight: 600 }}>Assistant RDV</div>
      </div>

      <div ref={scrollRef} style={styles.messages}>
        {messages.map((m, i) => (
          <div key={i}>
            {m.type === "button_response" ? (
              <ChatActionButtons message={m} onActionClick={onActionClick} />
            ) : (
              <div
                style={m.role === "user" ? styles.msgUser : styles.msgAssistant}
              >
                {renderMessageText(m)}
              </div>
            )}
            {flowStep !== "menu" &&
              flowStep !== "free_chat" &&
              getFlowButtons() && (
                <div style={styles.msgAssistant}>
                  <div>{getFlowButtons().message}</div>
                  {getFlowButtons().type === "calendar" && (
                    <Calendar onDateSelect={handleDateSelect} />
                  )}
                  <button
                    onClick={() => {
                      setFlowStep("menu");
                    }}
                    style={styles.backBtn}
                  >
                    ← Retour
                  </button>
                </div>
              )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* ✅ NEW: Input disparaît si disableInput === true */}
      <form
        onSubmit={onSend}
        style={{ ...styles.inputRow, display: disableInput ? "none" : "flex" }}
      >
        <input
          style={styles.input}
          value={input}
          onChange={handleChange}
          placeholder="Ou tapez votre message…"
          disabled={disableInput}
        />
        {quotaExceeded && (
          <div style={{ color: "#f87171", padding: "8px", fontSize: 12 }}>
            Vous avez atteint la limite journalière d'utilisation. Réessayez
            demain.
          </div>
        )}
        <button
          style={styles.btn}
          type="submit"
          disabled={isSending || quotaExceeded || disableInput}
        >
          {quotaExceeded ? "Quota atteint" : "Envoyer"}
        </button>
      </form>

      <div style={styles.hint}>
        {input.length}/{MAX_CHARS} caractères • Essayez : "Montre les créneaux",
        "Réserve 2025-11-11 11:00". "Confirme à email@domain.com".
      </div>
    </div>
  );
}

const styles = {
  wrap: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    color: "#e8ecf3",
    fontFamily: "ui-sans-serif, system-ui",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 12px",
    borderBottom: "1px solid #202538",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: "#6ee7b7",
    boxShadow: "0 0 8px #6ee7b7",
  },
  messages: {
    flex: 1,
    padding: 12,
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  msgUser: {
    alignSelf: "flex-end",
    background: "#2a2f42",
    border: "1px solid #323a55",
    borderRadius: 12,
    padding: "10px 12px",
    maxWidth: "85%",
  },
  msgAssistant: {
    alignSelf: "flex-start",
    background: "#1a1f2e",
    border: "1px solid #232a41",
    borderRadius: 12,
    padding: "10px 12px",
    maxWidth: "85%",
  },
  inputRow: {
    display: "flex",
    gap: 8,
    padding: 10,
    borderTop: "1px solid #202538",
    background: "#10131b",
  },
  input: {
    flex: 1,
    background: "#0d1119",
    color: "#e8ecf3",
    border: "1px solid #232a41",
    borderRadius: 10,
    padding: 12,
    outline: "none",
  },
  btn: {
    background: "#6ee7b7",
    color: "#052014",
    border: 0,
    padding: "10px 14px",
    borderRadius: 10,
    fontWeight: 700,
    cursor: "pointer",
  },
  stripeBtn: {
    display: "inline-block",
    marginTop: 8,
    padding: "8px 14px",
    borderRadius: 999,
    textDecoration: "none",
    fontWeight: 600,
    border: "1px solid #38bdf8",
    background: "linear-gradient(90deg, #0ea5e9, #22c55e)",
    color: "#0b1120",
    boxShadow: "0 0 10px rgba(34,197,94,0.4)",
    cursor: "pointer",
  },
  cartBtn: {
    marginTop: 10,
    padding: "10px 14px",
    borderRadius: 10,
    background: "#facc15",
    border: 0,
    color: "#1a1a1a",
    fontWeight: 700,
    cursor: "pointer",
  },
  backBtn: {
    marginTop: 10,
    padding: "10px 12px",
    borderRadius: 8,
    background: "#2a2f42",
    border: "1px solid #323a55",
    color: "#94a3b8",
    cursor: "pointer",
    fontSize: 14,
  },
  hint: { fontSize: 12, opacity: 0.7, padding: "4px 10px 10px" },
};
