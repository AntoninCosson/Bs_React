import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useStore } from "react-redux";
import { setCartFromServer, addOneToGuestCart } from "../reducers/shop";
import { fetchWithAuth } from "../lib/api";

import prodStyles from "../styles/Product.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faXmark } from "@fortawesome/free-solid-svg-icons";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

function Product() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value || state.user);
  const store = useStore();
  const products = useSelector((state) => state.shop.products);
  const [showAddedAnimation, setShowAddedAnimation] = useState(false);
  const [jumpAddIndex, setJumpAddIndex] = useState(null);
  const [jumpLikeIndex, setJumpLikeIndex] = useState(null);

  function toUICart(serverCart = []) {
    return serverCart
      .filter((i) => i?.productId)
      .map((i) => ({ ...i.productId, quantity: i.quantity }));
  }

  async function handleAdd(product, idx) {
    const productId = product._id || product.id;
    if (!productId) return alert("ID produit manquant");

    const accessToken = user?.accessToken;
    if (accessToken) {
      try {
        // console.log('AT len:', user?.accessToken?.length, 'AT head:', user?.accessToken?.slice(0,20));
        const res = await fetchWithAuth("/shop/cart/add", {
          method: "POST",
          body: { productId, quantity: 1 },
          getState: store.getState,
          dispatch,
        });

        if (res.ok && res.data?.success) {
          const uiCart = (res.data.cart || [])
            .filter((i) => i?.productId)
            .map((i) => ({ ...i.productId, quantity: i.quantity }));
          dispatch(setCartFromServer(uiCart));
        } else if (!user?.accessToken) {
          dispatch(addOneToGuestCart({ ...product, quantity: 1 }));
        }
      } catch (e) {
        return alert("Erreur réseau sur ajout panier");
      }
    } else {
      const key = "guestCart";
      const arr = JSON.parse(localStorage.getItem(key) || "[]");
      const i = arr.findIndex(
        (it) => String(it.productId) === String(productId)
      );
      if (i >= 0) arr[i].quantity += 1;
      else arr.push({ productId, quantity: 1 });
      localStorage.setItem(key, JSON.stringify(arr));
      dispatch(addOneToGuestCart({ ...product, quantity: 1 }));
    }

    setShowAddedAnimation(idx);
    setJumpAddIndex(idx);
    setTimeout(() => setJumpAddIndex(null), 300);
    setTimeout(() => setShowAddedAnimation(null), 1210);
  }

  // console.log("products:", products)

  return (
    <div className={prodStyles.body}>
      {products
        .filter((data) => data.category !== "Deposit")
        .map((data, i) => {
          return (
            <div
              key={data._id || data.id}
              className={prodStyles.containerProducts}
            >
              <div className={prodStyles.Product}>
                <div className={prodStyles.imgDiv}>
                  <img
                    src={data.img ? `/Artwork/${data.img}` : "/placeholder.jpg"}
                    className={prodStyles.img}
                  />

                  <div className={prodStyles.infos}>
                    <div className={prodStyles.descriptionDiv}>{data.name}</div>

                    <div className={prodStyles.descriptionDiv}>
                      {data.description}
                    </div>

                    <div className={prodStyles.descriptionDiv}>{data.size}</div>

                    <div className={prodStyles.descriptionDiv}>
                      {data.price}
                    </div>

                    <div className={prodStyles.descriptionDiv}>
                      {data.category}
                    </div>

                    <div className={prodStyles.descriptionDiv}>
                      {data.quantity}
                    </div>

                    <div className={prodStyles.descriptionDiv}>
                      {data.dateOnline}
                    </div>

                    <div className={prodStyles.descriptionDiv}>
                      {data.promotion}
                    </div>

                    <div className={prodStyles.btns}>
                      <div
                        icon={faCartShopping}
                        className={prodStyles.btnAddToCart}
                      >
                        -3
                      </div>

                      <div className={prodStyles.btnAndanimDiv}>
                        {showAddedAnimation === i && (
                          <div className={prodStyles.AddedAnimDiv}>
                            <img
                              src="/Anim/AddedAnimation.gif"
                              className={prodStyles.AddedAnim}
                              alt="Added animation"
                            />
                          </div>
                        )}
                        <FontAwesomeIcon
                          icon={faCartShopping}
                          className={
                            prodStyles.btnAddToCart +
                            (jumpAddIndex === i ? " " + prodStyles.btnJump : "")
                          }
                          onClick={() => handleAdd(data, i)}
                        ></FontAwesomeIcon>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Product;
