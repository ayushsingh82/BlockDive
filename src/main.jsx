import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter,RouterProvider,createRoutesFromElements} from 'react-router-dom'
import { Route } from 'react-router-dom'
import Home from './components/Home.jsx'
import Navbar from './components/Navbar.jsx'
import NFT from './components/NFT.jsx'
import Token from './components/Token.jsx'
import AptosAccounts from './components/Aptos/AptosAccounts.jsx'
import AptosTransactions from './components/Aptos/AptosTransactions.jsx'
import EthereumNFT from './components/Ethereum/EthereumNFT.jsx'
import Base from './components/Base.jsx'
import Arbitrum from './components/Arbitrum.jsx'
import EthereumToken from './components/Ethereum/EthereumToken.jsx'
import ApiExplorer from './components/ApiExplorer.jsx'

import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  sepolia,
  optimismGoerli,
  arbitrumGoerli,
  polygonMumbai,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";


const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'e7fa7d19fd057ecd9403a0e89bd62b8b',
  chains: [sepolia, optimismGoerli, arbitrumGoerli, polygonMumbai],
  ssr: false
});

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
    <Route path='/' element={<Home/>}/>
    <Route path='/nft' element={<NFT/>}/>
    <Route path='/token' element={<Token/>}/>
    <Route path='/aptosaccounts' element={<AptosAccounts/>}/>
    <Route path='/aptostxns' element={<AptosTransactions/>}/>
    <Route path='/ethnft' element={<EthereumNFT/>}/>
    <Route path='/ethtoken' element={<EthereumToken/>}/>
     <Route path='/base' element={<Base/>}/>
     <Route path='/arbitrum' element={<Arbitrum/>}/>
     <Route path='/explorer' element={<ApiExplorer/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <WagmiProvider config={config}>
  <QueryClientProvider client={queryClient}>
    <RainbowKitProvider>
   <Navbar/>
   <RouterProvider router={router}/>
    </RainbowKitProvider>
  </QueryClientProvider>
  </WagmiProvider>
  </React.StrictMode>,
)
