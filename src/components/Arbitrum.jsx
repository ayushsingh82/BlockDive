import React, { useState } from 'react';

const Arbitrum = () => {
  const [method, setMethod] = useState('eth_blockNumber');
  const [toAddress, setToAddress] = useState('');
  const [blockHash, setBlockHash] = useState('');
  const [fromAddress, setFromAddress] = useState('');
  const [value, setValue] = useState('');
  const [data, setData] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    let body;
    const url = 'https://arbitrum-mainnet.nodit.io/';
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'X-API-KEY': 'Vpr4FxPyIscI2DlzIwTSJ3JebtUf5_W1', // API key
      },
    };

    // Construct the body based on the selected method
    if (method === 'eth_blockNumber') {
      body = JSON.stringify({ id: 1, jsonrpc: '2.0', method });
    } else if (method === 'eth_estimateGas') {
      const hexValue = `0x${parseInt(value, 10).toString(16)}`;
      body = JSON.stringify({
        id: 1,
        jsonrpc: '2.0',
        method,
        params: [
          {
            from: fromAddress,
            to: toAddress,
            value: hexValue,
          },
        ],
      });
    } else if (method === 'eth_getBlockByHash') {
      body = JSON.stringify({
        id: 1,
        jsonrpc: '2.0',
        method,
        params: [blockHash, false],
      });
    } else if (method === 'eth_getLogs') {
      body = JSON.stringify({
        id: 1,
        jsonrpc: '2.0',
        method,
        params: [{ fromBlock: 'latest' }],
      });
    }

    try {
      const res = await fetch(url, { ...options, body });

      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
      }

      const json = await res.json();
      setResponse(JSON.stringify(json, null, 2));
    } catch (err) {
      console.error('Error:', err);
      setResponse(`Error: ${err.message}`);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Arbitrum API Explorer</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Method</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="eth_blockNumber">eth_blockNumber</option>
            <option value="eth_estimateGas">eth_estimateGas</option>
            <option value="eth_getBlockByHash">eth_getBlockByHash</option>
            <option value="eth_getLogs">eth_getLogs</option>
          </select>
        </div>

        {method === 'eth_estimateGas' && (
          <>
            <div>
              <label className="block mb-2">From Address</label>
              <input
                type="text"
                value={fromAddress}
                onChange={(e) => setFromAddress(e.target.value)}
                className="p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div>
              <label className="block mb-2">To Address</label>
              <input
                type="text"
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value)}
                className="p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div>
              <label className="block mb-2">Value (in Wei)</label>
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="p-2 border border-gray-300 rounded w-full"
              />
            </div>
          </>
        )}

        {method === 'eth_getBlockByHash' && (
          <div>
            <label className="block mb-2">Block Hash</label>
            <input
              type="text"
              value={blockHash}
              onChange={(e) => setBlockHash(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
        )}

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Fetch Data
        </button>
      </form>

      {response && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h2 className="text-lg font-semibold mb-2">Response</h2>
          <pre className="whitespace-pre-wrap">{response}</pre>
        </div>
      )}
    </div>
  );
};

export default Arbitrum;
