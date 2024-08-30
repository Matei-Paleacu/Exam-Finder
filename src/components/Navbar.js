import React from 'react';


export default function Navbar(props){
    return (
      <nav >
        <img src="../images/CU-logo.png" className="nav--logo" alt='logo'/>
        <h1 className='nav--title' onClick={() => props.click("Home")}>Home</h1>
        <h1 className='nav--title'onClick={() => props.click("Exams")}>Find Exams</h1>
      </nav>
    )
  }