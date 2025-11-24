import React from "react";
import loginStyles from "../styles/Login.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { connect } from "../reducers/user";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faXmark } from "@fortawesome/free-solid-svg-icons";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const Sign = ({ mode, onLoginSuccess, onHideForm }) => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  async function handleAuth(mode, payload) {
    setLoading(true);
    const res = await fetch(`${API_URL}/users/${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setLoading(false);

    console.log("[Login Debug]", {
      status: res.status,
      data: data,
      hasResult: !!data.success
    });

    if (data.success) {
      dispatch(
        connect({
          username: data.user.username,
          bestScore: data.user.bestScore ?? 0,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        })
      );

      const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
      if (guestCart.length) {
        try {
          const res = await fetch(`${API_URL}/shop/cart/preview`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${data.accessToken}`,
            },
            body: JSON.stringify({ items: guestCart }),
          });
          const previewData = await res.json();
          if (previewData.success) {
            const applyRes = await fetch(`${API_URL}/shop/cart/apply`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.accessToken}`,
              },
              body: JSON.stringify({ items: guestCart }),
            });
            const applyData = await applyRes.json();
            if (applyData.success) {
              localStorage.removeItem("guestCart");
              console.log("Cart merged:", applyData.cart);
            }
          }
        } catch (err) {
          console.error("Cart sync error:", err);
        }
      }

      onHideForm?.();
      router.push("/");
      onLoginSuccess?.();
    } else {
      console.log((`Error: ${JSON.stringify(data)}`));
    }
  }

  const sign = () => {
    const isLogin = mode === "login";
    if (!isLogin) {
      const ok = EMAIL_RE.test(email.trim());
      setEmailError(ok ? "" : "Format d’e-mail invalide (ex. nom@domaine.com)");
      if (!ok) return;
    }

    const bodyObj = isLogin
      ? { identifier: userName, password }
      : { username: userName, email, password, name };

    handleAuth(isLogin ? "login" : "signup", bodyObj);
  };

  return (
    <div className={loginStyles.body}>
      <div
        className={`${loginStyles.overlay} ${
          mode === "signup" ? loginStyles.overlaySignup : loginStyles.overlay
        }`}
      >
        <FontAwesomeIcon
          icon={faXmark}
          className={loginStyles.close}
          onClick={onHideForm}
        />
        <div className={loginStyles.container2}>
          <div className={loginStyles.ThisChairsign}>
            <img
              src="/EcrisIcon/chair.svg"
              alt=""
              height={60}
              style={loginStyles.ChairSign}
            />
          </div>

          {mode === "signup" && (
            <>
              <input
                type="email"
                placeholder="Email"
                value={email}
                className={loginStyles.input}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError("");
                }}
                required
                pattern="^[^\s@]+@[^\s@]+\.[^\s@]{2,}$"
              />
              {email && emailError && (
                <div style={{ color: "#c62828", fontSize: 12, marginTop: 4 }}>
                  {emailError}
                </div>
              )}
            </>
          )}

          <input
            type="text"
            placeholder={mode === "login" ? "Username or Email" : "Username"}
            value={userName}
            className={loginStyles.input}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            className={loginStyles.input}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            disabled={loading}
            className={loginStyles.signin}
            onClick={sign}
          >
            {loading ? "..." : `Sign ${mode === "login" ? "in" : "up"}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sign;
