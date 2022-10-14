import React from "react";
import "./header.css";
import logo from "../../images/PngItem_1674290.png";
import user from "../../images/user.png";
import cart from "../../images/cart.png";
import heart from "../../images/heart.png";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="header-container">
      <div className="logo-container">
        <Link to="/">
          <img className="logo" src={logo} alt="logo" />
        </Link>
      </div>
      <div className="nav-container">
        <nav>
          <ul>
            <Link to="/products/men" className="links">
              <li style={{ textDecarotion: "none" }}>Men</li>
            </Link>
            <Link to="/products/women" className="links">
              <li style={{ textDecarotion: "none" }}>Women</li>
            </Link>
            <Link to="/products/girl" className="links">
              <li style={{ textDecarotion: "none" }}>Kids</li>
            </Link>

            <li>SNKRS</li>
          </ul>
        </nav>
      </div>
      <div className="user-container">
        <div
          style={{
            width: "70%",
            position: "absolute",
            height: "auto",
            right: "0%",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Link to={localStorage.getItem("userId")===null?"/singup":"/favorites"}>
            <img className="user-icons" src={heart} alt="" />
          </Link>

          <Link to={localStorage.getItem("userId")===null?"/singup":"/cart"}>
            <img className="user-icons" src={cart} alt="" />
          </Link>

          <Link to={"/singup"}>
            <img className="user-icons" src={user} alt="" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
