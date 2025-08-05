
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setCartList, resetShop } from "../reducers/shop";

import prodStyles from "../styles/Product.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faXmark } from "@fortawesome/free-solid-svg-icons";


function Product() {
    
const dispatch = useDispatch();
const user = useSelector((state) => state.user.value);
const products = useSelector((state) => state.shop.products);   
const [showAddedAnimation, setShowAddedAnimation] = useState(false);
const [jumpAddIndex, setJumpAddIndex] = useState(null);
const [jumpLikeIndex, setJumpLikeIndex] = useState(null); 

const handleLike = (product, idx) => {
    dispatch(setCartList(product))
    setShowAddedAnimation(idx);
    setJumpAddIndex(idx);
    setTimeout(() => setJumpAddIndex(null), 300);
    // setTimeout(() => setShowAddedAnimation(null), 111210);
    setTimeout(() => setShowAddedAnimation(null), 1210);
};

// console.log("products:", products)

return (
    <div className={prodStyles.body}>
        {products.map((data,i)=>{
            return (
            <div className={prodStyles.containerProducts}>
                <div key={i} className={prodStyles.Product}>

                <div className={prodStyles.imgDiv}>
                            <img 
                            src={`/Artwork/${data.img}`}
                            className={prodStyles.img}
                            />
                        

                    <div className={prodStyles.infos}>
                        
                        <div className={prodStyles.descriptionDiv}>
                            {data.name}
                        </div>

                        <div className={prodStyles.descriptionDiv}>
                        {data.description}
                        </div>

                        <div className={prodStyles.descriptionDiv}>
                        {data.size}
                        </div>

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
                                className={ prodStyles.btnAddToCart}
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
                                className={ prodStyles.btnAddToCart + (jumpAddIndex === i ? ' ' + prodStyles.btnJump : '') }
                                    onClick={() => handleLike(data, i)}
                                >
                                {/* Love */}
                            </FontAwesomeIcon>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        )
    })}
        </div>
    );
};

export default Product;


