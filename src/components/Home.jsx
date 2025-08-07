import React from 'react';
import { Outlet } from 'react-router-dom';
import {Header} from './index.js';


function Home() {
  return (
    <>
       <div 
          id='outcome_screen'
          className='h-screen overflow-y-auto dark:bg-[#121212] bg-white dark:text-white text-black' 
       >
           <Header />
           <Outlet />
       </div>
    </>
  )
}

export default Home ;