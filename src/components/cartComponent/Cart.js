import axios from "axios";
import React, { useEffect, useState } from "react";
import "./cart.css";
import CartItem from "./CartItem";
import chip from '../../images/chip.png'

function Cart() {
  const [data, setData] = useState();
  const [user, setUser] = useState();
  const [click, setClick] = useState();
  const [card, setCard] = useState({
    name: "",
    cardNumber: "",
    mounth: "",
    year: "",
    cvv: "",
  });

  const mounthOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "10", label: "10" },
    { value: "11", label: "11" },
    { value: "12", label: "12" },
  ];

  const yearOptions = [
    { value: "22", label: "22" },
    { value: "23", label: "23" },
    { value: "24", label: "24" },
    { value: "25", label: "25" },
    { value: "26", label: "26" },
    { value: "27", label: "27" },
    { value: "28", label: "28" },
    { value: "29", label: "29" },
    { value: "30", label: "30" },
    { value: "31", label: "31" },
    { value: "32", label: "32" },
    { value: "33", label: "33" },
    { value: "34", label: "34" },
    { value: "35", label: "35" },
    { value: "36", label: "36" },
    { value: "37", label: "37" },
  ];

  const format = (cc) => {
    if (cc.length > 0) {
      return cc ? cc.match(/[0-9]{1,4}/g).join(" ") : "";
    }
  };

  const fetchCart = async () => {
    const res = await axios
      .get(
        `https://asdadsadasdf.herokuapp.com/cartdetail/cart/${localStorage.getItem(
          "userId"
        )}`
      )
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const getUser = async () => {
    const res = await axios
      .get(
        `https://asdadsadasdf.herokuapp.com/user/getuserbyid/${localStorage.getItem(
          "userId"
        )}`
      )
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleChange = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  const handleSelect = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchCart().then((data) => setData(data));
    getUser().then((data) => setUser(data.user));
  }, []);
  return (
    <div
      className="cart-container"
     
    >
      <div>
        <h2>Shoping Cart</h2>
        {data &&
          data.cartDetail.items.map((e, i) => (
            <CartItem
              key={i}
              userId={data && data.userId}
              price={e.price}
              productId={e.productId}
              quantity={e.quantity}
            />
          ))}
        <div className="user-total">
          <p>Subtotal:</p>
          <p>{data && data.cartDetail.bill} $</p>
        </div>
      </div>

      <div className="addrees-container">
        <h2>Address Details</h2>
        <div className="user-names">
          <p>Full Name</p>
          <p>
            {user && user.firstName} {user && user.lastName}
          </p>
        </div>
        <div className="user-names">
          <p>E Mail</p>
          <p>{user && user.email}</p>
        </div>
        <div>
          <form className="user-cart-area">
            <div className="user-phone">
              <label>Phone Number</label>

              <input className="user-phone-number" type="text" />
            </div>
            <div className="user-state-city">
              <div>
                <label>State</label>
                <input type="text" className="user-state" />
              </div>
              <div>
                <label>City</label>
                <input type="text" className="user-city" />
              </div>
            </div>
            <div className="user-address">
              <label>Address</label>
              <input type="text" className="address" />
            </div>
          </form>
        </div>
      </div>

      <div className="card-container">
        <h2>Card Details</h2>

        <div className="card">
          <div style={click?{transform:"rotateY(180deg)"}:null} className="card__front card__part">
            <img
              className="card__front-square card__square"
              src={chip}
              alt="card"
            />
            <img
              className="card__front-logo card__logo"
              src="https://www.freepnglogos.com/uploads/visa-inc-png-18.png"
              alt="card"
            />
            <p className="card_numer">
              {card.cardNumber === ""
                ? "**** ***** **** ****"
                : format(card.cardNumber)}
            </p>
            <div className="card__space-75">
              <span className="card__label">Card holder</span>
              <p className="card__info">
                {card.name === "" ? "John Doe" : card.name}
              </p>
            </div>
            <div className="card__space-25">
              <span className="card__label">Expires</span>
              <p className="card__info">
                {card.mounth === "" ? "10" : card.mounth}/
                {card.year === "" ? "25" : card.year}
              </p>
            </div>
          </div>

          <div style={click?{transform:"rotateY(0deg)"}:null} className="card__back card__part">
            <div className="card__black-line"></div>
            <div className="card__back-content">
              <div className="card__secret">
                <p className="card__secret--last">
                  {card.cvv === "" ? "420" : card.cvv}
                </p>
              </div>
              <img
                className="card__back-square card__square"
                src={chip}
                alt="cards"
              />
              <img
                className="card__back-logo card__logo"
                src="https://www.freepnglogos.com/uploads/visa-inc-png-18.png"
                alt="card"
              />
            </div>
          </div>
        </div>

        <form className="card-details-form">
          <div className="card-details-container">
            <label>Name On Card</label>
            <input
              name="name"
              onChange={handleChange}
              type="text"
              className="card-details"
            />
          </div>
          <div className="card-details-container card-details-margin">
            <label>Card Number</label>
            <input
              maxLength={"16"}
              name="cardNumber"
              onChange={handleChange}
              type="text"
              className="card-details "
            />
          </div>

          <div className="card-details-rows">
            <div className="card-details-title-columns">
              <div>Expiration Date</div>
              <div>CVV</div>
            </div>
            <div className="card-details-columns">
              <div>
                <select name="mounth" onChange={handleSelect}>
                  {mounthOptions.map((e, i) => (
                    <option key={i} value={e.value}>
                      {e.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <select name="year" onChange={handleSelect}>
                  {yearOptions.map((e, i) => (
                    <option key={i} defaultValue={"yyyy"} value={e.value}>
                      {e.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <input
                  onChange={handleChange}
                  onFocus={()=>setClick(true)}
                  onBlur={()=>setClick(false)}
                  name="cvv"
                  maxLength={"4"}
                  type="text"
                  className="card-details-cvv"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Cart;
