// NftPage.jsx

import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// Create API instance using environment variables
const apiKey ="-K5v1arBZA9ZC-tYoG9rYbwTLCuAHo8a";
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

// API Query to fetch NFTs owned by an account
export const useGetNFTOwnedByAccount = (accountAddress, page) => {
  return useQuery({
    queryKey: ["getNFTOwnedByAccount", accountAddress, page],
    queryFn: async () => {
      try {
        const result = await instance.post("nft/getNftsOwnedByAccount", {
          accountAddress,
          withCount: true,
          withMetadata: true,
          rpp: 20,
          page: page,
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

// Table component for displaying NFTs
const NftTable = ({ ownedNftsByAccountData }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-10 text-2xl font-bold">NFT List</div>
      {ownedNftsByAccountData && ownedNftsByAccountData.items.length > 0 ? (
        <table className="w-full max-w-7xl table-fixed border-collapse mt-5 mb-10 shadow-xl shadow-black">
          <thead>
            <tr className="border-2 border-green-500 bg-green-500 text-white">
              <th className="pl-5">Number</th>
              <th className="p-5">Name</th>
              <th className="p-5">Symbol</th>
              <th className="pr-5">Token Id</th>
            </tr>
          </thead>
          <tbody>
            {ownedNftsByAccountData.items.map((item, index) => (
              <tr
                key={index + item.contract.deployedTransactionHash}
                className="border border-green-500 hover:scale-105 duration-100 cursor-pointer"
              >
                <th className="font-bold p-5">
                  {ownedNftsByAccountData.page === 1
                    ? index + 1
                    : ownedNftsByAccountData.page * 20 + index - 19}
                </th>
                <th className="font-light p-5">{item.contract.name}</th>
                <th className="font-light p-5">{item.contract.symbol}</th>
                <th className="font-light p-5">
                  {item.tokenId.length < 10
                    ? item.tokenId
                    : item.tokenId.slice(0, 10) + "..."}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>This Account doesn't have any NFTs</div>
      )}
    </div>
  );
};

// Main component to display the NFT list
const NftList = () => {
  const accountAddress = "0x385E0b7d653A0a2e1a1703Bd79C7a6558EfDc31b"; // Replace with actual account address
  const currentPage = 1; // Set the page number for pagination

  const { data: ownedNftData, isLoading, isError } = useGetNFTOwnedByAccount(accountAddress, currentPage);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading NFTs</div>;

  return (
    <div>
      <NftTable ownedNftsByAccountData={ownedNftData} />
    </div>
  );
};

// Final wrapper component for the NFT page
const NFT = () => {
  return (
    <div>
    
      <NftList />
    </div>
  );
};

export default NFT;
