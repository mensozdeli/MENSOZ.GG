import logo from './logo.png';
import './App.css';

import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { Products, Navbar, Cart, Checkout } from './components';
import{BrowserRouter as Router, Switch, Route} from 'react-router-dom';


const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});

    //fetches products from commerce.js
    const fetchProducts = async() => {
        const { data } = await commerce.products.list();
        setProducts(data);
    }

    //fetches the actice cart from commercejs
    const fetchCart = async () => {
        const cart  = await commerce.cart.retrieve();
        setCart(cart);
    }

    //Adds a product to the active cart
    const handleAddToCart = async(productId, quantity) =>
    {
        const {cart}  = await commerce.cart.add(productId, quantity);
        setCart(cart);
    }

    //updates the quantity of a product in the cart
    const handleUpdateCartQty = async(productId, quantity) => {
        const {cart} = await commerce.cart.update(productId, {quantity});
        setCart(cart);
    }

    //Removes a product from the cart
    const handleRemoveFromCart = async(productId) => {
        const {cart} = await commerce.cart.remove(productId);
        setCart(cart);
    }

    //Empties the entire cart
    const handleEmptyCart = async () => {
        const {cart} = await commerce.cart.empty();
        setCart(cart);
    }


    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);
    console.log("Logging Products: ", products);
    console.log("Products in Cart: ", cart);
    console.log("Total Items: ", cart.total_items);

    return (
        <Router>
            <div className="App">
  
               
                <Navbar totalItems = {cart.total_items}/>
                <Switch>
                    {/* Home Page Route */}
                    <Route exact path="/">
                        <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <iframe width="311" height="175" src="https://www.youtube.com/embed/bvygXwsl5PI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        <p>
                            ¡ Order Coming Up !
                        </p>
                        </header>
                        <Products products={products} onAddToCart = {handleAddToCart}/> 
                    </Route>

                    {/* Cart Route */}
                    <Route exact path="/cart">
                        <Cart 
                            cart={cart}
                            handleUpdateCartQty={handleUpdateCartQty}
                            handleRemoveFromCart={handleRemoveFromCart}
                            handleEmptyCart={handleEmptyCart}
                        />
                    </Route>

                    {/* Checkout Route */}
                    <Route exact path="/checkout">
                        <Checkout cart={cart} />
                    </Route>
                
                </Switch>
            </div>
        </Router>
	);
}

export default App;