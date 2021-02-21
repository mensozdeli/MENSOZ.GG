import logo from './logo.png';
import './App.css';

import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { Products, Navbar, Cart  } from './components';


const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const fetchProducts = async() => {
        const { data } = await commerce.products.list();
        setProducts(data);
    }

    const fetchCart = async () => {
        const cart  = await commerce.cart.retrieve();
        setCart(cart);
    }

    const handleAddToCart = async(productId, quantity) =>
    {
        const item  = await commerce.cart.add(productId, quantity);
        setCart(item.cart);
    }


    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);
    console.log("Logging Products: ", products);
    console.log("Products in Cart: ", cart);
    console.log("Total Items: ", cart.total_items);
    return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<iframe width="311" height="175" src="https://www.youtube.com/embed/bvygXwsl5PI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
				<p>
					¡ Order Coming Up !
				</p>
			</header>
			<Products products={products} onAddToCart = {handleAddToCart}/> 
            <Navbar totalItems = {cart.total_items}/>
            {/*<Cart cart = {cart}/>*/}
		</div>
	);
}

export default App;