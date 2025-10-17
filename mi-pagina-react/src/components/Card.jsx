import React from "react";

function Card({ name, description, imgUrl }) {
  return (
    <div className="card col-12 col-md-6 col-lg-3">
      <div className="card-body p-3">
        <h5 className="card-title text-center">{name}</h5>
        <p className="card-text">{description}</p>
      </div>
      <img src={imgUrl} className="card-img-bottom" alt={name} />
    </div>
  );
}

export default Card;
