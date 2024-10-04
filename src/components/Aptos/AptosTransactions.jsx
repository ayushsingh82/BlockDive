import React, { useState } from 'react';
import Draggable from 'react-draggable'; // Make sure to install this package

const AptosTransactions = () => {
  const API_KEY = 'Vpr4FxPyIscI2DlzIwTSJ3JebtUf5_W1'; // API Key
  const [address, setAddress] = useState('');
  const [txnHash, setTxnHash] = useState('');
  const [dataType, setDataType] = useState(''); // To store selected data type
  const [transactionData, setTransactionData] = useState(null);

  const handleFetchTransactions = async () => {
    if (!dataType) {
      alert('Please select the type of transaction data to fetch');
      return;
    }

    let url = '';
    const headers = {
      accept: 'application/json',
      'X-API-KEY': API_KEY
    };

    try {
      if (dataType === 'allTransactions') {
        url = `https://aptos-mainnet.nodit.io/v1/transactions`;
      } else if (dataType === 'txnByHash' && txnHash) {
        url = `https://aptos-mainnet.nodit.io/v1/transactions/by_hash/${txnHash}`;
      } else if (dataType === 'accountTransactions' && address) {
        url = `https://aptos-mainnet.nodit.io/v1/accounts/${address}/transactions`;
      } else {
        alert('Please enter the required address or transaction hash');
        return;
      }

      const res = await fetch(url, { method: 'GET', headers });
      const json = await res.json();
      setTransactionData(json);
    } catch (err) {
      console.error('Error fetching transactions:', err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div
        className="bg-black p-8 rounded shadow-md w-full max-w-lg border-4"
        style={{
          borderImage: 'linear-gradient(90deg, #32CD32, #1E90FF, #8A2BE2) 1',
          borderStyle: 'solid',
        }}
      >
        <h1 className="text-2xl font-bold mb-4 text-center text-green-500">Aptos Transactions Fetcher</h1>

        {/* Input for the address */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-300">Enter account </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-black text-white"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter Aptos account address"
          />
        </div>

        {/* Input for the transaction hash */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-300">Enter Transaction Hash (for specific transaction):</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-black text-white"
            value={txnHash}
            onChange={(e) => setTxnHash(e.target.value)}
            placeholder="Enter transaction hash"
          />
        </div>

        {/* Radio buttons to select the transaction type */}
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2 text-white">Select Transaction Data Type:</h2>
          <div className="flex flex-col space-y-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-indigo-600"
                value="allTransactions"
                checked={dataType === 'allTransactions'}
                onChange={() => setDataType('allTransactions')}
              />
              <span className="ml-2 text-white">All Transactions</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-indigo-600"
                value="txnByHash"
                checked={dataType === 'txnByHash'}
                onChange={() => setDataType('txnByHash')}
              />
              <span className="ml-2 text-white">Transaction by Hash</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-indigo-600"
                value="accountTransactions"
                checked={dataType === 'accountTransactions'}
                onChange={() => setDataType('accountTransactions')}
              />
              <span className="ml-2 text-white">Account Transactions</span>
            </label>
          </div>
        </div>

        {/* Button to trigger API call */}
        <button
          onClick={handleFetchTransactions}
          className="w-full bg-gradient-to-r from-green-500  via-green-700 to-green-300 text-white py-2 px-4 rounded-lg  transition duration-200"
        >
          Fetch Transactions
        </button>

        {/* Display the result */}
        <Draggable>
          <div className="mt-6">
            {transactionData && (
              <>
                <h2 className="text-xl font-semibold mb-2 text-white">Transaction Data</h2>
                <pre className="bg-gray-800 text-white p-4 rounded-lg max-h-96 overflow-auto">{JSON.stringify(transactionData, null, 2)}</pre>
              </>
            )}
          </div>
        </Draggable>
      </div>
    </div>
  );
};

export default AptosTransactions;




// account - 0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa
// txns hash - 0xf9a029e3221f9df86e5542f7f649e4acbfb3680423b218c91cdd895f6b62ab6b