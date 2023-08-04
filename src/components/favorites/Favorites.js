import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./favorites.css";

const Favorites = () => {
  const [user, setUser] = useState();

  const getRequest = async () => {
    const res = await axios(
      `https://leaveit-l0tz.onrender.com/user/getuserbyid/${localStorage.getItem("userId")}`
    );
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    getRequest()
      .then((data) => {
        setUser(data.user);
      })
  
  }, []);

  return (
    <div className="favorites-container">
      <div className="favorites-svg">
      <svg
        className="favorites-heart"
        version="1.1"

        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 15"
      >
        {" "}
        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />{" "}
      </svg>
      <svg
        className="favorites-logo"
        version="1.1"
        viewBox="135.5 361.38 1e3 356.39"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="m 245.8075,717.62406 c -29.79588,-1.1837 -54.1734,-9.3368 -73.23459,-24.4796 -3.63775,-2.8928 -12.30611,-11.5663 -15.21427,-15.2245 -7.72958,-9.7193 -12.98467,-19.1785 -16.48977,-29.6734 -10.7857,-32.3061 -5.23469,-74.6989 15.87753,-121.2243 18.0765,-39.8316 45.96932,-79.3366 94.63252,-134.0508 7.16836,-8.0511 28.51526,-31.5969 28.65302,-31.5969 0.051,0 -1.11225,2.0153 -2.57652,4.4694 -12.65304,21.1938 -23.47957,46.158 -29.37751,67.7703 -9.47448,34.6785 -8.33163,64.4387 3.34693,87.5151 8.05611,15.898 21.86731,29.6684 37.3979,37.2806 27.18874,13.3214 66.9948,14.4235 115.60699,3.2245 3.34694,-0.7755 169.19363,-44.801 368.55048,-97.8366 199.35686,-53.0408 362.49439,-96.4029 362.51989,-96.3672 0.056,0.046 -463.16259,198.2599 -703.62654,301.0914 -38.08158,16.2806 -48.26521,20.3928 -66.16827,26.6785 -45.76525,16.0714 -86.76008,23.7398 -119.89779,22.4235 z" />
      </svg>
      </div >
   

      <div className="favorites-box">
   {user&&user.favorites.map((e,i)=>(
        <Link style={{textDecoration: "none"}} to={`/detail/${e.productId}/${e.productName}`}>
<div className="box">
  <div>
    <img src={`/uploads/${e.productImage}`} alt={e.productName}/>
  </div>
  <div>
    <h3>{e.productName}</h3>
    <p>$ {e.productPrice}</p>
  </div>
</div>
        </Link>
   ))}
      </div>
    </div>
  );
};

export default Favorites;
