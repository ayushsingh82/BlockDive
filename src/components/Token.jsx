// TokenPage.jsx

import React from "react";
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
                className="border border-green-500 hover:scale-105 duration-100 cursor-pointer"
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
        <div>This Account doesn't have any Tokens</div>
      )}
    </div>
  );
};

// Main component to display the token list
const TokenList = () => {
  const accountAddress = "0x123..."; // Replace with actual account address
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

// Final wrapper component for the Token page
const Token = () => {
  return (
    <div>
      <h1 className="text-center text-4xl font-bold my-10">Token Page</h1>
      <TokenList />
    </div>
  );
};

export default Token;
