import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../../globalState";
import toast, { Toaster } from "react-hot-toast";
import Modal from "../modal/Modal";

export default function ProductCardButton({ product, deleteProduct }) {
  const state = useContext(GlobalState);
  const [user] = state.userAPI.user;
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="row_btn">
      {/* <div>
        <Toaster/>
      </div> */}
      {product.seller_id === user?._id ? (
        <>
          <Link id="btn_buy" to={`/edit_product/${product._id}`}>
            Edit
          </Link>
          <Link id="btn_delete" to="#!" onClick={() => setOpenModal(true)}>
            Delete
          </Link>
        </>
      ) : (
        <>
          <Link id="btn_buy" to="#!">
            Buy
          </Link>
          <Link id="btn_view" to={`/details/${product._id}`}>
            View
          </Link>
        </>
      )}
      <Modal
        open={openModal}
        deleteProduct={deleteProduct}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
}
