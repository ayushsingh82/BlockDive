import React from 'react';
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

import { TypewriterEffectSmooth } from './ui/typewriter-effect';





const TypewriterEffectSmoothDemo = () => {
    const words = [
        {
            text: "Run",
        },
        {
            text: "Nodes",
        },
        {
            text: "with",
        },
        {
            text: "Puffer.",
            className: "text-purple-500 dark:text-purple-500",
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
            <div className='text-4xl'>
                <TypewriterEffectSmoothDemo />
            </div>
            <h3 className='mt-[20px] text-white text-xl'>
                Create and manage ad campaigns effortlessly. Our user-friendly platform allows you
                <br /> to design, launch, and monitor your ads seamlessly, ensuring maximum reach and
                <br /> engagement with minimal hassle.
            </h3>
            <button className='mt-[20px] border-2 border-purple-500 text-white px-[10px] py-[10px] font-medium text-xl bg-gradient-to-r from-purple-900 via-black to-black rounded-lg mx-auto'>
                Join the community
            </button>
          
        </div>
    )
}

export default Home


