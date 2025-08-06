import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../reducers/user';

import homeStyles from "../styles/Home.module.css";
import loginstyle from "../styles/Login.module.css";
import loginStyles from '../styles/Login.module.css'


import { removeFromCart } from "../reducers/shop";

import Shop from "./Shop"
import WhereIsChairButton from "./WhereIsChairButton";
import ChairSavage from "./ChairSavage";
import ChairGame from "./ChairGame";
import ModalLogout from "./ModalLogout"
import ModalSign from "./ModalSign"


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";

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

  const [clickCount, setClickCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const isLogged = useSelector((state) => state.user.connected);
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.shop.cartList);
  const products = useSelector((state) => state.shop.products); 
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
  }

  // const handleLogout = () => {
  //   dispatch(logout());
  //   setShowLogin(false);
  // };

  const handleDeleteOneCart = (prod, idx) => {
    dispatch(removeFromCart({ index: idx }));
  };


  return (
  <div className={homeStyles.body}>
    {/* Header */}
    <div className={homeStyles.header}>

      <div className={homeStyles.headerBtnBlock}>
        { isLogged && (
          <h2 className={homeStyles.Displayusername}>@{user.username}</h2>
        )}

        <FontAwesomeIcon 
          icon={faUser}
          className={homeStyles.btnConnect}
          onClick={() => handleShowLogin()}
        />

        <div className={homeStyles.btnCartDiv}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
              <FontAwesomeIcon 
                icon={faCartShopping}
                className={homeStyles.btnCart}>
              </FontAwesomeIcon>
              <div className={homeStyles.btnCartCount}>        
                {cart.length}
              </div>  
          

        </div>  
      </div>

  {/* Hover */}

    <div
    className={homeStyles.cartWrapper}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
  </div>

                                              {/*  */}
    <div className={`${homeStyles.btnCartHover} ${isHovered ? homeStyles.show : ""}`}>
      <div
      className={homeStyles.cartWrapper2}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
          <div className={homeStyles.overflow}>
            {cart.map((data, i) => (
              <div key={i}>
                <div className={homeStyles.cartContainer}>
                  <div>
                      <div
                      className={homeStyles.nameInCart}>
                        {data.name}
                      </div>
                      <div
                      className={homeStyles.sizeInCart}>
                        {data.size}
                      </div>
                      <div
                      className={homeStyles.priceInCart}>
                        {data.price}€
                      </div>
                  </div>
                  <div className={homeStyles.btnDeleteWraper}>
                      <div
                      className={homeStyles.btnDelete}
                      onClick={() => handleDeleteOneCart(data, i)}>
                        x
                      </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
      </div>
          <div className={homeStyles.cartFooter}>
          <div
            className={homeStyles.cartWrapper3}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
                <div>Payer</div>
          </div>
        </div>
  </div>

    <div className={loginstyle.logsWraper}>
        {isLogged && showLogin && !isChairSavageClicked &&(
          <ModalLogout
          show={showLogin} 
          onClose={() => setShowLogin(false)}
          onHide={() => setShowLogin(false)}
          
          />
        )}

      <div className={homeStyles.SignInUpBody}>
          {showLogin && !isLogged && !isChairSavageClicked &&(
              <ModalSign
              show={showLogin} 
              onClose={() => setShowLogin(false)}
              onHide={() => setShowLogin(false)}
              setSignin={setSignin}
              setSignup={setSignup}
              signin={signin}
              signup={signup}
              />
            
            )}
        </div>
  </div>
</div>
{/* Fin header */}


    {/* Big Buttons */}
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



      {isShopClicked && (
        <Shop
        username={user.username}
        />
      )}

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
