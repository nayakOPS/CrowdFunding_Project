import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// require('dotenv').config();

import { StateContextProvider } from './context';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThirdwebProvider 
        activeChain = "sepolia"
        clientId={"851e1502604aea2a1e5cddd2298a920f"}    
    >
        <Router>
            <StateContextProvider>
                <App/>
            </StateContextProvider>
        </Router>
    </ThirdwebProvider>
)