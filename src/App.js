import './App.css';
import React, { useState, useEffect } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import consumerPurchaseHistory from '';

function App() {
  const [isConsumer, setIsConsumer] = useState(false);
  const [isManufacturer, setIsManufacturer] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [account, setaccount] = useState('');

  const loadBlockChainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    if (accounts) {
      setaccount(accounts[0]);
    }
    const networkId = await web3.eth.net.getId();

    
  };

  const consumerRoute = () => {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/product-tracking" exact component={consumerTracking} />
      </Switch>
    )
  }

  const sellerRoute = () => {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route
          path="/sell-product"
          exact
          component={sellProduct}
        />
        <Route path="/product-for-sale" exact component={ProductforSale} />
      </Switch>
    )
  }

  const manufacturerRoute = () => {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route
          path="/add-product"
          exact
          component={addProduct}
        />
        <Route path="/add-seller" exact component={addSeller} />
        <Route path="/sell-product-to-seller " exact component={sellProductToseller} />
        <Route path="/find-seller" exact component={findSeller} />
      </Switch>
    )
  }

  const renderRoutes = () => {
    if (isConsumer) return consumerRoute();
    else if (isManufacturer) return manufacturerRoute();
    else if (isSeller) return sellerRoute();
    else return Home;
  };

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        {renderRoutes()}
      </BrowserRouter>
    </div>
  );
}

export default App;
