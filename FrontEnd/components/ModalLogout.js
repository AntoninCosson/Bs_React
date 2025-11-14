import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../reducers/user";
import { setCartFromServer, setCartLis, clearCart } from "../reducers/shop";

import loginstyle from "../styles/Login.module.css";
import Modalstyle from "../styles/ModalLogout.module.css";

function ModalLogout({ show, onClose }) {
  const dispatch = useDispatch();

  if (!show) return null;

  const handleLogout = () => {
    localStorage.removeItem("guestCart");

    dispatch(clearCart());

    dispatch(logout());
    onClose();
  };

  return (
    <div className={Modalstyle.logoutcontainer}>
      <div className={Modalstyle.logoutDiv}>
        <div
          className={Modalstyle.logout}
          onClick={() => {
            handleLogout();
            onClose();
          }}
        >
          Logout
        </div>

        <button className={Modalstyle.closeLogout} onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
}

export default ModalLogout;
