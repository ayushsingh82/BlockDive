import React from 'react';
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

import { TypewriterEffectSmooth } from './ui/typewriter-effect';
import { BackgroundBeams } from "./ui/background-beams";


function BackgroundBeamsDemo() {
    return (
      <div className="h-[60rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
        <div className="max-w-2xl mx-auto p-4 mt-[-280px]">
          <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          <TypewriterEffectSmoothDemo/>
          </h1>
          <p></p>
          <p className="text-white max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          A powerful explorer providing real-time insights into transactions, accounts, and smart contracts on Aptos, Ethereum , Base and much more
          </p>
          <button className='ml-[150px] mt-[20px] '
          style={{
            padding: '10px',
            fontSize: '1.25rem',
            color: 'white', // Button text color
            border: '2px solid transparent',
            borderRadius: '0.5rem',
            backgroundImage:
              'linear-gradient(black, black), linear-gradient(to right, #45E1E5, #0052FF, #B82EA4, #FF9533, #7FD057, #45E1E5)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
          }}
        >
          Join the community
        </button>
        
        </div>
        <BackgroundBeams />
      </div>
    );
  }

const TypewriterEffectSmoothDemo = () => {
    const words = [
        {
            text: "Explore",
        },
        {
            text: "onchain data ",
        },
        {
            text: "with",
        },
        {
            text: "BlockDive.",
            className: "text-green-500 dark:text-green-500",
        },
    ];
    return (
        <div className="flex flex-col items-center justify-center h-[5rem] mt-[40px]">
            <TypewriterEffectSmooth words={words} />
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
            </div>
        </div>
    );
}

function Home() {
    return (
        <div className='flex flex-col items-center bg-black scroller min-h-screen'>
            
                 <BackgroundBeamsDemo/> 
   
        </div>
    )
}

export default Home


