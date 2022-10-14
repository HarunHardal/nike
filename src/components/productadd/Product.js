import React, { useState } from "react";
import "./product.css";
import axios from "axios";
const Product = () => {
  const [newUser, setNewUser] = useState({
    productName: "",
    type: "",
    gender: "",
    description: "",
    price: "",
    color: "",
    productImage: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("productName", newUser.productName);
    formData.append("type", newUser.type);
    formData.append("gender", newUser.gender);
    formData.append("description", newUser.description);
    formData.append("price", newUser.price);
    formData.append("color", newUser.color);
    formData.append("productImage", newUser.productImage);

    axios
      .post("http://localhost:5001/product/add/", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    setNewUser({ ...newUser, productImage: e.target.files[0] });
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          placeholder="name"
          name="productName"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="type"
          name="type"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="gender"
          name="gender"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="description"
          name="description"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="price"
          name="price"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="color"
          name="color"
          onChange={handleChange}
        />
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          name="productImage"
          onChange={handlePhoto}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Product;
