import React, { useState, useEffect } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import consumerTracking from './pages/Consumer/consumerTracking';
import sellProduct from './pages/Seller/sellProduct';
import ProductforSale from './pages/Seller/ProductforSale';
import addProduct from './pages/Manufacturer/addProduct';
import addSeller from './pages/Manufacturer/addSeller';
import sellProductToseller from './pages/Manufacturer/sellProductToseller';
import findSeller from './pages/Manufacturer/findSeller';

const ConsumerTracking = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [account, setaccount] = useState('');
    const [isConsumer, setisConsumer] = useState(false);

    const loadBlockChainData = async () => {
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        if (accounts) {
            setaccount(accounts[0]);
        }
        const networkId = await web3.eth.net.getId();

        const networkData = ProductManagement.networks[networkId];
        if (networkData) {
            const productManagement = new web3.eth.Contract(ProductTracker.abi, networkData.address);
            const role = await productManagement.methods.setUserRole().call();
            if (role == 0) {
                setisConsumer(true);
            }
            data
        }
        else {
            window.alert('Smart contract not deployed to detected network.');
        }
    };

    useEffect(() => {
        loadBlockChainData();
    }, []); 

    return (
        <div>
            <h1>Product Tracking</h1>
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Product ID</th>
                        <th>Product Price</th>
                        <th>Product Location</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.productName}</td>
                            <td>{item.productId}</td>
                            <td>{item.productPrice}</td>
                            <td>{item.productLocation}</td>
                            <td>{item.timestamp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ConsumerTracking;