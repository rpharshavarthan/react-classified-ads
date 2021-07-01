import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../globalState";
import Close from "../../icons/cross.svg";
import Cart from "../../icons/cart.svg";
import Logo from "../../icons/default-monochrome.svg";
import axios from "axios";

export default function Header() {
  //
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [menu, setMenu] = useState(false);

  const handleLogout = async () => {
    await axios.get("user/logout");
    localStorage.removeItem('firstLogin');
    window.location.href = "/"
  };

  const loggedRouter = () => {
    return (
      <>
        <li onClick={() => setMenu(!menu)}>
          <Link to="/my_ad">My Ad</Link>
        </li>
        <li onClick={() => setMenu(!menu)}>
          <Link to="/sell">Sell</Link>
        </li>
        <li onClick={() => setMenu(!menu)}>
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>
        </li>
      </>
    );
  };
  const styleMenu = {
    left: menu ? 0: "-100%"
  }
  return (
    <header>
      <div className="menu" onClick={() => setMenu(!menu)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          className="menu-line"
        >
          <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z" />
        </svg>
      </div>
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="menu-icon" width="250" />
          {/* <span></span> */}
        </Link>
      </div>
      <ul style={styleMenu}>
        <li onClick={() => setMenu(!menu)}>
          <Link to="/">{"Shop"}</Link>
        </li>
        {isLogged ? (
          loggedRouter()
        ) : (
          <li onClick={() => setMenu(!menu)}>
            <Link to="/login">Login/Register</Link>
          </li>
        )}
        <li className="menu" onClick={() => setMenu(!menu)}>
          <Link to="#">
            <img src={Close} alt="close-icon" width="30" />
          </Link>
        </li>
      </ul>
      {isLogged ? (
        <div className="chat-wish">
          <Link to="/chat">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 24 24"
              className="chat-icon"
            >
              <path d="M10 3.002c4.411 0 8 2.849 8 6.35 0 3.035-3.029 6.311-7.925 6.311-1.58 0-2.718-.317-3.718-.561-.966.593-1.256.813-3.006 1.373.415-1.518.362-2.182.331-3.184-.837-1.001-1.682-2.069-1.682-3.939 0-3.501 3.589-6.35 8-6.35zm0-2.002c-5.281 0-10 3.526-10 8.352 0 1.711.615 3.391 1.705 4.695.047 1.527-.851 3.718-1.661 5.312 2.168-.391 5.252-1.258 6.649-2.115 1.181.289 2.312.421 3.382.421 5.903 0 9.925-4.038 9.925-8.313 0-4.852-4.751-8.352-10-8.352zm11.535 11.174c-.161.488-.361.961-.601 1.416 1.677 1.262 2.257 3.226.464 5.365-.021.745-.049 1.049.138 1.865-.892-.307-.979-.392-1.665-.813-2.127.519-4.265.696-6.089-.855-.562.159-1.145.278-1.74.364 1.513 1.877 4.298 2.897 7.577 2.1.914.561 2.933 1.127 4.352 1.385-.53-1.045-1.117-2.479-1.088-3.479 1.755-2.098 1.543-5.436-1.348-7.348zm-15.035-3.763c-.591 0-1.071.479-1.071 1.071s.48 1.071 1.071 1.071 1.071-.479 1.071-1.071-.48-1.071-1.071-1.071zm3.5 0c-.591 0-1.071.479-1.071 1.071s.48 1.071 1.071 1.071 1.071-.479 1.071-1.071-.48-1.071-1.071-1.071zm3.5 0c-.591 0-1.071.479-1.071 1.071s.48 1.071 1.071 1.071 1.071-.479 1.071-1.071-.48-1.071-1.071-1.071z" />
            </svg>
          </Link>
          <Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 24 24"
              className="wish-icon"
            >
              <path d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z" />
            </svg>
          </Link>
        </div>
      ) : (
        ""
      )}
      {/* <div className="cart-icon">
        <Link to="">
          <img src={Cart} alt="" width="35" />
        </Link>
        <span>N</span>
      </div> */}
    </header>
  );
}
