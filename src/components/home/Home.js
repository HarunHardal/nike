import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./home.css";
import image6 from "../../images/PngItem_3249746.png";
import image4 from "../../images/PngItem_52854.png";
import image5 from "../../images/PngItem_4046493.png";
import recomandationImg1 from "../../images/travis-essinger-iOv3CqiZLtE-unsplash.jpg";
import jordan from "../../images/jordan.jpg";
import { FastAverageColor } from "fast-average-color";
import productIntroImg1 from "../../images/adrian-hernandez-gpii_myxZG0-unsplash.jpg";
import productIntroImg2 from "../../images/adrian-hernandez-bV4gkAHBTfA-unsplash.jpg";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [count, setCount] = useState();

  const [data, setData] = useState();
  const [data2, setData2] = useState();

  const getRequest = async () => {
    const res = await axios
      .get("https://leaveit-l0tz.onrender.com/product/allproducts")
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  useEffect(() => {
    getRequest()
      .then((data) => setData(data.slice(0, 5)))
      .then(console.log(data));
  }, []);

  const getRequest2 = async () => {
    const res = await axios
      .get("https://leaveit-l0tz.onrender.com/product/allproducts")
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  useEffect(() => {
    getRequest().then((data) => setData2(data.slice(7, 12)));
  }, []);

  const addCart = async (id) => {
    await axios
      .post(
        `http://localhost:5001/cartdetail/cart/${localStorage.getItem(
          "userId"
        )}`,
        {
          productId: id,
          quantity: 1,
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="home-container">
      <div className="slider-wrapper">
        <svg
          className="slide-circle"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="50" />
        </svg>
        <svg
          className="slide-logo"
          version="1.1"
          viewBox="135.5 361.38 1e3 356.39"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m 245.8075,717.62406 c -29.79588,-1.1837 -54.1734,-9.3368 -73.23459,-24.4796 -3.63775,-2.8928 -12.30611,-11.5663 -15.21427,-15.2245 -7.72958,-9.7193 -12.98467,-19.1785 -16.48977,-29.6734 -10.7857,-32.3061 -5.23469,-74.6989 15.87753,-121.2243 18.0765,-39.8316 45.96932,-79.3366 94.63252,-134.0508 7.16836,-8.0511 28.51526,-31.5969 28.65302,-31.5969 0.051,0 -1.11225,2.0153 -2.57652,4.4694 -12.65304,21.1938 -23.47957,46.158 -29.37751,67.7703 -9.47448,34.6785 -8.33163,64.4387 3.34693,87.5151 8.05611,15.898 21.86731,29.6684 37.3979,37.2806 27.18874,13.3214 66.9948,14.4235 115.60699,3.2245 3.34694,-0.7755 169.19363,-44.801 368.55048,-97.8366 199.35686,-53.0408 362.49439,-96.4029 362.51989,-96.3672 0.056,0.046 -463.16259,198.2599 -703.62654,301.0914 -38.08158,16.2806 -48.26521,20.3928 -66.16827,26.6785 -45.76525,16.0714 -86.76008,23.7398 -119.89779,22.4235 z" />
        </svg>

        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={true}
          onRealIndexChange={(e) => setCount(e.realIndex)}
          className="slider"
        >
          <div className="count-container">
            <div>{count === undefined ? 1 : count + 1}</div>
            <div>/</div>
            <div>5</div>
          </div>

          {data &&
            data.map((e, i) => (
              <SwiperSlide>
                <div className="slide-container">
                  <div className="slide-description-container">
                    <div className="slide-title">{e.productName}</div>
                    <div className="slide-description">{e.description}</div>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`detail/${e._id}/${e.productName}`}
                    >
                      <div className="slide-button">Go Shop</div>
                    </Link>
                  </div>
                  <div className="slide-image-wrapper">
                    <img
                      className="slide-image"
                      src={`/uploads/${e && e.items[0].productImage}`}
                      alt="pro"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      <div className="popular-products-wrapper">
        <div className="popular-products-title">
          <span>Popular</span>
          <span>Products</span>
        </div>
        <Swiper
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 150,
              centeredSlides: true,
            },
            768: {
              slidesPerView: 1.5,
              spaceBetween: 530,
            },
            990: {
              slidesPerView: 2,
              spaceBetween: 300,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 80,
            },
            1350: {
              slidesPerView: 3,
              spaceBetween: 300,
            },
          }}
          centeredSlides={true}
          loop={true}
          autoplay={true}
          style={{ width: "100%" }}
        >
          {data2 &&
            data2.map((e, i) => (
              <SwiperSlide key={i}>
                {" "}
                <div className="popular-products-card">
                  <div className="popular-products-card-elements">
                    <div className="popular-products-card-info">
                      <h2>{e.productName}</h2>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          columnGap: "50px",
                        }}
                      >
                        <p>$ {e.price}</p>
                        <button
                          onClick={() => addCart(e._id)}
                          className="popular-product-button"
                          type="button"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                    <div className="popular-products-card-image">
                      <img
                        src={`/uploads/${e && e.items[0].productImage}`}
                        alt="product"
                      />
                    </div>
                  </div>
                  <div className="popular-products-card-shadow-container">
                    <div
                      style={{
                        background: `radial-gradient(circle, #fff 0%, rgba(0,0,0,0) 50%)`,
                      }}
                      className="popular-products-card-shadow"
                    ></div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      <div className="recomendation-product">
        <div className="recomendation-product-background">
          <div className="jordan-text">JORDAN</div>
          <div className="recomendation-product-description">
            <div className="recomendation-product-description-content">
              <h2>JORDAN'S FLIGHT</h2>
              <h3>NEW COLLECTION FROM NIKE</h3>
              <p>Comfortable Basketball Shoes</p>
              <button type="button">More Detail</button>
            </div>
          </div>
          <div className="recomendation-product-image1">
            <img src={recomandationImg1} alt="recomandation" />
          </div>
          <div className="recomendation-product-title">
            <h2>JORDAN'S FLIGHT</h2>
          </div>
          <div className="recomendation-product-image2">
            <img src={jordan} alt="jordan" />
          </div>
        </div>
      </div>
      <div className="product-intro-container">
        <div>
          {" "}
          <img src={productIntroImg1} alt="ınt" />
        </div>

        <div>
          <p>Make yourself unstoppable.</p>
        </div>

        <div>
          <p>
            The Nike Air Max 90 LTR stays true to its OG running roots with the
            iconic Waffle outsole, stitched overlays of smoothed leather and
            classic, color-accented TPU plates. The monochromatic upper provides
            versatile styling options while Max Air cushioning adds comfort to
            your step.
          </p>
          <Link
            style={{ textDecoration: "none" }}
            to={"/detail/633b03c6c99489e2b60f724f/Nike%20Air%20Max%2090"}
          >
            <button type="button"> Shop Now </button>
          </Link>
        </div>
        <div>
          {" "}
          <img src={productIntroImg2} alt="ınt" />
        </div>
      </div>
    </div>
  );
};

export default Home;
