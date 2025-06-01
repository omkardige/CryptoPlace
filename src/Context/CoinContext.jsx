import { createContext, useState,useEffect } from "react";
import {URL,options} from '../Constants/Constants';

export const CoinContext = createContext();
const CoinContextProvider = (props) =>{
    const[allCoins,setallCoins]=useState([])
    const[Currency,setCurrency]=useState({name:"inr",symbol:"₹"})
    
const fetchData = async() =>{
    const data = await fetch(URL+Currency.name,options);
    const json = await data.json();
    setallCoins(json)
}

useEffect(()=>{
  fetchData();
},[Currency])
    const ContextValue={
          allCoins,Currency,setCurrency
    }
   return (
    <CoinContext.Provider value={ContextValue}>
        {props.children}
    </CoinContext.Provider>
   )
}
export default CoinContextProvider;