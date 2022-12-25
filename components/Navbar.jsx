import React from "react";
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'
import {Cart} from './'
import { useStateContext } from "../context/StateContext";

const Navbar = () => {
  const {setShowCart, showCart, totalQuantities} = useStateContext();
  return (
  <div>
    <div className="navbar-container">
      <p className="logo">
        <Link href='/'>Sounds Shop</Link>
      </p>

      <button className="cart-icon"
        onClick={()=>setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>  
  </div>
  )
};

export default Navbar;
