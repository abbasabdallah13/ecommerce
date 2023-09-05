import { useNextSanityImage } from 'next-sanity-image';
import {React, createContext, useContext, useState, useEffect} from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((items) => items._id === product._id);
        
            setTotalPrice((prev) => prev + product.price * quantity);
            setTotalQuantities((prev) => prev + quantity);

        if(checkProductInCart){
            const updatedCartItems = cartItems.map((cartProduct) => {
                    if(cartProduct._id === product._id) return {
                        ...cartProduct,
                        quantity: cartProduct.quantity + quantity
                     }
        })

        setCartItems(updatedCartItems);
    } else{
        product.quantity = quantity;
        
        setCartItems([...cartItems, {...product}])
    }
    setQty(1);
    toast.success(`${qty} ${product.name} added to the cart`)
}

const onRemove = (item,id) => {
    foundProduct = cartItems.find(item => item._id === id);
    index = cartItems.findIndex(product => product._id === id);
    let newCartItems = [...cartItems];
    newCartItems.splice(index,1);
    setCartItems(newCartItems);
    setTotalPrice((prev) => prev - item.price*item.quantity);
    setTotalQuantities((prev) => prev - item.quantity);

}

const toggleCartItemQuantity = (id,value) => {
    foundProduct = cartItems.find(item => item._id === id);
    index = cartItems.findIndex(product => product._id === id);
    let newCartItems;
    if(value === 'inc' && foundProduct){
        foundProduct.quantity = foundProduct.quantity+1;
        let newCartItems = cartItems.filter(item => item._id !== id);
        newCartItems.splice(index,0,foundProduct);
        setCartItems(newCartItems)
        setTotalPrice((prev)=>prev+foundProduct.price);
        setTotalQuantities(prev => prev + 1);
    }else if(value === 'dec' && foundProduct){
        if(foundProduct.quantity > 1){
            foundProduct.quantity = foundProduct.quantity-1;
            let newCartItems = cartItems.filter(item => item._id !== id);
            newCartItems.splice(index,0,foundProduct);
            setCartItems(newCartItems)
            setTotalPrice((prev)=>prev-foundProduct.price);
            setTotalQuantities(prev => prev - 1);
        }else{
            setTotalPrice((prev)=>prev-foundProduct.price);
            setTotalQuantities(prev => prev - 1);
            let newCartItems = [...cartItems];
            newCartItems.splice(index,1);
            setCartItems(newCartItems);          
        }
    }
}
    
const incQty = () => {
    setQty((prev)=>prev+1);
  }

  
const decQty = () => {
    setQty((prev)=>{
        if(prev === 1){
            return 1
        }else{
            return prev-1
        }
    });
  }


    return (
        <Context.Provider
            value={{
                showCart,
                setShowCart,
                setTotalPrice,
                setTotalQuantities,
                setCartItems,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                toggleCartItemQuantity,
                onRemove
            }}
        >
            {children}
        </Context.Provider>
    )
       
}

export const useStateContext = () => useContext(Context);