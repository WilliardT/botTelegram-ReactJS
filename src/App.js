import { useState , useEffect } from 'react';
import './App.css';
import Card from './Components/Card/Card';
import Cart from './Components/Cart/Cart';
const {getData} = require("./db/db");
const instruments = getData();

const telegram = window.Telegram.WebApp;

function App() {

  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    telegram.ready();
  });

  const onAdd = (instrument) => {
    const exist = cartItems.find((x) => x.id === instrument.id);
    if (exist) {
        setCartItems(
          cartItems.map((x) => 
            x.id === instrument.id ? {...exist, quantity: exist.quantity + 1} : x 
          )
      );
    } else {
      setCartItems([...cartItems, {...instrument, quantity: 1}]);
    }
  };

  const onRemove = (instrument) => {
    const exist = cartItems.find((x) => x.id === instrument.id);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((x) => x.id !== instrument.id));
    } else {
        setCartItems(
          cartItems.map((x) => 
            x.id === instrument.id ? {...exist, quantity: exist.quantity - 1} : x  
        )
      );
    }
  };

  const onCheckout = () => {
    telegram.MainButton.text = "pay"
    telegram.MainButton.show();
  };

  return (
    <>
      <h1 className="heading">На прилавке:</h1>
      <Cart cartItems={cartItems} onCheckout={onCheckout}/>
      <div className="cardsContainer">
        {instruments.map((instrument) => {
            return (
              <Card instrument={instrument} key={instrument.id} onAdd={onAdd} onRemove={onRemove}/>
            );
        })}
      </div>
    </>
  );
}

export default App;
