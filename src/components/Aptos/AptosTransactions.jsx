import React, { useState } from 'react';

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Aptos Transactions Fetcher</h1>

        {/* Input for the address */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">Enter Address (for account transactions):</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter Aptos account address"
          />
        </div>

        {/* Input for the transaction hash */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">Enter Transaction Hash (for specific transaction):</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={txnHash}
            onChange={(e) => setTxnHash(e.target.value)}
            placeholder="Enter transaction hash"
          />
        </div>

        {/* Radio buttons to select the transaction type */}
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Select Transaction Data Type:</h2>
          <div className="flex flex-col space-y-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-indigo-600"
                value="allTransactions"
                checked={dataType === 'allTransactions'}
                onChange={() => setDataType('allTransactions')}
              />
              <span className="ml-2">All Transactions</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-indigo-600"
                value="txnByHash"
                checked={dataType === 'txnByHash'}
                onChange={() => setDataType('txnByHash')}
              />
              <span className="ml-2">Transaction by Hash</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-indigo-600"
                value="accountTransactions"
                checked={dataType === 'accountTransactions'}
                onChange={() => setDataType('accountTransactions')}
              />
              <span className="ml-2">Account Transactions</span>
            </label>
          </div>
        </div>

        {/* Button to trigger API call */}
        <button
          onClick={handleFetchTransactions}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
        >
          Fetch Transactions
        </button>

        {/* Display the result */}
        <div className="mt-6">
          {transactionData && (
            <>
              <h2 className="text-xl font-semibold mb-2">Transaction Data</h2>
              <pre className="bg-gray-100 p-4 rounded-lg">{JSON.stringify(transactionData, null, 2)}</pre>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AptosTransactions;




// txns hash - 0xf9a029e3221f9df86e5542f7f649e4acbfb3680423b218c91cdd895f6b62ab6b