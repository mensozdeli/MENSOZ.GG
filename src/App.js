import logo from './logo.png';
import './App.css';

import React, {useState, useEffect} from 'react';
import {commerce} from './lib/commerce';
import {Products, Navbar} from './components';

const App = () => {
	const [products, setProducts] = useState([]);
	const fetchProducts = async () => {
		const {data} = await commerce.products.list();
		setProducts(data);
  	}

	useEffect(() => {
		fetchProducts();
	}, []);
	console.log("Logging Products: ", products);

	return (
		<div className="App">
			<Navbar />
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<iframe width="311" height="175" src="https://www.youtube.com/embed/bvygXwsl5PI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
				<p>
					¡ Order Coming Up !
				</p>
			</header>
			<Products products={products}/>  {/*sending products as a prop*/}
		</div>
	);
}

export default App;
