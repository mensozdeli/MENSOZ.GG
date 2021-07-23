import logo from './logo.png';
import './App.css';

import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { Products, Navbar, Cart, Checkout, Footer } from './components';
import{BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import ReactJKMusicPlayer from 'react-jinke-music-player';
import 'react-jinke-music-player/assets/index.css';

// import whereYouAt from './assets/music/WHERE-YOU-AT.alp.wav';
// import theyKnow from './assets/music/THEY-KNOW.wav';
// import dog from './assets/music/DOG.wav';
// import machine$ from './assets/music/MACHINE$.wav';
// import rise from './assets/music/RISE.wav';

import albumCover from './assets/album-cover.PNG';
import dog from './assets/music/dog-basedgod.wav';

const App = () => {
    

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    //fetches products from commerce.js
    const fetchProducts = async() => {
        const { data } = await commerce.products.list();
        setProducts(data);
    }

    //fetches the active cart from commercejs
    const fetchCart = async () => {
        const cart  = await commerce.cart.retrieve();
        setCart(cart);
    }

    //Adds a product to the active cart
    const handleAddToCart = async(productId, quantity) => {
        const {cart}  = await commerce.cart.add(productId, quantity);
        setCart(cart);
    } 

    const handleAddToCartVariant = async (productId, quantity, variantGroupId, optionId) => {
        console.log(productId, quantity, variantGroupId, optionId);
        const {cart} = await commerce.cart.add(productId, quantity, {[variantGroupId] : optionId,});
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

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();
        setCart(newCart);
    };

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try{
          const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
          setOrder(incomingOrder);
          refreshCart();
        } 
        catch (error){
          console.log("Error in handling checkout!!");
          setErrorMessage(error.data.error.message);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);
    console.log("Logging Products: ", products);
    console.log("Products in Cart: ", cart);
    // console.log("Total Items: ", cart.total_items);

    const audiolist = [
        {
            cover: albumCover,
            musicSrc: dog,
            name: 'DOG Remix (Feat. Lil B) [Remix]',
            singer: 'Mayor Marc'

        },
    ]

    return (
        <Router>
            <div className="App">
  
               
                <Navbar totalItems = {cart.total_items}/>
                <Switch>
                    {/* Home Page Route */}
                    <Route exact path="/">
                        <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <iframe width="311" height="175" src="https://www.youtube.com/embed/4er_KGxHvTk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

                        <p>
                        ¡ LOOK ALIVE !
                        </p>
                        </header>
                        <div className="Products">
                            <Products products={products} onAddToCart={handleAddToCart} onAddToCartVariant={handleAddToCartVariant}/> 
                        </div>
                        {
                            window.innerWidth > 711 ? 
                            <ReactJKMusicPlayer
                                audioLists={audiolist} 
                                mode={"full"} 
                                // toggleMode={false} 
                                showDownload={false}
                                autoPlay={false} 
                                defaultPosition={{ right: 100, bottom: 120}}
                            /> : 
                            <ReactJKMusicPlayer
                                audioLists={audiolist}  
                                // toggleMode={false} 
                                showDownload={false}
                                autoPlay={false} 
                                defaultPosition={{ right: 20, bottom: 120}}
                            />
                        }
                     <Footer/>
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
                        <Checkout 
                            cart={cart} 
                            order={order}
                            onCaptureCheckout={handleCaptureCheckout} 
                            error={errorMessage}
                        />
                    </Route>
                
                </Switch>
            </div>
           
        </Router>
  
	);
}

export default App;