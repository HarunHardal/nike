import axios from "axios";
import React, { useEffect, useState } from "react";
import Products from "./Products";

const  AllProducts = ()=> {
  const [products, setProducts] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:5001/product/allproducts")
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => {
      setProducts(data);
      console.log(data)
    });
  }, []);
  console.log(products);
  return (
    <div
      style={{ position: "relative", width: "100%", top: "200px", left: "25%" }}
    >
      {products &&
        products.map((e, i) => (
          <Products
     
            id={e._id}
            name={e.productName}
            gender={e.gender}
            type={e.type}
            price={e.price}
            items={e.items}
            sizes={e.sizes}
            key={i}
          />
        ))}
    </div>
  );
}
export default AllProducts