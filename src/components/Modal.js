import React, { Component } from "react";
import ReactDOM from "react-dom";

const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
      <div>
        <div className={showHideClassName} onClick={handleClose} >
        <section className="modal-main">
          <button onClick={handleClose} className="closeButton"> + </button>
          {children}
        </section>
      </div>
      </div>
    );
  };

  export default Modal;