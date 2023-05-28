import React,{useEffect, useState} from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'

export default function Navbar() {

  useEffect(()=>{
    let navItems = document.querySelectorAll('.navItem');
    navItems.forEach((item)=>{
      item.addEventListener('click',()=>{
        navItems.forEach((item)=>{
          item.classList.remove('active');
        })
        item.classList.add('active');
      })
    }
    )
  },[])

  const [hamClick, setHamClick] = useState(false);

  const hamClickHandler = (e) => {
    setHamClick(!hamClick);

    let navItems = document.querySelector('.navItem.active');
    
    if(!e.target.classList.contains('hamburger') )
    navItems.classList.remove('active');
    
    e.target.classList.add('active');

  };
  
  return (
    <>
      <div className="navbar">
        <div className="navContainer">
          <div className="navLogo">
            <Link className='logo' to="/">Petify</Link>
            </div>
          <ul className={hamClick? 'navItems active': 'navItems'} >
            <li onClick={(e)=>hamClickHandler(e)}> <Link className='navItem active' to="/">Home</Link> </li>
            <li onClick={(e)=>hamClickHandler(e)}> <Link className='navItem' to="/adopt">Adopt Pets</Link> </li>
            <li onClick={(e)=>hamClickHandler(e)}> <Link className='navItem' to="/rescue">Rescue Pets</Link> </li>
            <li onClick={(e)=>hamClickHandler(e)}> <Link className='navItem' to="/shelters">Shelters</Link> </li>
            <div className='empty'></div>
            <li className="navButton" onClick={(e)=>hamClickHandler(e)}>
              <Link className='navBtn navItem' to="/postAd" >Post an Ad</Link>         
            </li>

          </ul>
          <div className={hamClick? 'hamburger active' : 'hamburger'} onClick = {hamClickHandler}>
            <div className='bar'></div>
          </div>

        </div>

      </div>

    </>
  )
}
