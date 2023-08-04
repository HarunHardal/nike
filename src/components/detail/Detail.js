import React, { useEffect, useState } from "react";
import "./detail.css";
import { FastAverageColor } from "fast-average-color";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Detail = () => {
  const { id, name } = useParams();
  const [data, setData] = useState();
  const [rgb, setrgb] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const fac = new FastAverageColor();
  const navigate = useNavigate();

  

  const getRequest = async () => {
    const res = await axios
      .get(`https://leaveit-l0tz.onrender.com/product/${id}/${name}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    console.log(id);
    getRequest().then((data) => {
      setData(data.product);
      console.log(data);
      fac
        .getColorAsync(
          `/uploads/${data.product.items[activeIndex].productImage}`
        )
        .then((color) => {
          setrgb(color.hex);
        });
    });
  }, []);
  const handleClick = async (e) => {
    await fac
      .getColorAsync(`/uploads/${data && data.items[e].productImage}`)
      .then((color) => {
        setrgb(color.hex);
      });
  };

  const addCart = async (e) => {
    e.preventDefault();
    let productId = data && data._id;

    await axios
      .post(
        `https://leaveit-l0tz.onrender.com/cartdetail/cart/${localStorage.getItem(
          "userId"
        )}`,
        {
          productId: productId,
          quantity: 1,
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    console.log(productId);
  };
  const addFavorite = async (e) => {
    e.preventDefault();
    let productId = data && data._id;
    let productName = data && data.productName;
    let productImage = data&&data.items[0].productImage
    let productPrice = data&&data.price

    await axios
      .put(
        `https://leaveit-l0tz.onrender.com/user/add-fovorites/${localStorage.getItem(
          "userId"
        )}`,
        {
          productId: productId,
          productName: productName,
          productImage:productImage,
           productPrice:productPrice
        } //diğer bilgileride yolla resim gibi
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div className="detail-container">
      <div className="detail-background">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          overflow="visible"
          viewBox="0 0 960 540"
          preserveAspectRatio="none"
          className="detail-svg1"
          fill={rgb}
        >
          <path d="M0,0h896.073c0,0-6.098,227.888-350.609,540h-151.83C771.073,61.435,0,0,0,0z" />
        </svg>
        <div className="detail-svg1-shadow"></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          overflow="visible"
          viewBox="-29.400045 -17.46335 254.80039 104.7801"
          fill={rgb}
          className="detail-svg-logo"
        >
          <path d="M21.6203 69.825c-5.84-.232-10.618-1.83-14.354-4.798-.713-.567-2.412-2.267-2.982-2.984-1.515-1.905-2.545-3.759-3.232-5.816-2.114-6.332-1.026-14.641 3.112-23.76 3.543-7.807 9.01-15.55 18.548-26.274C24.1173 4.615 28.3013 0 28.3283 0c.01 0-.218.395-.505.876-2.48 4.154-4.602 9.047-5.758 13.283-1.857 6.797-1.633 12.63.656 17.153 1.579 3.116 4.286 5.815 7.33 7.307 5.329 2.611 13.131 2.827 22.659.632.656-.152 33.162-8.781 72.236-19.176 39.074-10.396 71.049-18.895 71.054-18.888.011.009-90.78 38.859-137.911 59.014-7.464 3.191-9.46 3.997-12.969 5.229-8.97 3.15-17.005 4.653-23.5 4.395z" />
        </svg>
        <div className="detail-shadow"></div>
      </div>
      <div className="product-detail-container">
        <div className="product-detail">
          <div className="product-name-wrapper">
            <h2>{data && data.productName}</h2>
            <span>{data && data.type}</span>
          </div>
          <div className="product-price">
            <p> {data && data.price} $ </p>
          </div>
          <div className="colors-wrapper">
            <p> Colors</p>
            <div className="colors">
              {data &&
                data.items.map((e, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      handleClick(i);
                      setActiveIndex(i);
                    }}
                    style={{ backgroundColor: e.color }}
                    className={`${
                      i === activeIndex ? "active select" : "select"
                    }`}
                  ></div>
                ))}
            </div>
          </div>
          <div className="product-size">
            <p>Select Size</p>
            <div className="sizes">
              {data &&
                data.sizes.map((e, i) => (
                  <span
                    key={i}
                    className={`${(e.stock = true ? "size" : "noStock")}`}
                  >
                    UK {e.size}
                  </span>
                ))}
            </div>
          </div>
          <div className="product-buttons">
            <div
              onClick={()=>localStorage.getItem("userId")===null?navigate("/singup"):addCart}
              className=" product-button product-add-button "
            >
              ADD TO CARD
            </div>
            <div
              onClick={()=>localStorage.getItem("userId")===null?navigate("/singup"):addFavorite}
              className=" product-button product-favorite-button"
            >
              ADD TO FAVORITE
            </div>
          </div>
        </div>
        <div className="product-img-des">
          <div className="product-image-container">
            <img
              className="product-image"
              alt={data && data.productName}
              src={`/uploads/${data && data.items[activeIndex].productImage}`}
            />
          </div>
          <div className="product-description">
            <p className="description">{data && data.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
