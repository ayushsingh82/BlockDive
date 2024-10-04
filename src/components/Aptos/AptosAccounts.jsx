import React, { useState } from 'react';

const AptosAccounts = () => {
  const API_KEY = 'Vpr4FxPyIscI2DlzIwTSJ3JebtUf5_W1'; // Store API key in a constant
  const [address, setAddress] = useState('');
  const [dataType, setDataType] = useState(''); // To store selected data type
  const [accountData, setAccountData] = useState(null);
  const [moduleData, setModuleData] = useState(null);
  const [modulesList, setModulesList] = useState(null);
  const [resourceData, setResourceData] = useState(null);
  const [resourcesData, setResourcesData] = useState(null);

  const handleFetchData = async () => {
    if (!address) {
      alert('Please enter a valid address');
      return;
    }

    if (!dataType) {
      alert('Please select the type of data to fetch');
      return;
    }

    const baseURL = `https://aptos-mainnet.nodit.io/v1/accounts/${address}`;
    const headers = {
      accept: 'application/json',
      'X-API-KEY': API_KEY
    };

    try {
      let url = '';
      let res, json;

      if (dataType === 'accountData') {
        url = baseURL;
        res = await fetch(url, { method: 'GET', headers });
        json = await res.json();
        setAccountData(json);
        setModuleData(null);
        setModulesList(null);
        setResourceData(null);
        setResourcesData(null);
      } else if (dataType === 'moduleData') {
        url = `${baseURL}/module/asset`;
        res = await fetch(url, { method: 'GET', headers });
        json = await res.json();
        setModuleData(json);
        setAccountData(null);
        setModulesList(null);
        setResourceData(null);
        setResourcesData(null);
      } else if (dataType === 'modulesList') {
        url = `${baseURL}/modules`;
        res = await fetch(url, { method: 'GET', headers });
        json = await res.json();
        setModulesList(json);
        setAccountData(null);
        setModuleData(null);
        setResourceData(null);
        setResourcesData(null);
      } else if (dataType === 'resource') {
        url = `${baseURL}/resource/0x1::account::Account`;
        res = await fetch(url, { method: 'GET', headers });
        json = await res.json();
        setResourceData(json);
        setAccountData(null);
        setModuleData(null);
        setModulesList(null);
        setResourcesData(null);
      } else if (dataType === 'resources') {
        url = `${baseURL}/resources`;
        res = await fetch(url, { method: 'GET', headers });
        json = await res.json();
        setResourcesData(json);
        setAccountData(null);
        setModuleData(null);
        setModulesList(null);
        setResourceData(null);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const draggableStyle = {
    maxHeight: '400px', // Increase max height for better visibility
    maxWidth: '100%', // Ensures the pre block is wider
    overflow: 'auto',
    cursor: 'grab',
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div
        className="bg-black p-8 rounded-lg w-full max-w-3xl border-4 border-transparent"
        style={{ borderImage: 'linear-gradient(90deg, #32CD32, #006400, #1E90FF, #8A2BE2) 1' }}


        // Updated main div width
      >
        <h1 className="text-2xl font-bold mb-4 text-green-500 text-center">Aptos Account Data </h1>

        {/* Input for the address */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-300">Enter Address:</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-600 rounded-lg shadow-sm bg-gray-900 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter Aptos account address"
          />
        </div>

        {/* Radio buttons to select the data type */}
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2 text-white">Select Data Type:</h2>
          <div className="flex flex-col space-y-2">
            <label className="inline-flex items-center text-white">
              <input
                type="radio"
                className="form-radio text-indigo-600"
                value="accountData"
                checked={dataType === 'accountData'}
                onChange={() => setDataType('accountData')}
              />
              <span className="ml-2">Account Data</span>
            </label>
            <label className="inline-flex items-center text-white">
              <input
                type="radio"
                className="form-radio text-indigo-600"
                value="moduleData"
                checked={dataType === 'moduleData'}
                onChange={() => setDataType('moduleData')}
              />
              <span className="ml-2">Module Data</span>
            </label>
            <label className="inline-flex items-center text-white">
              <input
                type="radio"
                className="form-radio text-indigo-600"
                value="modulesList"
                checked={dataType === 'modulesList'}
                onChange={() => setDataType('modulesList')}
              />
              <span className="ml-2">Modules List</span>
            </label>
            <label className="inline-flex items-center text-white">
              <input
                type="radio"
                className="form-radio text-indigo-600"
                value="resource"
                checked={dataType === 'resource'}
                onChange={() => setDataType('resource')}
              />
              <span className="ml-2">Resource</span>
            </label>
            <label className="inline-flex items-center text-white">
              <input
                type="radio"
                className="form-radio text-indigo-600"
                value="resources"
                checked={dataType === 'resources'}
                onChange={() => setDataType('resources')}
              />
              <span className="ml-2">Resources</span>
            </label>
          </div>
        </div>

        {/* Button to trigger API call */}
        <button
          onClick={handleFetchData}
          className="w-full bg-gradient-to-r from-green-500  via-green-700 to-green-300 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition duration-200"
        >
          Fetch Data
        </button>

        {/* Display the result */}
        <div className="mt-6">
          {accountData && (
            <>
              <h2 className="text-xl font-semibold mb-2 text-white">Account Data</h2>
              <pre className="bg-gray-900 text-white p-4 rounded-lg" style={draggableStyle}>
                {JSON.stringify(accountData, null, 2)}
              </pre>
            </>
          )}
          {moduleData && (
            <>
              <h2 className="text-xl font-semibold mb-2 text-white">Module Data</h2>
              <pre className="bg-gray-900 text-white p-4 rounded-lg" style={draggableStyle}>
                {JSON.stringify(moduleData, null, 2)}
              </pre>
            </>
          )}
          {modulesList && (
            <>
              <h2 className="text-xl font-semibold mb-2 text-white">Modules List</h2>
              <pre className="bg-gray-900 text-white p-4 rounded-lg" style={draggableStyle}>
                {JSON.stringify(modulesList, null, 2)}
              </pre>
            </>
          )}
          {resourceData && (
            <>
              <h2 className="text-xl font-semibold mb-2 text-white">Resource Data</h2>
              <pre className="bg-gray-900 text-white p-4 rounded-lg" style={draggableStyle}>
                {JSON.stringify(resourceData, null, 2)}
              </pre>
            </>
          )}
          {resourcesData && (
            <>
              <h2 className="text-xl font-semibold mb-2 text-white">Resources Data</h2>
              <pre className="bg-gray-900 text-white p-4 rounded-lg" style={draggableStyle}>
                {JSON.stringify(resourcesData, null, 2)}
              </pre>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AptosAccounts;





// 0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa