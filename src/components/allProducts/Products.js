import React, { useEffect, useState } from "react";
import "./allproducts.css";
import axios from "axios";
export default function Products({
  id,
  name,
  gender,
  type,
  price,
  items,
  sizes,
}) {
  const [item, setItem] = useState({
    color: "",
    productImage: "",
  });
  const [size, setSize] = useState({
    size: "",
    stock: ""
  })
  const [ID, setID] = useState();
  const [click, setClick] = useState();
  const [sizeClick, setSizeClick] = useState();
  const handleClick = () => {
    setClick(!click);
  };
  const handleSize = () => {
    setSizeClick(!sizeClick);
  };

  const sendRequest = async () => {
    const formData = new FormData();

    formData.append("color", item.color);
    formData.append("productImage", item.productImage);

    const res = await axios
      .put(`http://localhost:5001/product/update/${ID}`, formData)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const sendRequest2 = async () => {
    const formData = new FormData();

    formData.append("size", size.size);
    formData.append("stock", size.stock);

    const res = await axios
      .put(`http://localhost:5001/product/update/sizes/${ID}`, formData)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSizeChange =(e)=>{
    setSize({...size, [e.target.name]: e.target.value})
  }

  const handlePhoto = (e) => {
    setItem({ ...item, productImage: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then((data) => console.log(data));
  };

  const handleSizeSubmit = (e)=>{
    e.preventDefault();
    sendRequest2().then((data) => console.log(data));
  }
  return (
    <>
      <div className="products-container">
        <div className="products-info">
          {console.log(items[0].productImage)}
          <div><img style={{width: "100%"}} src={`/uploads/${items[0].productImage}`} alt={items[0].color} /></div>
          <div style={{margin:"0 20px"}}>
            <p>{id}</p>
            <h2>{name}</h2>
            <p>{type}</p>
            <p>{gender}</p>
          </div>
        </div>
        <div className="products-button">
          <button
            type="button"
            onClick={() => {
              handleClick();
              setSizeClick(false);
              setID(id);
            }}
          >
            {" "}
            Add Color and İmage{" "}
          </button>

          <button
            type="button"
            onClick={() => {
              handleSize();
              setClick(false);
              setID(id);
            }}
          >
            {" "}
            Add Size and Stock{" "}
          </button>
        </div>
      </div>
      {click ? (
        <div className="product-menu">
          <form onSubmit={handleSubmit}>
            <label>Color</label>
            <input
              type="text"
              placeholder="color"
              name="color"
              onChange={handleChange}
            />
            <label>Add Image</label>
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              name="productImage"
              onChange={handlePhoto}
            />
            <input type="submit" />
          </form>
        </div>
      ) : null}
      {sizeClick ? (
        <div className="product-menu">
          <form onSubmit={handleSizeSubmit}>
          <label>Add Size</label>
            <input
              type="size"
              placeholder="size"
              name="size"
              onChange={handleSizeChange}
            />
            <label>Add Stock</label>
            <input
              type="stock"
              placeholder="stock"
              name="stock"
              onChange={handleSizeChange}
            />
            <input type="submit" />
          </form>
        </div>
      ) : null}
    </>
  );
}
