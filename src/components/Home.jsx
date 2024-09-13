import React from 'react';
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "./ui/tracing-beam";
import { TypewriterEffectSmooth } from './ui/typewriter-effect';

export function TracingBeamDemo() {
    return (
        <TracingBeam className="px-6">
            <div className="max-w-2xl mx-auto antialiased pt-4 relative">
                {dummyContent.map((item, index) => (
                    <div key={`content-${index}`} className="mb-10">
                        <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
                            {item.badge}
                        </h2>
                        <p className="text-xl mb-4">
                            {item.title}
                        </p>
                        <div className="text-sm prose prose-sm dark:prose-invert">
                            {item?.image && (
                                <img
                                    src={item.image}
                                    alt="blog thumbnail"
                                    height="1000"
                                    width="1000"
                                    className="rounded-lg mb-10 object-cover"
                                />
                            )}
                            {item.description}
                        </div>
                    </div>
                ))}
            </div>
        </TracingBeam>
    );
}

const dummyContent = [
    {
        title: "Lorem Ipsum Dolor Sit Amet",
        description: (
            <>
                <p>
                    Sit duis est minim proident non nisi velit non consectetur. Esse
                    adipisicing laboris consectetur enim ipsum reprehenderit eu deserunt
                    Lorem ut aliqua anim do. Duis cupidatat qui irure cupidatat incididunt
                    incididunt enim magna id est qui sunt fugiat. Laboris do duis pariatur
                    fugiat Lorem aute sit ullamco. Qui deserunt non reprehenderit dolore
                  
                </p>
                <p>
                    Dolor minim irure ut Lorem proident. Ipsum do pariatur est ad ad
                    veniam in commodo id reprehenderit adipisicing. Proident duis
                    exercitation ad quis ex cupidatat cupidatat occaecat adipisicing.
                </p>
                <p>
                    Tempor quis dolor veniam quis dolor. Sit reprehenderit eiusmod
                    reprehenderit deserunt amet laborum consequat adipisicing officia qui
                   
                </p>
            </>
        ),
        // badge: "Features",
        image:
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Lorem Ipsum Dolor Sit Amet",
        description: (
            <>
                <p>
                    Ex irure dolore veniam ex velit non aute nisi labore ipsum occaecat
                    deserunt cupidatat aute. Enim cillum dolor et nulla sunt exercitation
                    non voluptate qui aliquip esse tempor. Ullamco ut sunt consectetur
                    
                </p>
                <p>
                    In dolore veniam excepteur eu est et sunt velit. Ipsum sint esse
                    veniam fugiat esse qui sint ad sunt reprehenderit do qui proident
                    
                </p>
            </>
        ),
        badge: "Changelog",
        image:
            "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Lorem Ipsum Dolor Sit Amet",
        description: (
            <>
                <p>
                    Ex irure dolore veniam ex velit non aute nisi labore ipsum occaecat
                    deserunt cupidatat aute. Enim cillum dolor et nulla sunt exercitation
                    non voluptate qui aliquip esse tempor. Ullamco ut sunt consectetur
                    
                </p>
            </>
        ),
        badge: "Launch Week",
        image:
            "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=3506&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
];

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
        <div className='flex flex-col items-center bg-black scroller'>
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
            <div className='mt-[80px] flex flex-col gap-y-[80px] text-white mb-[30px]'>
               
                <TracingBeamDemo />
                <div className='mt-[0px] bg-black h-[50px]'>
                </div>
            </div>
        </div>
    )
}

export default Home



// <div className='flex flex-col md:flex-row justify-between mx-auto md:gap-x-12 gap-y-12'>
// <div>
//     <motion.h1 className='text-center font-medium text-3xl text-purple-500'
//         initial={{ y: 100, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 2 }}>
//         Earn from Viewer Engagement
//     </motion.h1>
//     <motion.p className='mt-[20px] text-lg'
//         initial={{ x: -100, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 4 }}>
//         Generate revenue when viewers interact with your ads. Our system rewards you
//         <br /> for each visit and click, turning viewer engagement into tangible
//         <br /> earnings for your campaigns.
//     </motion.p>
// </div>
// <motion.div className='h-[400px]'
//     initial={{ x: 100, opacity: 0 }}
//     animate={{ x: 0, opacity: 1 }}
//     transition={{ duration: 3 }}>
//     <img className='h-[400px] w-[400px]' src='https://i.pinimg.com/originals/12/66/07/126607145b0a3adf66144b7bd6b39635.jpg' alt='image' />
// </motion.div>
// </div>