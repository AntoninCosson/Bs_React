import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { listProduct } from "../reducers/shop";
import Image from "next/image";
import prodStyles from "../styles/Product.module.css";


function Product() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const products = useSelector((state) => state.shop.products);



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
                    </div>

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
                </div>
            </div>
            )
        })

        }
        </div>
  );
};

export default Product;
