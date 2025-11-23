import React from "react";

function Card({ name, description, imgUrl }) {
  return (
    <div className="card">
      <img src={imgUrl} alt={name} />
      <div className="card-body">
        <h5 className="card-title text-center">{name}</h5>
        <p className="card-text text-center">{description}</p>
      </div>
    </div>
  );
}

export default Card;
