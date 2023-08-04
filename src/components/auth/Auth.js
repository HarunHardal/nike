import React, { useState } from "react";
import "./auth.css";
import image from "../../images/photo-1610870372593-a8647b04451f.avif";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";
import { useNavigate } from "react-router-dom";
function Auth({ isLoggedIn }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const options = [
    { value: "", text: "Gender" },
    { value: "Men", text: "Men" },
    { value: "Women", text: "Women" },
  ];
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [oldUser, setOldUser] = useState({
    email: "",
    password: "",
  });
  const [isSingup, setIsSingup] = useState(false);
  const [selected, setSelected] = useState(options[0].value);
  const [checked, setChecked] = useState(false);

  const handleChange = (e) => {
    if (!isSingup) {
      setNewUser((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    } else {
      setOldUser((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };
  const handleCheck = () => {
    setChecked(!checked);
    console.log(isLoggedIn);
  };
  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  const sendRequest = async () => {
    console.log(isSingup);
    let data;
    if (!isSingup) {
      const res = await axios
        .post(`https://leaveit-l0tz.onrender.com/user/singup`, {
          email: newUser.email,
          password: newUser.password,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          gender: selected,
          emailpermission: checked,
        })
        .catch((err) => console.log(err));
      data = await res.data;
    } else {
      const res = await axios
        .post(`https://leaveit-l0tz.onrender.com/user/login`, {
          email: oldUser.email,
          password: oldUser.password,
        })
        .catch((err) => console.log(err));
      console.log(res);
      data = await res.data;
    }

    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSingup) {
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => {
          dispatch(authActions.login());
        })
        .then(() => navigate("/"));
    } else {
      sendRequest()
        .then((data) => {
          localStorage.setItem("userId", data.user._id);
        })
        .then(() => {
          dispatch(authActions.login());
        })
        .then(() => navigate("/"));
    }
  };

  return (
    <div className="auth-container">
      {isLoggedIn ? (
        <div className="logout-page">
          <button
            type="button"
            onClick={() => {
              dispatch(authActions.logout());
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <>
          <div className="auth-container-left">
            <div className="auth-container-left-wrapper">
              {" "}
              {/*with 50%*/}
              <h1>BECOME A NIKE MEMBER</h1>
              <p>
                Be the first to access Nike's best products by creating your
                Nike Member profile, reach the community and be inspired.
              </p>
              <div className="auth-container-left-form">
                <form
                  onSubmit={handleSubmit}
                  className="auth-container-form"
                  action="post"
                >
                  {!isSingup ? (
                    <>
                      {" "}
                      <div>
                        <label>Email</label>
                        <input
                          className="user-auth-input"
                          type="email"
                          name="email"
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label>Password</label>
                        <input
                          className="user-auth-input"
                          type="password"
                          name="password"
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label>First Name</label>
                        <input
                          className="user-auth-input"
                          type="text"
                          name="firstName"
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label>Last Name</label>
                        <input
                          className="user-auth-input"
                          type="text"
                          name="lastName"
                          onChange={handleChange}
                        />
                      </div>
                      <select value={selected} onChange={handleSelect}>
                        {options.map((e) => (
                          <option key={e.value} value={e.value}>
                            {e.text}
                          </option>
                        ))}
                      </select>
                      <label>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={handleCheck}
                        />
                        Sign up for emails to receive updates on products,
                        offers and Member benefits from Nike.
                      </label>
                    </>
                  ) : (
                    <>
                        <div>
                        <label>Email</label>
                        <input
                          className="user-auth-input"
                          type="email"
                          name="email"
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label>Password</label>
                        <input
                          className="user-auth-input"
                          type="password"
                          name="password"
                          onChange={handleChange}
                        />
                      </div>
                    </>
                  )}

                  <input
                    className="auth-container-left-form-submit"
                    type="submit"
                    value={!isSingup ? "Join Us" : "Login"}
                  />
                  {!isSingup ? (
                    <>
                      <p>Do you have an account</p>
                      <button
                        className="auth-btn"
                        onClick={() => setIsSingup(!isSingup)}
                        type="button"
                      >
                        {" "}
                        Login
                      </button>
                    </>
                  ) : (
                    <>
                      <p>Don't have an account? let's create account</p>
                      <button
                        className="auth-btn"
                        onClick={() => setIsSingup(!isSingup)}
                        type="button"
                      >
                        Create
                      </button>
                    </>
                  )}
                </form>
              </div>
            </div>
          </div>
          <div className="auth-container-right">
            <div className="auth-container-right-shadow"></div>
            <img src={image} alt="jordan" />
          </div>
        </>
      )}
    </div>
  );
}

export default Auth;
