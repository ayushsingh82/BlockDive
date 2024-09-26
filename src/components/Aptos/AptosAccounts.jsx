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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Aptos Data Fetcher</h1>

        {/* Input for the address */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">Enter Address:</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter Aptos account address"
          />
        </div>

        {/* Radio buttons to select the data type */}
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Select Data Type:</h2>
          <div className="flex flex-col space-y-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-indigo-600"
                value="accountData"
                checked={dataType === 'accountData'}
                onChange={() => setDataType('accountData')}
              />
              <span className="ml-2">Account Data</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-indigo-600"
                value="moduleData"
                checked={dataType === 'moduleData'}
                onChange={() => setDataType('moduleData')}
              />
              <span className="ml-2">Module Data</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-indigo-600"
                value="modulesList"
                checked={dataType === 'modulesList'}
                onChange={() => setDataType('modulesList')}
              />
              <span className="ml-2">Modules List</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-indigo-600"
                value="resource"
                checked={dataType === 'resource'}
                onChange={() => setDataType('resource')}
              />
              <span className="ml-2">Resource</span>
            </label>
            <label className="inline-flex items-center">
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
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
        >
          Fetch Data
        </button>

        {/* Display the result */}
        <div className="mt-6">
          {accountData && (
            <>
              <h2 className="text-xl font-semibold mb-2">Account Data</h2>
              <pre className="bg-gray-100 p-4 rounded-lg">{JSON.stringify(accountData, null, 2)}</pre>
            </>
          )}
          {moduleData && (
            <>
              <h2 className="text-xl font-semibold mb-2">Module Data</h2>
              <pre className="bg-gray-100 p-4 rounded-lg">{JSON.stringify(moduleData, null, 2)}</pre>
            </>
          )}
          {modulesList && (
            <>
              <h2 className="text-xl font-semibold mb-2">Modules List</h2>
              <pre className="bg-gray-100 p-4 rounded-lg">{JSON.stringify(modulesList, null, 2)}</pre>
            </>
          )}
          {resourceData && (
            <>
              <h2 className="text-xl font-semibold mb-2">Resource Data</h2>
              <pre className="bg-gray-100 p-4 rounded-lg">{JSON.stringify(resourceData, null, 2)}</pre>
            </>
          )}
          {resourcesData && (
            <>
              <h2 className="text-xl font-semibold mb-2">Resources Data</h2>
              <pre className="bg-gray-100 p-4 rounded-lg">{JSON.stringify(resourcesData, null, 2)}</pre>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AptosAccounts;
