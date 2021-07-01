import React from 'react'
import Delete from './delete.png'
import './Modal.css'

export default function Modal({open, onClose, deleteProduct}) {
    if(!open) return null;
    return (
      <>
        <div className="overlay"></div>
        <div className="modal" >
          <img src={Delete} alt="" />
          <h3 style={{fontFamily: "Poppins"}}>
            Your are about to delete your ad!
          </h3>
          <div className="button">
            <button onClick={onClose}>Cancel</button>
            <button className="delete" onClick={() => {
              onClose()
              deleteProduct()
            }}>Delete</button>
          </div>
        </div>
      </>
    );
}
