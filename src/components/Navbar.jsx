import React,{useState} from 'react'
// import { ConnectButton } from '@rainbow-me/rainbowkit';


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
      <nav className=''>
        <div className='flex flex-row mx-auto px-[40px] py-[25px] justify-between items-center mt-[0px] bg-black'>
          <div className='font-semibold text-2xl text-green-500'>
            <a href='/'>Aptos</a>
          </div>
          <div className='flex justify-center flex-1 space-x-8 text-center'>
            <h1 className='font-mediumm text-lg text-white'>
              <a href='/token'>Token</a>
            </h1>
            <h1 className='font-medium text-lg text-white'>
              <a href='/nft'>NFT</a>
            </h1>
            <h1 className='font-medium text-lg text-white'>
            <a href='/aptosaccounts'>AptAccount</a>
          </h1>
          <h1 className='font-medium text-lg text-white'>
          <a href='/aptostxns'>AptTnxs</a>
        </h1>
        <h1 className='font-medium text-lg text-white'>
        <a href='/ethnft'>ETHNFT</a>
      </h1>
      <h1 className='font-medium text-lg text-white'>
        <a href='/base'>Base</a>
      </h1>
      <h1 className='font-medium text-lg text-white'>
      <a href='/arbitrum'>Arbitrum</a>
    </h1>
    <h1 className='font-medium text-lg text-white'>
      <a href='/explorer'>Explorer</a>
    </h1>
    <h1 className='font-medium text-lg text-white'>
    <a href='/ethtoken'>EthToken</a>
  </h1>

    {/* Dropdown button */}
    <div className='relative justify-end'>
    <button
      onClick={toggleDropdown}
      className='bg-green-500 text-white px-4 py-2 rounded-md'>
      Get Started
    </button>

    {/* Dropdown Menu */}
    {dropdownOpen && (
      <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg'>
        <a
          href='/aptosaccounts'
          className='block px-4 py-2 text-black hover:bg-gray-200'>
          Aptos Account
        </a>
        <a
          href='/aptostxns'
          className='block px-4 py-2 text-black hover:bg-gray-200'>
          Aptos Transactions
        </a>
        <a
          href='/ethnft'
          className='block px-4 py-2 text-black hover:bg-gray-200'>
          Ethereum NFT
        </a>
        <a
        href='/ethtoken'
        className='block px-4 py-2 text-black hover:bg-gray-200'>
        Ethereum Token
      </a>
        <a
          href='/base'
          className='block px-4 py-2 text-black hover:bg-gray-200'>
          Base
        </a>
        <a
          href='/arbitrum'
          className='block px-4 py-2 text-black hover:bg-gray-200'>
          Arbitrum
        </a>
        <a
        href='/explorer'
        className='block px-4 py-2 text-black hover:bg-gray-200'>
        Explorer
      </a>
      </div>
    )}
  </div>


          </div>
        </div>
        <div style={gradientStyle} />
      </nav>
    );
  }
  

export default Navbar