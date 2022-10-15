import React from 'react'
import Button from '../Button/Button';
import './Cart.css'

function Cart ({cartItems, onCheckout}) {

   const totalPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);

   return ( 
      <div className='cartContainer'>
         {cartItems.length === 0 ? "no items in cart" : ""}
         <br /><span className="">Итого: ${totalPrice.toFixed(2)}</span>
         <Button
            title={`${cartItems.length === 0 ? "выбирайте" : "оплатить"}`}
            type={'checkout'}
            disable={cartItems.length === 0 ? true : false}
            onClick={onCheckout}
         />
      </div>
 );
}

export default Cart;