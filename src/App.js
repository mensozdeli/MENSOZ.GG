import logo from './logo.png';
import './App.css';

import Products from './components/Products/Products';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <iframe width="311" height="175" src="https://www.youtube.com/embed/bvygXwsl5PI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <p>
          ¡ Order Coming Up !
        </p>
  
      </header>
      <Products />
    </div>
  );
}

export default App;
