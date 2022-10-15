import React from 'react'
import { useState } from 'react';
import Button from '../Button/Button';
import './Card.css';

function Card({instrument, onAdd, onRemove}) {
   const [count, setCount] = useState(0);
   const { title, Image, price, id } = instrument;

   const handleIncrement = () => {
      setCount(count + 1);
      onAdd(instrument);
   }

   const handleDecrement = () => {
      setCount(count - 1);
      onRemove(instrument);
   }

  return (
    <div className="card">
      <span className={`${count !== 0 ? "cardBadge" : "cardBadgeHidden"}`}>
         {count}
      </span>
      <div className="imageContainer">
         <img src={Image} alt={title}/>
      </div>
      <h4 className="cardTitle">
         {title} : <span className="cardPrice">${price}</span>
      </h4>
      <div className="btnContainer">
         <Button title={'+'} type={'add'} onClick={handleIncrement}/>
         {count !== 0 ? (
            <Button title={'-'} type={'remove'} onClick={handleDecrement}/>
         ) : (
            ""
         )}
      </div>
   </div>
  );
}

export default Card;