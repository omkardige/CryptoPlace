import React, { useContext } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import arrow_icon from '../../assets/arrow_icon.png'
import { Link } from 'react-router-dom'
import { CoinContext } from '../../Context/CoinContext'

const Navbar = () => {
  const {setCurrency} = useContext(CoinContext)
  const selectCurrency = (e) =>{
     if(e.target.value==='usd'){
      setCurrency({
        name:"usd",
        symbol:"$"
      })
     }
     else if(e.target.value==='inr'){
        setCurrency({
          name:"inr",
          symbol:"₹"
        })
     }
  }
  return (
    <div className='navbar'>
      <img src={logo} alt='logo' className='navbar-logo'></img>
      <ul>
        <li>
          <Link to={"/"}> Home</Link>
        </li>
        <li>
          <Link to={"/Coin:coinid"}>features</Link>
        </li>
        <li>
          <Link to={"/pricing"}>Pricing</Link>
        </li>
        <li>
          <Link to={'/blog'}>Blog</Link>
        </li>
      </ul>
      <div className="nav-right">
        <select onChange={selectCurrency}> 
          <option value="usd" >USD</option>
          <option value="inr" selected>INR</option>
        </select>
        <button>Sign up <img src={arrow_icon} alt='arrow_icon'></img></button>
      </div>
    </div>
  )
}

export default Navbar;