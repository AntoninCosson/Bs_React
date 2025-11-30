import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reducers/user";
import { useStore } from "react-redux";
import { fetchWithAuth } from "../lib/api";
import {
  setCartFromGuest,
  removeFromCartByIndex,
  setCartFromServer,
} from "../reducers/shop";

import homeStyles from "../styles/Home.module.css";
import loginstyle from "../styles/Login.module.css";
import loginStyles from "../styles/Login.module.css";

import { removeFromCart } from "../reducers/shop";

import Shop from "./Shop";
import WhereIsChairButton from "./WhereIsChairButton";
import ChairSavage from "./ChairSavage";
import ChairGame from "./ChairGame";
import ModalLogout from "./ModalLogout";
import ModalSign from "./ModalSign";
import CartView from "./CartView";
import Modal from "./ModalChatBox";
import Chatbox from "./ChatBox";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";

function HomeButtons() {
  const store = useStore();
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
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const [clickCount, setClickCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const isLogged = useSelector((state) => state.user.connected);
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.shop.cartList);
  const products = useSelector((state) => state.shop.products);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (!isLogged) {
        const guest = JSON.parse(localStorage.getItem("guestCart") || "[]");
        const byId = new Map(products.map((p) => [String(p._id || p.id), p]));
        const uiCart = guest
          .map((it) => {
            const p = byId.get(String(it.productId));
            return p ? { ...p, quantity: it.quantity } : null;
          })
          .filter(Boolean);
        dispatch(setCartFromGuest(uiCart));
        return;
      }
      try {
        const res = await fetchWithAuth("/shop/cart", {
          getState: store.getState,
          dispatch,
        });
        if (res.ok && res.data?.success) {
          const uiCart = res.data.cart
            .filter((i) => i?.productId)
            .map((i) => ({ ...i.productId, quantity: i.quantity }));
          dispatch(setCartFromServer(uiCart));
        }
      } catch (e) {
        // no-op
      }
    })();
  }, [isLogged, dispatch, store]);

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
  };

  const formatEUR = (n) =>
    (Number(n) || 0).toLocaleString("fr-FR", {
      style: "currency",
      currency: "EUR",
    });

  const subTotal = (cart || []).reduce((sum, p) => {
    const price = Number(p.price) || 0;
    const qty = Number(p.quantity) || 0;
    return sum + price * qty;
  }, 0);

  const totalItems = (cart || []).reduce(
    (sum, p) => sum + (Number(p.quantity) || 0),
    0
  );

  const handleDeleteOneCart = async (prod, idx) => {
    if (!isLogged) {
      const key = "guestCart";
      const arr = JSON.parse(localStorage.getItem(key) || "[]");
      const i = arr.findIndex(
        (it) => String(it.productId) === String(prod._id)
      );
      if (i >= 0) {
        arr.splice(i, 1);
        localStorage.setItem(key, JSON.stringify(arr));
      }
      dispatch(removeFromCartByIndex({ index: idx }));

      return;
    }

    const res = await fetchWithAuth(`/shop/cart/${prod._id}`, {
      method: "DELETE",
      getState: store.getState,
      dispatch,
    });
    if (res.ok && res.data?.success) {
      const uiCart = (res.data.cart || [])
        .filter((i) => i?.productId)
        .map((i) => ({ ...i.productId, quantity: i.quantity }));
      dispatch(setCartFromServer(uiCart));
    }
  };

  return (
    <div className={homeStyles.body}>
      {/* Header */}
      <div className={homeStyles.header}>
        <div className={homeStyles.headerBtnBlock}>
          {isLogged && (
            <h2 className={homeStyles.Displayusername}>@{user.username}</h2>
          )}

          <FontAwesomeIcon
            icon={faUser}
            className={homeStyles.btnConnect}
            onClick={() => handleShowLogin()}
          />

          <div
            className={homeStyles.btnCartDiv}
            onMouseEnter={() => {
              setIsHovered(true);
              // console.log("btnCartDiv");
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              // console.log("Quit btnCartDiv");
            }}
          >
            <FontAwesomeIcon
              icon={faCartShopping}
              className={homeStyles.btnCart}
            ></FontAwesomeIcon>
            <div className={homeStyles.btnCartCount}>{cart.length}</div>
          </div>
        </div>

        {/* Hover */}

        <div
          className={homeStyles.cartWrapper}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        ></div>

        <div
          className={`${homeStyles.btnCartHover} ${
            isHovered ? homeStyles.show : ""
          }`}
        >
          <div
            className={homeStyles.cartWrapper2}
            onMouseEnter={() => {
              setIsHovered(true);
              // console.log("cartWrapper2");
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              // console.log("Quit cartWrapper2");
            }}
          >
            <div className={homeStyles.overflow}>
              {cart.map((data, i) => (
                <div key={i}>
                  <div className={homeStyles.cartContainer}>
                    <div>
                      <div className={homeStyles.nameInCart}>{data.name}</div>
                      <div className={homeStyles.sizeInCart}>{data.size}</div>
                      <div className={homeStyles.priceInCart}>
                        {data.price}€
                      </div>
                    </div>
                    <div>
                      <div className={homeStyles.sizeInCart}>
                        Qty: {data.quantity}
                      </div>
                    </div>
                    <div className={homeStyles.btnDeleteWraper}>
                      <div
                        className={homeStyles.btnDelete}
                        onClick={() => {
                          // console.log("DELETE click", { id: data._id, idx: i });
                          handleDeleteOneCart(data, i);
                        }}
                      >
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
              onMouseEnter={() => {
                setIsHovered(true);
                // console.log("cartWrapper3");
              }}
              onMouseLeave={() => {
                setIsHovered(false);
                // console.log("Quit cartWrapper3");
              }}
            >
              <div className={homeStyles.subtotalRow}>
                <span>
                  Sous-total ({totalItems}{" "}
                  {totalItems > 1 ? "articles" : "article"}){" "}
                </span>
                <strong> {formatEUR(subTotal)}</strong>
              </div>

              <div
                onClick={() => {
                  setIsCartOpen(true);
                  setShowLogin(false);
                  setSignin(false);
                  setSignup(false);
                  setAreButtonHomesVisible(false);
                  setShowWhereIsChairBtn(false);
                  setIsShopClicked(false);
                  setIsChairVisible(false);
                  setisChairSavageClicked(false);
                  setIsShopClicked(false);
                }}
                className={homeStyles.GotoCart}
              >
                Voir mon panier
              </div>
            </div>
          </div>
        </div>

        {/* fin */}

        <div className={loginstyle.logsWraper}>
          {isLogged && showLogin && !isChairSavageClicked && (
            <ModalLogout
              show={showLogin}
              onClose={() => setShowLogin(false)}
              onHide={() => setShowLogin(false)}
            />
          )}

          <div className={homeStyles.SignInUpBody}>
            {showLogin && !isLogged && !isChairSavageClicked && (
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
                  setIsShopClicked(true);
                }}
              />
            </button>
          </div>

          <div className={homeStyles.divNextGuest}>
            <button
              className={homeStyles.svgButton}
              onClick={() => setChatOpen(true)}
            >
              <img
                className={homeStyles.NextGuest}
                src="/EcrisIcon/home-NEXTGUEST.svg"
                alt="Prendre RDV"
              />
            </button>
            <Modal open={chatOpen} onClose={() => setChatOpen(false)}>
              <Chatbox />
            </Modal>
          </div>
        </div>
      )}

      {isShopClicked && <Shop username={user.username} />}

      {showWhereIsChairBtn && (
        <WhereIsChairButton
          onReveal={handleRevealChair}
          shopRef={shopRef}
          showWIC={showWhereIsChairBtn}
        />
      )}

      {isCartOpen && <CartView onClose={() => setIsCartOpen(false)} />}

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
