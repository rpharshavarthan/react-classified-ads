import axios from "axios";
import React, { useContext } from "react";
import Location from "../../../../icons/location.svg";
import ProductCardButton from "./ProductCardButton";
import toast, { Toaster } from "react-hot-toast";
import { GlobalState } from "../../../../globalState";

export default function ProductItem({
  product,
  token,
  callback,
  setCallback,
}) {
  const state = useContext(GlobalState);
  const [adCallback, setAdCallback] = state.adAPI.adCallback;

  const deleteProduct = async () => {
    try {
      const delImage = await axios.post(
        "/api/delete",
        { public_id: product.image.public_id },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("image deleted");
      const delProduct = await axios.delete("/api/products/" + product._id, {
        headers: {
          Authorization: token,
        },
      });
      console.log("product deleted");
      setCallback(!callback);
      setAdCallback(!adCallback);
      toast.success("ad deleted successfully", {
        style: {
          borderRadius: "0px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="product_card">
      <div>
        <Toaster />
      </div>
      <div className="product_card_head">
        <img src={product.image.url} alt="" className="product-img" />
        <div className="product_box">
          <h3>{product.title}</h3>
          <span>&#x20b9;{product.price}</span>
          <div className="seller">
            <p>
              {product.seller_name}, {product.study_year}-{product.course}
            </p>
            <p>
              <img
                src={Location}
                alt="menu-icon"
                width="9"
                height="9"
                className="location-icon"
              />{" "}
              {product.location}
            </p>
          </div>
        </div>
      </div>
      <ProductCardButton product={product} deleteProduct={deleteProduct} />
    </div>
  );
}
