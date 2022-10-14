import axios from "axios";
import { FastAverageColor } from "fast-average-color";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./productsAll.css";

const ProductsAll = () => {
  const fac = new FastAverageColor();
  const [backgroundColors, setBackgroundColors] = useState([]);
  const [type, setType] = useState("");
  const { gender } = useParams();
  const history = useNavigate();
  const [query, setQuery] = useState();
  const [data, setData] = useState();

  const getRequest = async () => {
    const cGender = gender.charAt(0).toUpperCase() + gender.slice(1);
    setQuery(cGender);
    const res = await axios
      .get(`https://asdadsadasdf.herokuapp.com/product/allproducts/products/${cGender}`, {})
      .catch((err) => console.log(err));
    const data = await res.data;

    return data;
  };

  useEffect(() => {
    getRequest().then((data) => {
      setData(data.products);
    });
  }, [gender]);

  const handleClick = (e) => {
    const cGender = gender.charAt(0).toUpperCase() + gender.slice(1);
    setType(e.currentTarget.textContent);
    axios
      .get(`https://asdadsadasdf.herokuapp.com/product/allproducts/products/${cGender}`, {
        params: { type: e.currentTarget.textContent },
      })
      .then((res) => setData(res.data.products));
  };
  const getAll = () => {
    axios
      .get(`https://asdadsadasdf.herokuapp.com/product/allproducts/products/${query}`)
      .then((res) => setData(res.data.products));
  };

  return (
    <div className="products-result-wrapper">
      <div className="products-menu">
        <h1>{gender} shoes</h1>
        <div className="shoe-types">
          <ul>
            <li onClick={getAll}>All</li>
            <li onClick={handleClick}>LifeStyle</li>
            <li onClick={handleClick}>Jordan</li>
            <li onClick={handleClick}>Running</li>
            <li onClick={handleClick}>Basketball</li>
            <li onClick={handleClick}>Boots</li>
          </ul>
        </div>
        <div className="gender-wrapper">
          <h2>Gender</h2>
          <ul>
            <li
              onClick={() => {
                history("/products/men");
              }}
            >
              Men
            </li>
            <li
              onClick={() => {
                history("/products/women");
              }}
            >
              Women
            </li>
          </ul>
        </div>
        <div className="kids-wrapper">
          <h2>Kids</h2>
          <ul>
            <li
              onClick={() => {
                history("/products/boy");
              }}
            >
              Boys
            </li>
            <li
              onClick={() => {
                history("/products/girl");
              }}
            >
              Girls
            </li>
          </ul>
        </div>
      </div>
      <div className="products-result-container">
        {data &&
          data.map((e, i) => (
            <Link
              to={`/detail/${e._id}/${e.productName}`}
              style={{ textDecoration: "none" }}
            >
              <div
                className="products-result"
                onMouseEnter={() => {
                  fac
                    .getColorAsync(`/uploads/${e.items[0].productImage}`)
                    .then((c) => setBackgroundColors(c.hex));
                }}
                onMouseLeave={() => setBackgroundColors("")}
                key={i}
              >
                <img
                  className="products-result-image"
                  src={`/uploads/${e.items[0].productImage}`}
                  alt={i}
                />
                <div
                  style={{
                    backgroundColor: backgroundColors,
                    background: ` radial-gradient(circle, ${backgroundColors} 0%, rgba(0,0,0,0) 70%)`,
                  }}
                  className="products-result-image-bg"
                >
                  {" "}
                </div>
                <div className="products-wrapper">
                  <div>
                    <h2 className="products-name">{e.productName}</h2>
                  </div>
                  <div>
                    <h3 className="products-type">{e.type}</h3>
                  </div>
                  <div>
                    <h3 className="products-price">{e.price}$</h3>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ProductsAll;
