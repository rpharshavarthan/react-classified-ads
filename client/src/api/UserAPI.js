import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Products from '../components/mainPages/products/Products';
import toast, { Toaster } from "react-hot-toast";

export default function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      const getuser = async () => {
        try {
          const res = await axios("/user/info", {
            headers: {
              Authorization: token,
            },
          });
          setUser(res.data);
          console.log(res.data);
          setIsLogged(true);
        } catch (error) {
          console.log("here");
          alert(error.response.data.message);
        }
      };
      getuser();
    }
  }, [token]);

  return {
    isLogged: [isLogged, setIsLogged],
    user: [user, setUser],
  };
}