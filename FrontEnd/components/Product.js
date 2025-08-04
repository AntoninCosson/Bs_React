import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setCartList } from "../reducers/shop";
import Image from "next/image";
import prodStyles from "../styles/Product.module.css";


function Product() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const products = useSelector((state) => state.shop.products);

  const [cartList, setCartList] = useState([]);
  const [showAddedAnimation, setShowAddedAnimation] = useState(false);
  const [jumpAddIndex, setJumpAddIndex] = useState(null);
  const [jumpLikeIndex, setJumpLikeIndex] = useState(null);

  const handleLike = (product, idx) => {
    setCartList((prevCart) => [...prevCart, product]);
    setShowAddedAnimation(idx);
    setJumpAddIndex(idx);
    setTimeout(() => setJumpAddIndex(null), 300);
    // dispatch(setCartList(product))
    // setTimeout(() => setShowAddedAnimation(null), 111210);
    setTimeout(() => setShowAddedAnimation(null), 1210);
  };

useEffect(() => {
    console.log(cartList);
  }, [cartList]);

  return (
    <div className={prodStyles.body}>
        { products.map((data,i)=>{
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
                        <div className={prodStyles.btnLike}>
                            Add
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
                            <div 
                                className={ prodStyles.btnAddToCart + (jumpAddIndex === i ? ' ' + prodStyles.btnJump : '') }
                                    onClick={() => handleLike(data, i)}
                                >
                                Love
                            </div>
                        </div>
                    </div>
                    </div>
    </div>
            </div>
        </div>
        )
        })

        }
        </div>
  );
};

export default Product;


