// FrontEnd/components/CartView.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { useRouter } from "next/router";
import { fetchWithAuth } from "../lib/api";
import { setCartFromServer, setCartFromGuest } from "../reducers/shop";

import AddressModal from "./AddressModal";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export default function CartView({ onClose }) {
  const router = useRouter();
  const { thanks, session_id } = router.query || {};
  const dispatch = useDispatch();
  const store = useStore();
  const isLogged = useSelector((s) => s.user.connected);
  const user = useSelector((s) => s.user);
  const cart = useSelector((s) => s.shop.cartList);

  const [showAddr, setShowAddr] = useState(false);

  const subTotal = cart.reduce(
    (s, p) => s + (Number(p.price) || 0) * (Number(p.quantity) || 0),
    0
  );

  //
  const [summary, setSummary] = useState(null);
  useEffect(() => {
    if (!thanks || !session_id) return;
    (async () => {
      try {
        const r = await fetch(`${API_URL}/payments/session/${session_id}`);
        const data = await r.json();
        if (data.result) setSummary(data);
      } catch (e) {}
    })();
  }, [thanks, session_id]);

  if (thanks) {
    return (
      <div style={{ padding: 24 }}>
        <h2>Merci pour votre commande 🎉</h2>
        {summary ? (
          <>
            {summary.customer_email && (
              <p>
                Un reçu a été envoyé à <b>{summary.customer_email}</b>.
              </p>
            )}
            <div style={{ marginTop: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Sous-total</span>
                <b>{summary.amount_subtotal.toFixed(2)} €</b>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>
                  Livraison{" "}
                  {summary.shipping_option
                    ? `(${summary.shipping_option})`
                    : ""}
                </span>
                <b>{summary.shipping.toFixed(2)} €</b>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 8,
                  fontSize: 18,
                }}
              >
                <span>Total payé</span>
                <b>{summary.amount_total.toFixed(2)} €</b>
              </div>
            </div>
            <ul style={{ listStyle: "none", padding: 0, marginTop: 16 }}>
              {summary.items.map((it, i) => (
                <li
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 80px 60px 100px",
                    gap: 12,
                    padding: "6px 0",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  <div>{it.name}</div>
                  <div>{it.unit_amount.toFixed(2)} €</div>
                  <div>× {it.quantity}</div>
                  <div style={{ textAlign: "right" }}>
                    {it.subtotal.toFixed(2)} €
                  </div>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
              <button onClick={() => router.push("/")}>
                Retour à l’accueil
              </button>
            </div>
          </>
        ) : (
          <p>Chargement du récap…</p>
        )}
      </div>
    );
  }

  // ===== Panier classique =====
  const updateQty = async (prod, qty) => {
    const q = Math.max(0, qty | 0);
    if (isLogged) {
      const res = await fetchWithAuth(`/shop/cart/${prod._id}`, {
        method: "PATCH",
        body: { quantity: q },
        getState: store.getState,
        dispatch,
      });
      if (res.ok && res.data?.result) {
        const ui = res.data.cart
          .filter((i) => i?.productId)
          .map((i) => ({ ...i.productId, quantity: i.quantity }));
        dispatch(setCartFromServer(ui));
      }
    } else {
      const key = "guestCart";
      const arr = JSON.parse(localStorage.getItem(key) || "[]");
      const i = arr.findIndex(
        (it) => String(it.productId) === String(prod._id)
      );
      if (i >= 0) {
        if (q <= 0) arr.splice(i, 1);
        else arr[i].quantity = q;
        localStorage.setItem(key, JSON.stringify(arr));
      }
      const byId = new Map(cart.map((p) => [String(p._id || p.id), p]));
      const ui = arr
        .map((it) => ({
          ...byId.get(String(it.productId)),
          quantity: it.quantity,
        }))
        .filter(Boolean);
      dispatch(setCartFromGuest(ui));
    }
  };

  const handleCheckout = async () => {
    if (!isLogged) return alert("Connecte-toi pour payer.");
    const res = await fetchWithAuth("/payments/checkout", {
      method: "POST",
      getState: store.getState,
      dispatch,
    });
    if (res.ok && res.data?.result) {
      window.location.href = res.data.url;
    } else {
      alert(res.data?.error || "Impossible de démarrer le paiement");
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Mon panier</h2>
      {cart.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cart.map((p, i) => (
              <li
                key={p._id || i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 100px 90px 110px",
                  gap: 12,
                  alignItems: "center",
                  padding: "8px 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                <div>
                  <div style={{ fontWeight: 600 }}>{p.name}</div>
                  {p.size && (
                    <div style={{ opacity: 0.7, fontSize: 12 }}>{p.size}</div>
                  )}
                </div>
                <div>{p.price} €</div>
                <div>
                  <select
                    value={p.quantity}
                    onChange={(e) => updateQty(p, parseInt(e.target.value, 10))}
                  >
                    {Array.from({ length: 11 }, (_, k) => k).map((k) => (
                      <option key={k} value={k}>
                        {k}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ textAlign: "right" }}>
                  {(p.price * p.quantity).toFixed(2)} €
                </div>
              </li>
            ))}
          </ul>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 16,
              fontSize: 18,
            }}
          >
            <div>Sous-total</div>
            <strong>{subTotal.toFixed(2)} €</strong>
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
            {onClose && <button onClick={onClose}>Continuer mes achats</button>}
            <button onClick={() => setShowAddr(true)}>Aller au paiement</button>

            {showAddr && (
              <AddressModal
                open={showAddr}
                onClose={() => setShowAddr(false)}
                defaultEmail={user?.email || ""}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
