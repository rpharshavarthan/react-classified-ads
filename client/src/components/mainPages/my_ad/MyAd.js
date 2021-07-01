import React, {useContext } from "react";
import { GlobalState } from "../../../globalState";
import ProductItem from "../utils/product_item/ProductItem";
import Loading from "../utils/loading/Loading";

export default function MyAd() {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [myAd] = state.adAPI.myAd;
  const [callback, setCallback] = state.productsAPI.callback;
  
  return (
    <>
      <div className="products">
        {myAd.map((product) => {
          return (
            <ProductItem
              key={product._id}
              product={product}
              token={token}
              callback={callback}
              setCallback={setCallback}
            />
          );
        })}
        {myAd.length === 0 && <Loading />}
      </div>
    </>
  );
}
