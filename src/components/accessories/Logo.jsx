import React from 'react';
import { Link } from 'react-router-dom';
import  YouTube_logo  from "../../assets/YouTube_logo.png"

function Logo({ width = "w-12 sm:w-16 ", className = ""}) {
  return (
    <Link to={"/"}>
        <div className= {`mr-4 ${width} shrink-0 ${className}`}>
          <img src={YouTube_logo} className='w-12 rounded h-18' alt="" />
        </div>
    </Link>
  )
}

export default Logo