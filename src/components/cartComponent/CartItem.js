import axios from "axios";
import React, { useEffect, useState } from "react";
import "./cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function CartItem({ price, productId, quantity }) {
  const navigate = useNavigate();

  const [data, setData] = useState();

  const getRequest = async () => {
    const id = productId && productId;
    let res;
    if (id) {
      res = await axios
        .get(`https://asdadsadasdf.herokuapp.com/product/getProduct/${id}`)
        .catch((err) => console.log(err));
    }

    const data = await res.data;
    return data;
  };
  useEffect(() => {
    getRequest().then((data) => setData(data.product));
  }, []);

  const deleteRequest = async () => {
    const res = await axios
      .delete(
        `https://asdadsadasdf.herokuapp.com/cartDetail/cart/${localStorage.getItem(
          "userId"
        )}/${productId}`
      )
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleDelete = () => {
    deleteRequest()
      .then(() => navigate("/"))
      .then(() => navigate("/cart"));
    navigate("/");
  };

  return (
    <div className="cart-item-container">
      <img
        src={`/uploads/${data && data.items[0].productImage}`}
        alt={data && data.productName}
      />
      <div className="cart-item-data">
        <p className="cart-item-name">{data && data.productName}</p>
        <p className="cart-item-price">{data && data.price} $</p>
        <p className="cart-item-quantity"> Quantity: {quantity}</p>
        <FontAwesomeIcon
          onClick={handleDelete}
          className="cart-item-delete-button"
          icon={faTimes}
        />
      </div>
    </div>
  );
}

export default CartItem;
