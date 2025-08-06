import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../reducers/user";

import loginstyle from "../styles/Login.module.css";
import ModalSstyle from '../styles/ModalLogout.module.css'

import Login from "./Login"

function ModalSign({ show, onClose, onHide, setSignin, setSignup, signin, signup }) {
  const dispatch = useDispatch();

  if (!show) return null;

  const handleLogout = () => {
    dispatch(logout());
    onClose();
  };


return (
<div className={loginstyle.login}>
    <div className={loginstyle.containerTexts}>
        { ( !signin && !signup) && (
            <button
                className={loginstyle.closeOut}
                onClick={() => {
                    onClose();
                    setSignin(false);
                    setSignup(false);
                }}>

                X

            </button>
        )}
            <p>New here?</p>
                {signin ? 
                    <Login 
                    close={setSignin} 
                    type={false}
                    onLoginSuccess={() => {
                        setShowLogin(false);
                        setSignin(false);
                        setSignup(false);
                        }}
                    />
                : 
                <div>
                    <button className={loginstyle.buttonSignUp} 
                    onClick={() => {
                    setSignin(true);
                    setSignup(false)}}>

                        Sign up

                    </button>
                </div>
                    }

                <p>
                    Welcome back beauty!
                </p>
            
                {signup ? 
                    <Login 
                        close={setSignup} 
                        type={true} 
                        onLoginSuccess={() => {
                            onClose();
                            setSignin(false);
                            setSignup(false);
                        }}
                />
                : 
                <button 
                    className={loginstyle.buttonSignin} 
                    onClick={() => {
                        setSignin(false);
                        setSignup(true)}}>

                        Sign in 
                
                </button>}
            
        </div>
</div>
    );
}

    export default ModalSign;