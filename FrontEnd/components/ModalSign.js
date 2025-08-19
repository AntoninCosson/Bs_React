// ModalSign.js
import React from "react";
import { useDispatch, useState } from "react-redux";
import { logout } from "../reducers/user";

import loginstyle from "../styles/Login.module.css";
import Login from "./Login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faXmark } from "@fortawesome/free-solid-svg-icons";

function ModalSign({ show, onClose, setSignin, setSignup, signin, signup }) {
  const dispatch = useDispatch();

  const hideForm = () => {
    console.log("Fermeture login")
    setSignin(false);
    setSignup(false);
  };

  if (!show) return null;

  return (
    <div className={loginstyle.login}>
      <div className={loginstyle.container}>
        {(!signin && !signup) && (
          <FontAwesomeIcon
            icon={faXmark}
            className={loginstyle.close}
            onClick={() => {
                onClose();
                hideForm();
              }}
          />
          
        )}

        {/* Partie “Sign up” */}
        <div className={loginstyle.txt1}>New here?</div>
        {signup ? (
          <Login
            type={"signup"}
            onClose={onClose}
            onHideForm={hideForm}
            onLoginSuccess={() => {
                onClose();
                hideForm();
            }}
          />
        ) : (
        <div className={loginstyle.divBtn}>
          <button
            className={loginstyle.buttonSignUp}
            onClick={() => {
              setSignin(false);
              setSignup(true);
            }}
          >
            Sign uup
          </button>
        </div>
        )}

        {/* Partie “Sign in” */}
        <div className={loginstyle.txt2}>Welcome back beauty!</div>
        {signin ? (
        <Login
        onClose={onClose}
        onHideForm={hideForm}
        type={"signin"}
        onLoginSuccess={() => {
            onClose();
            hideForm();
        }}
      />
        ) : (
        <div className={loginstyle.divBtn2}>
          <button
            className={loginstyle.buttonSignin}
            onClick={() => {
              setSignin(true);
              setSignup(false);
            }}
          >
            Sign in
          </button>

      </div>
        )}

      </div>
    </div>
  );
}

export default ModalSign;