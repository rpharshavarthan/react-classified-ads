import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GlobalState } from "../globalState";

export default function AdAPI(token) {
  const [myAd, setMyAd] = useState([]);
  const [adCallback, setAdCallback] = useState(false);

  //get myAd
  useEffect(() => {
     if (token) {
       const getMyAd = async () => {
         try {
           const res = await axios.get("/api/myAd", {
             headers: {
               Authorization: token,
             },
           });
           setMyAd(res.data.ad);
         } catch (error) {
           console.log(error.response.data.message);
         }
       };
       getMyAd();
     }
  }, [token, adCallback]);

  return {
    myAd: [myAd, setMyAd],
    adCallback: [adCallback, setAdCallback]
  };
}
