// SingleCard.jsx
import React from 'react';

const SingleCard = ({ name, url, description, imageURL }) => {
  return (
    <div className="card">
      <img src={imageURL} alt={`${name}`} />
      <h4>Name: </h4>{name}
      <h4>URL: </h4>{url}
      <h4><p>Description: </p></h4>{description}
      <h4>Image URL : </h4><a href={imageURL} target="_blank" rel="noopener noreferrer">{imageURL}</a>
    </div>


  );
};

export default SingleCard;
