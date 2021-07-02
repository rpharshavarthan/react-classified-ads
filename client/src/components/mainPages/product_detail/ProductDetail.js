import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { GlobalState } from "../../../globalState";
import Star from "../../../icons/star.svg";
import ProductItem from "../utils/product_item/ProductItem";

export default function ProductDetail() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [productDetail, setProductDetail] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) setProductDetail(product);
      });
    }
  }, [params.id, products]);
  if (productDetail.length === 0) return null;
  return (
    <>
      <div className="product">
        <div className="detail">
          <img src={productDetail.image.url} alt="" />
          <div className="box-detail">
            <div className="row">
              <h2>{productDetail.title}</h2>
              <hr />
            </div>
            <p className="price">&#x20b9;{productDetail.price}</p>
            <div className="condition">
              <span>condition- </span>
              <img src={Star} alt="" />
              <div className="rating">{productDetail.condition}</div>
              {/* {productDetail.condition == "good" ? } */}
            </div>
            <div className="desc">
              <span>description- </span>
              <p>{productDetail.description}</p>
            </div>
            <div className="seller-detail">
              <p>
                <span>seller-</span> {productDetail.seller_name},{" "}
                {productDetail.study_year}-{productDetail.course}
              </p>
              <p>
                <span>location-</span> {productDetail.location}
              </p>
              <p>
                <span>contact-</span> {productDetail.phone}
              </p>
            </div>
            <Link to={`/chat/${productDetail.seller_id}`} className="chat-seller">
              Chat with Seller
            </Link>
          </div>
        </div>
      </div>
      <div className="related-products">
        <h2>SIMILAR PRODUCTS</h2>
        <div className="products">
          {products.map((product) => {
            return product.category === productDetail.category ? (
              <ProductItem key={product._id} product={product} />
            ) : null;
          })}
        </div>
      </div>
    </>
  );
}
