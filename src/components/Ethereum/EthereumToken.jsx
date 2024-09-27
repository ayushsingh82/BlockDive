import React, { useState } from 'react';

const EthereumToken = () => {
  const [accountAddress, setAccountAddress] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [response, setResponse] = useState('');
  const [apiType, setApiType] = useState('nativeBalance');

  const apiKey = 'Vpr4FxPyIscI2DlzIwTSJ3JebtUf5_W1';

  const apiUrls = {
    nativeBalance: 'https://web3.nodit.io/v1/ethereum/mainnet/native/getNativeBalanceByAccount',
    tokenMetadata: 'https://web3.nodit.io/v1/ethereum/mainnet/token/getTokenContractMetadataByContracts',
    tokenHolders: 'https://web3.nodit.io/v1/ethereum/mainnet/token/getTokenHoldersByContract',
    tokenTransfersByAccount: 'https://web3.nodit.io/v1/ethereum/mainnet/token/getTokenTransfersByAccount',
    tokenTransfersByContract: 'https://web3.nodit.io/v1/ethereum/mainnet/token/getTokenTransfersByContract',
    tokensOwnedByAccount: 'https://web3.nodit.io/v1/ethereum/mainnet/token/getTokensOwnedByAccount',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let url = '';
    let body = {};
    
    switch (apiType) {
      case 'nativeBalance':
        url = apiUrls.nativeBalance;
        body = { accountAddress };
        break;
      case 'tokenMetadata':
        url = apiUrls.tokenMetadata;
        body = { contractAddresses: [contractAddress] };
        break;
      case 'tokenHolders':
        url = apiUrls.tokenHolders;
        body = { contractAddress };
        break;
      case 'tokenTransfersByAccount':
        url = apiUrls.tokenTransfersByAccount;
        body = {
          accountAddress,
          fromBlock: '19415000',
          toBlock: 'latest',
          withCount: false,
          withZeroValue: true,
        };
        break;
      case 'tokenTransfersByContract':
        url = apiUrls.tokenTransfersByContract;
        body = {
          contractAddress,
          fromBlock: '19415000',
          toBlock: 'latest',
          withCount: false,
          withZeroValue: true,
        };
        break;
      case 'tokensOwnedByAccount':
        url = apiUrls.tokensOwnedByAccount;
        body = { accountAddress, withCount: false };
        break;
      default:
        break;
    }

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'X-API-KEY': apiKey,
      },
      body: JSON.stringify(body),
    };

    try {
      const res = await fetch(url, options);
      const json = await res.json();
      setResponse(JSON.stringify(json, null, 2));
    } catch (err) {
      console.error('Error:', err);
      setResponse(`Error: ${err.message}`);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Ethereum Token Explorer</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Select API Call</label>
          <select
            value={apiType}
            onChange={(e) => setApiType(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
          >
            <option value="nativeBalance">Get Native Balance by Account</option>
            <option value="tokenMetadata">Get Token Contract Metadata</option>
            <option value="tokenHolders">Get Token Holders by Contract</option>
            <option value="tokenTransfersByAccount">Get Token Transfers by Account</option>
            <option value="tokenTransfersByContract">Get Token Transfers by Contract</option>
            <option value="tokensOwnedByAccount">Get Tokens Owned By Account</option>
          </select>
        </div>

        {['nativeBalance', 'tokenTransfersByAccount', 'tokensOwnedByAccount'].includes(apiType) && (
          <div>
            <label className="block mb-2">Account Address</label>
            <input
              type="text"
              value={accountAddress}
              onChange={(e) => setAccountAddress(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
              placeholder="Enter Account Address"
            />
          </div>
        )}

        {['tokenMetadata', 'tokenHolders', 'tokenTransfersByContract'].includes(apiType) && (
          <div>
            <label className="block mb-2">Contract Address</label>
            <input
              type="text"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
              placeholder="Enter Contract Address"
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

export default EthereumToken;


//account - 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045
//contract - 0xdAC17F958D2ee523a2206206994597C13D831ec7