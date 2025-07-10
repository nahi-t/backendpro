import React from 'react'
import {Link  } from "react-router-dom";


function Home() {
  

  return (
    <div>
         <Link to={"/qustion"}>ask qustion</Link>
         <br />
         <Link to={"/seeq"}>to ask qustion</Link>
    </div>
  )
}

export default Home
