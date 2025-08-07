import React from 'react';
import { Link } from 'react-router-dom';
import  you_tube  from "../../assets/you_tube.jpeg"

function Logo({ width = "w-12 sm:w-16 ", className = ""}) {
  return (
    <Link to={"/"}>
        <div className= {`mr-4 ${width} shrink-0 ${className}`}>
          <img src={you_tube} className=' w-15 rounded h-10 ' alt="" />
        </div>
    </Link>
  )
}

export default Logo