import React, { Suspense, useContext, useEffect, useState } from 'react'
import '../../index.css';
import './Coin.css';
import { useParams } from 'react-router-dom';
import { options, URL_COINID, URL_Charts } from '../../Constants/Constants';
import { CoinContext } from '../../Context/CoinContext';
import LineChart from '../../Components/LineChart/LineChart';
import { ChartDays } from '../../Constants/Chart';
const Coin = () => {
  const { Currency } = useContext(CoinContext)
  const [result, setresult] = useState()
  const { Id } = useParams();
  console.log(Id);

  const fetchData = async () => {
    try{
       const data = await fetch(URL_COINID + Id, options);
    const json = await data.json();
    setresult(json)
    }
    catch(error){
      console.log(error)
    }
   
  }

  useEffect(() => {
    fetchData();
  }, [Currency]);

  // console.log(Chart)
  if (result) {
    return (
      <div className='coin'>
        <div className="coin-name">
          <img src={result.image.large} alt='coin image' />
          <p><b>{result.name}({result.symbol.toUpperCase()})</b></p>
        </div>
        <div className='coin-chart'>
          <LineChart Currency={Currency} Id={Id}/>
        </div>
        
        <div className="coin-info">
          <ul>
            <li>
              Crypto Market Rank
            </li>
            <li>
              {result.market_cap_rank}
            </li>
            <li>
              Current Price
            </li>
            <li>
              {Currency.symbol}{result.market_data.current_price[Currency.name].toLocaleString()}
            </li>
            <li>
              Market cap
            </li>
            <li>
              {Currency.symbol}{result.market_data.market_cap[Currency.name].toLocaleString()}
            </li>
            <li>
              24 Hour High
            </li>
            <li>
              {Currency.symbol}{result.market_data.high_24h[Currency.name].toLocaleString()}
            </li>
             <li>
              24 Hour Low
            </li>
            <li>
              {Currency.symbol}{result.market_data.low_24h[Currency.name].toLocaleString()}
            </li>
          </ul>
        </div>
      </div>
    )
  }
  else {
    return (
      <>
        <div className='spinner'>
          <div className='spin'>

          </div>
        </div>
      </>
      // <div className='progress-bar'>
      //   <p>Please wait...!</p>
      //   <progress value={null} />
      // </div>

    );
  }

}

export default Coin