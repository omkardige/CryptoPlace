import React, { useContext, useEffect, useState } from 'react'
import './Coin.css';
import { useParams } from 'react-router-dom';
import { options, URL_COINID ,URL_Charts} from '../../Constants/Constants';
import { CoinContext } from '../../Context/CoinContext';
const Coin = () => {
  const {Currency} = useContext(CoinContext)
  const [Chart,setChart]=useState([])
 const [result,setresult]=useState()
  const {Id} = useParams();
  console.log(Id);
  const fetchChartData= async () =>{
    const data = await fetch(`https://api.coingecko.com/api/v3/coins/${Id}/market_chart?vs_currency=inr&days=360&precision=2`,options);
    const json = await data.json();
    setChart(json);
  }
  const fetchData = async() =>{
    const data = await fetch(URL_COINID+Id,options);
    const json = await data.json();
    setresult(json)
    }
  
    useEffect(()=>{
      fetchData();
      fetchChartData();
    },[Currency]);
    console.log(Chart)
  if(result){
  return (
    <div className='coin'>
      <div className="coin-name">
        <img src={result.image.large} alt='coin image'/>
        <p><b>{result.name}({result.symbol.toUpperCase()})</b></p>
      </div>
     
    </div>
    )
  }
  else{
   return (
    <div className='progress-bar'>
      <p>Please wait...!</p>
      <progress value={null} />
    </div>
 
  );
  }
  
}

export default Coin