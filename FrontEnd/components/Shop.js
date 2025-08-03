import shopStyle from "../styles/Shop.module.css";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import Product from "./Product";
import { setProducts } from "../reducers/shop";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// const Shop = ({ title = "Name", desc = "Description", votes = 8 }) => {
const Shop = ({}) => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  // const [products, setProducts] = useState([]);

  useEffect(() => {

    fetch("http://localhost:3000/shop")
      .then((response) => response.json())
      .then((data) => {
        dispatch(setProducts(data.products));
        console.log(data.products)
      });


  }, [dispatch]);

  // const product = products.map((data, i) => {
  //   return <Product key={i} {...data}/>;
  // });


  return (

    <div className={shopStyle.body}>
      <div className={shopStyle.product}>
       <Product/>
      </div>
    </div>

  );
};

export default Shop;
