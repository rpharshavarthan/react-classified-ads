import React, { useContext } from "react";
import { GlobalState } from "../../../globalState";
import ProductItem from "../utils/product_item/ProductItem";
import { Container } from "../utils/loading/Loading";
import Filter from "../utils/filters/Filter";
import ImageSlider from "../utils/slider/Slider";
import { SliderData } from "../utils/slider/SliderData";
import Load from "../utils/load_more/Load";
import Modal from "../utils/modal/Modal";
import { useState } from "react";

export default function Products() {
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [token] = state.token;
  const [callback, setCallback] = state.productsAPI.callback;
  const [adCallback, setAdCallback] = state.adAPI.adCallback;
  const [loading, setloading] = state.productsAPI.loading;
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <Filter />
      <ImageSlider SliderData={SliderData} />
      {loading ? (
        <Container />
      ) : (
        <div className="products">
          {products.map((product) => {
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
        </div>
      )}
      {/* <Container /> */}
      <Load />
    </>
  );
}
