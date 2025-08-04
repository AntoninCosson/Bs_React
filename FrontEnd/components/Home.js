import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../reducers/user';

import homeStyles from "../styles/Home.module.css";
import loginstyle from "../styles/Login.module.css";
import loginStyles from '../styles/Login.module.css'


// import "antd/dist/antd.css";
// import { Button, Popover } from "antd";

import Shop from "./Shop"
import WhereIsChairButton from "./WhereIsChairButton";
import ChairSavage from "./ChairSavage";
import ChairGame from "./ChairGame";
import Login from "./Login"


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function HomeButtons() {
  const shopRef = useRef(null); // Pour manip hors DOM
  const portfolioRef = useRef(null); // ""
  const chairRef = useRef(null); // ""

  const [areButtonHomesVisible, setAreButtonHomesVisible] = useState(true);
  const [isChairVisible, setIsChairVisible] = useState(false);
  const [showWhereIsChairBtn, setShowWhereIsChairBtn] = useState(true); 
  const [isChairSavageClicked, setisChairSavageClicked] = useState(false);
  const [signin, setSignin] = useState(false);
  const [signup, setSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isShopClicked, setIsShopClicked] = useState(false);

  const isLogged = useSelector((state) => state.user.connected);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();


  

    useEffect(() => {
      document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
    }, []);

  const handleRevealChair = () => {
    setIsChairVisible(true);
    setShowWhereIsChairBtn(false);
  };

  const handle5ClickToGame = () => {
    setisChairSavageClicked(true);
    setAreButtonHomesVisible(false);
  };

  const handleShowLogin = () => {
    setShowLogin(true);
    setAreButtonHomesVisible(false);
    setShowWhereIsChairBtn(false);
  }

  const handleLogout = () => {
    dispatch(logout());
    setShowLogin(false);
    setAreButtonHomesVisible(true);
    setShowWhereIsChairBtn(true);
  };



  return (
    <div className={homeStyles.body}>
      <div className={homeStyles.header}>
       { isLogged && (
      <h2 className={homeStyles.Displayusername}>@{user.username}</h2>
      )}
        <FontAwesomeIcon icon={faUser} className={homeStyles.btnConnect}onClick={() => handleShowLogin()}></FontAwesomeIcon>
      </div>
      {areButtonHomesVisible && (
        <div className={homeStyles.bigButtons}>
          <div ref={portfolioRef} className={homeStyles.divPortfolio}>
            <button
              className={homeStyles.svgButton}
              onClick={() => alert("Prout !")}
            >
              <img
                className={homeStyles.Portfolio}
                src="/EcrisIcon/homePORTFOLIO.svg"
              />
            </button>
          </div>

          <div className={homeStyles.divShop}>
            <button className={homeStyles.svgButton}>
              <img
                ref={shopRef}
                className={homeStyles.Shop}
                src="/EcrisIcon/home-SHOP.svg"
                onClick={() => {
                  setShowLogin(false);
                  setSignin(false);
                  setSignup(false);
                  setAreButtonHomesVisible(false);
                  setShowWhereIsChairBtn(false);
                  setIsShopClicked(false);
                  setIsChairVisible(false);
                  setisChairSavageClicked(false);
                  setIsShopClicked(true)
                  
                }}
              />
            </button>
          </div>

          <div className={homeStyles.divNextGuest}>
            <button
              className={homeStyles.svgButton}
              onClick={() => alert("Prout !")}
            >
              <img
                className={homeStyles.NextGuest}
                src="/EcrisIcon/home-NEXTGUEST.svg"
              />
            </button>
          </div>
        </div>
      )}

      {showLogin && !isLogged && !isChairSavageClicked &&(
        
      <div className={loginstyle.login}>
        <div className={loginstyle.containerTexts}>
          { ( !signin && !signup) && (
          <button
          className={loginStyles.closeOut}
          onClick={() => {
            setShowLogin(false);
            setSignin(false);
            setSignup(false);
            setAreButtonHomesVisible(true);
            setShowWhereIsChairBtn(true);
            
          }}
        >
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
          setAreButtonHomesVisible(true);
          setShowWhereIsChairBtn(true);
        }}
         /> : 
         <button className={loginstyle.buttonSignUp} 
         onClick={() => {setSignin(true); setSignup(false)}} 
         >
          Sign up
          </button>}
            <p>Welcome back beauty!</p>

          {signup ? 
          <Login 
          close={setSignup} 
          type={true} 
          onLoginSuccess={() => {
            setShowLogin(false);
            setSignin(false);
            setSignup(false);
            setAreButtonHomesVisible(true);
            setShowWhereIsChairBtn(true);
          }}
          /> : 
          <button 
          className={loginstyle.buttonSignin} 
          onClick={() => {setSignin(false); setSignup(true)}} 
          >
            Sign in 
          </button>}

        </div>
    </div>
      )}

      {isLogged && showLogin && !isChairSavageClicked &&(
      <div className={loginstyle.logoutcontainer}>
        <div
        className={loginstyle.logout} 
        onClick={() => {
          handleLogout();
          setShowLogin(false);
          setAreButtonHomesVisible(true);
          setShowWhereIsChairBtn(true);
        }}
        >
          Logout
        </div>
        <button
        className={loginStyles.closeLogout}
        onClick={() => {
          setShowLogin(false);
          setSignin(false);
          setSignup(false);
          setAreButtonHomesVisible(true);
          setShowWhereIsChairBtn(true);
          
        }}
      >
        X
        </button>
      </div>
      )}

      {isShopClicked && (
        <Shop
        username={user.username}
        />
      )

      }

      {showWhereIsChairBtn && (
        <WhereIsChairButton
          onReveal={handleRevealChair}
          shopRef={shopRef}
          showWIC={showWhereIsChairBtn}
        />
      )}

      <div>
        {isChairVisible && (
          <ChairSavage
            chairRef={chairRef}
            portfolioRef={portfolioRef}
            shopRef={shopRef}
            onFinish={handle5ClickToGame}
          />
        )}
      </div>

      <div>{isChairSavageClicked && <ChairGame />}</div>
    </div>
  );
}

export default HomeButtons;
