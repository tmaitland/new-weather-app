import React, { Component } from "react";
import ReactDOM from "react-dom";

const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <div>
        <div className={showHideClassName}>
         <section className="modal-main">
          {children}
          <button onClick={handleClose}>close</button>
        </section>
      </div>
      </div>
    );
  };

  export default Modal;