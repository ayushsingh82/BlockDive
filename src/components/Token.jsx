import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// Create API instance using environment variables
const apiKey = "-K5v1arBZA9ZC-tYoG9rYbwTLCuAHo8a";
const protocol = "ethereum";
const network = "mainnet";

export function createWeb3ApiInstance() {
  const instance = axios.create({
    baseURL: `https://web3.nodit.io/v1/${protocol}/${network}`,
    headers: {
      "X-API-KEY": `${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return instance;
}

const instance = createWeb3ApiInstance();

// API Query to fetch tokens owned by an account
export const useGetTokensOwnedByAccount = (accountAddress, page, rpp = 20) => {
  return useQuery({
    queryKey: ["getTokensOwnedByAccount", accountAddress, page, rpp],
    queryFn: async () => {
      try {
        const result = await instance.post("token/getTokensOwnedByAccount", {
          accountAddress,
          withCount: true,
          rpp,
          page,
        });
        return result.data;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    enabled: !!accountAddress, // Only run query if accountAddress is provided
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Table component for displaying Tokens
const TokenTable = ({ ownedTokensByAccountData }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-10 text-2xl font-bold">Token List</div>
      {ownedTokensByAccountData && ownedTokensByAccountData.items.length > 0 ? (
        <table className="w-full max-w-7xl table-fixed border-collapse mt-5 mb-10 shadow-xl shadow-black">
          <thead>
            <tr className="border-2 border-green-500 bg-green-500 text-white">
              <th className="pl-5">Number</th>
              <th className="p-5">Name</th>
              <th className="p-5">Symbol</th>
              <th className="p-5">Decimals</th>
              <th className="pr-5">Balances</th>
            </tr>
          </thead>
          <tbody>
            {ownedTokensByAccountData.items.map((item, index) => (
              <tr
                key={item.contract.deployedTransactionHash}
                className="border text-white border-green-500 hover:scale-105 duration-100 cursor-pointer"
              >
                <th className="font-bold p-5">
                  {ownedTokensByAccountData.page === 1
                    ? index + 1
                    : ownedTokensByAccountData.page * 20 + index - 19}
                </th>
                <th className="font-light p-5">{item.contract.name}</th>
                <th className="font-light p-5">{item.contract.symbol}</th>
                <th className="font-light p-5">{item.contract.decimals}</th>
                <th className="font-light p-5">{item.balance}</th>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-white">This Account doesn't have any Tokens</div>
      )}
    </div>
  );
};

// Main component to display the token list
const TokenList = ({ accountAddress }) => {
  const currentPage = 1; // Set the page number for pagination

  const { data: ownedTokenData, isLoading, isError } = useGetTokensOwnedByAccount(accountAddress, currentPage);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading Tokens</div>;

  return (
    <div>
      <TokenTable ownedTokensByAccountData={ownedTokenData} />
    </div>
  );
};

// Final wrapper component for the Token page with input box for account address
const Token = () => {
  const [accountAddress, setAccountAddress] = useState(""); // State for input box

  const handleInputChange = (e) => {
    setAccountAddress(e.target.value);
  };

  // Gradient style for the input box border
  const gradientStyle = {
    background: 'linear-gradient(to right, #45E1E5, #0052FF, #B82EA4, #FF9533, #7FD057, #45E1E5)',
    padding: '2px', // padding for the gradient border
    borderRadius: '8px',
    marginBottom: '20px',
    width: '50%',
  };

  const inputStyle = {
    backgroundColor: '#000', // Input box background color
    border: 'none', // Remove default border
    color: '#fff', // Text color inside the input
    padding: '10px',
    borderRadius: '6px',
    width: '100%',
  };

  return (
    <div className="flex flex-col items-center bg-black min-h-screen">
     
      <div style={gradientStyle} className="mt-[20px]">
        <input
          type="text"
          placeholder="Enter Account Address"
          value={accountAddress}
          onChange={handleInputChange}
          style={inputStyle}
        />
      </div>
      {accountAddress ? <TokenList accountAddress={accountAddress} /> : <div className="text-white">Please enter an account address</div>}
    </div>
  );
};

export default Token;


//0x385E0b7d653A0a2e1a1703Bd79C7a6558EfDc31b
//0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D