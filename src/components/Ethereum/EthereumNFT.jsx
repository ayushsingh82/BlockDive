import React, { useState } from 'react';

const EthereumNFT = () => {
  const [option, setOption] = useState('account');
  const [inputValue, setInputValue] = useState('');
  const [results, setResults] = useState(null);

  const handleOptionChange = (e) => {
    setOption(e.target.value);
    setInputValue(''); // Reset input value when switching options
    setResults(null);  // Clear previous results
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const fetchNftsByAccount = async () => {
    const url = 'https://web3.nodit.io/v1/ethereum/mainnet/nft/getNftContractsByAccount';
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'X-API-KEY': 'nodit-demo'
      },
      body: JSON.stringify({ accountAddress: inputValue, withCount: false })
    };
    const response = await fetch(url, options);
    const data = await response.json();
    setResults(data);
  };

  const fetchNftsByContract = async () => {
    const url = 'https://web3.nodit.io/v1/ethereum/mainnet/nft/getNftContractMetadataByContracts';
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'X-API-KEY': 'nodit-demo'
      },
      body: JSON.stringify({
        contractAddresses: inputValue.split(','), // Support multiple contracts
      })
    };
    const response = await fetch(url, options);
    const data = await response.json();
    setResults(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (option === 'account') {
      fetchNftsByAccount();
    } else {
      fetchNftsByContract();
    }
  };

  return (
    <div className="ethereum-nft">
      <h2>Fetch Ethereum NFTs</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              type="radio"
              value="account"
              checked={option === 'account'}
              onChange={handleOptionChange}
            />
            By Account
          </label>
          <label>
            <input
              type="radio"
              value="contract"
              checked={option === 'contract'}
              onChange={handleOptionChange}
            />
            By Contract
          </label>
        </div>

        {option === 'account' && (
          <div>
            <label>Account Address:</label>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter Ethereum account address"
              required
            />
          </div>
        )}

        {option === 'contract' && (
          <div>
            <label>Contract Addresses (comma-separated):</label>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter contract addresses"
              required
            />
          </div>
        )}

        <button type="submit">Fetch NFTs</button>
      </form>

      {results && (
        <div className="results">
          <h3>Results</h3>
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default EthereumNFT;
