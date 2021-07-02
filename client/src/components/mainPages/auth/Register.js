import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ToastProvider, useToasts } from "react-toast-notifications";

function RegisterApp() {
  const { addToast } = useToasts();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    study_year: "",
    course: "",
    location: "",
    phone: "",
  });

  //toast notification
  const toastify = (message, type) => {
    if (type == "success") {
      addToast(message, {
        appearance: "success",
        autoDismiss: true,
      });
    } else if (type == "error") {
      addToast(message, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  //change handler
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  //submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/user/register", { ...user });
      console.log(res);
      localStorage.setItem("firstLogin", true);
      window.location.href = "/";
    } catch (e) {
      toastify(e.response.data.message, "error");
    }
  };
  return (
    <div className="login-body">
      <div className="login-page">
        <h2>Register</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="input-div">
            <input
              type="text"
              name="name"
              placeholder="NAME"
              value={user.name}
              onChange={handleChange}
            />
          </div>
          <div className="input-div">
            <input
              type="text"
              name="study_year"
              placeholder="STUDY YEAR"
              value={user.study_year}
              onChange={handleChange}
            />
          </div>
          <div className="input-div">
            <input
              type="text"
              name="course"
              placeholder="COURSE"
              value={user.course}
              onChange={handleChange}
            />
          </div>
          <div className="input-div">
            <input
              type="text"
              name="location"
              placeholder="HOSTEL"
              value={user.location}
              onChange={handleChange}
            />
          </div>
          <div className="input-div">
            <input
              type="tel"
              name="phone"
              placeholder="PHONE"
              value={user.phone}
              onChange={handleChange}
            />
          </div>
          <div className="input-div">
            <input
              type="email"
              name="email"
              placeholder="EMAIL"
              value={user.email}
              onChange={handleChange}
            />
            <small>
              <b className="info">i</b> enter your webmail[xyx@nitt.edu]
            </small>
          </div>
          <div className="input-div">
            <input
              type="password"
              name="password"
              placeholder="PASSWORD"
              value={user.password}
              onChange={handleChange}
            />
            <small>
              <b className="info">i</b> Password should be 6 character long
            </small>
          </div>
          <div className="row">
            <button type="submit">Register</button>
            <Link to="/login">login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Register(){
  return (
    <ToastProvider>
      <RegisterApp />
    </ToastProvider>
  );
}