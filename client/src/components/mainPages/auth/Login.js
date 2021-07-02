import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ToastProvider, useToasts } from "react-toast-notifications";

function LoginApp() {
  const { addToast } = useToasts();
  const [user, setUser] = useState({
    email: "",
    password: "",
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
      const res = await axios.post("/user/login", { ...user });
      console.log(res.data);
      localStorage.setItem("firstLogin", true);
      window.location.href = "/";
    } catch (e) {
      toastify(e.response.data.message, "error");
    }
  };

  return (
    <div className="login-body">
      <div className="login-page">
        <h2>Login</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="input-div">
            <input
              type="email"
              name="email"
              placeholder="EMAIL"
              value={user.email}
              onChange={handleChange}
            />
            <small>
              {/* <img src={Info} alt="info" className="info" />  */}
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
          </div>
          <div className="row">
            <button type="submit">Login</button>
            <Link to="/register">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Login(){
  return (
    <ToastProvider>
      <LoginApp />
    </ToastProvider>
  );
}