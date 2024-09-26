import React, { useState, useEffect } from 'react';

const Aptos = () => {
  const API_KEY = 'Vpr4FxPyIscI2DlzIwTSJ3JebtUf5_W1'; // Store API key in a constant
  const [accountData, setAccountData] = useState(null);
  const [moduleData, setModuleData] = useState(null);
  const [modulesList, setModulesList] = useState(null);

  useEffect(() => {
    const fetchAccountData = async () => {
      const url = 'https://aptos-mainnet.nodit.io/v1/accounts/0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa';
      const options = {
        method: 'GET',
        headers: { 
          accept: 'application/json', 
          'X-API-KEY': API_KEY  // Use API_KEY constant here
        },
      };

      try {
        const res = await fetch(url, options);
        const json = await res.json();
        setAccountData(json);
      } catch (err) {
        console.error('Error fetching account data:', err);
      }
    };

    const fetchModuleData = async () => {
      const url = 'https://aptos-mainnet.nodit.io/v1/accounts/0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa/module/asset';
      const options = {
        method: 'GET',
        headers: { 
          accept: 'application/json', 
          'X-API-KEY': API_KEY  // Use API_KEY constant here
        },
      };

      try {
        const res = await fetch(url, options);
        const json = await res.json();
        setModuleData(json);
      } catch (err) {
        console.error('Error fetching module data:', err);
      }
    };

    const fetchModulesList = async () => {
      const url = 'https://aptos-mainnet.nodit.io/v1/accounts/0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa/modules';
      const options = {
        method: 'GET',
        headers: { 
          accept: 'application/json', 
          'X-API-KEY': API_KEY  // Use API_KEY constant here
        },
      };

      try {
        const res = await fetch(url, options);
        const json = await res.json();
        setModulesList(json);
      } catch (err) {
        console.error('Error fetching modules list:', err);
      }
    };

    // Call all the APIs
    fetchAccountData();
    fetchModuleData();
    fetchModulesList();
  }, [API_KEY]);

  return (
    <div>
      <h1>Aptos Account Details</h1>
      <h2>Account Data</h2>
      {accountData ? <pre>{JSON.stringify(accountData, null, 2)}</pre> : <p>Loading account data...</p>}
      
      <h2>Module Data</h2>
      {moduleData ? <pre>{JSON.stringify(moduleData, null, 2)}</pre> : <p>Loading module data...</p>}
      
      <h2>All Modules</h2>
      {modulesList ? <pre>{JSON.stringify(modulesList, null, 2)}</pre> : <p>Loading modules list...</p>}
    </div>
  );
};

export default Aptos;
