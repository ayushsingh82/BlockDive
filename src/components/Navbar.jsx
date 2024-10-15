import React, { useState } from 'react';

const gradientStyle = {
  background: 'linear-gradient(to right, #45E1E5, #0052FF, #B82EA4, #FF9533, #7FD057, #45E1E5)',
  height: '4px',
  width: '100%',
  border: 'none',
};

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav>
      <div className='flex flex-row mx-auto px-[40px] py-[25px] justify-between items-center mt-[0px] bg-black'>
        <div className='font-semibold text-2xl text-green-500'>
          <a href='/'>BlockDive</a>
        </div>
     


          {/* Dropdown button */}
          <div className='relative justify-end'>
            <button
              onClick={toggleDropdown}
              className='bg-green-500 text-white px-4 py-2 rounded-md'
            >
              Get Started
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50'> {/* Increased z-index */}
                <a href='/token' className='block px-4 py-2 text-black hover:bg-gray-200'>
                  Tokens
                </a>
                <a href='/nft' className='block px-4 py-2 text-black hover:bg-gray-200'>
                  NFTs
                </a>
                <a href='/aptosaccounts' className='block px-4 py-2 text-black hover:bg-gray-200'>
                  Aptos Account
                </a>
                <a href='/aptostxns' className='block px-4 py-2 text-black hover:bg-gray-200'>
                  Aptos Transactions
                </a>
                <a href='/ethnft' className='block px-4 py-2 text-black hover:bg-gray-200'>
                  Ethereum NFT
                </a>
                <a href='/ethtoken' className='block px-4 py-2 text-black hover:bg-gray-200'>
                  Ethereum Token
                </a>
                <a href='/base' className='block px-4 py-2 text-black hover:bg-gray-200'>
                  Base
                </a>
                <a href='/arbitrum' className='block px-4 py-2 text-black hover:bg-gray-200'>
                  Arbitrum
                </a>
                <a href='/explorer' className='block px-4 py-2 text-black hover:bg-gray-200'>
                  Mutichain
                </a>
              </div>
            )}
          </div>
      </div>
      <div style={gradientStyle} />
    </nav>
  );
}

export default Navbar;
