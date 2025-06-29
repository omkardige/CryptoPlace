import { CoinContext } from '../../Context/CoinContext';
import { useParams } from 'react-router-dom';
import { options } from '../../Constants/Constants';
import { Line } from 'react-chartjs-2';
import React, { useContext, useEffect, useState } from 'react'
import './LineChart.css';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { ChartDays } from '../../Constants/Chart';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);



const LineChart = ({Currency,Id}) => {
  const [days, setdays] = useState(30)
  // console.log(Props)
  const [chartdata, setchartdata] = useState();
  const fetchChartData = async () => {
    const data = await fetch(`https://api.coingecko.com/api/v3/coins/${Id}/market_chart?vs_currency=${Currency.name}&days=${days}&precision=2&interval=daily`, options);
    const json = await data.json();
    setchartdata(json.prices);
  }
  useEffect(() => {
    fetchChartData();
  }, [Currency,days]);

  if(!chartdata){
    return(
    <div className='spinner'>
      <div className='spin'>

      </div>
    </div>
    )
  }
  else{
    return (
      
  <div className="line-chart-container">
    {window.innerWidth < 768 && window.innerHeight > window.innerWidth && (
  <div className="rotate-prompt">
    <p>Please rotate your device for the best graph experience 📱↪️</p>
  </div>
)}
    <Line
      data={{
        labels: chartdata.map((coin) => {
          let date = new Date(coin[0]);
          let time =
            date.getHours() > 12
              ? `${date.getHours() - 12}:${date.getMinutes()} PM`
              : `${date.getHours()}:${date.getMinutes()} AM`;
          return days === 1 ? time : date.toLocaleDateString();
        }),
        datasets: [
          {
            data: chartdata.map((coin) => coin[1]),
            label: `Price (Past ${days} Days) in ${Currency.name}`,
            fill: false,
            borderColor: '#EEBC1D',
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: true,
        elements: {
          point: {
            radius: 1,
          },
        },
        plugins: {
          legend: {
            labels: {
              color: 'white',
              font: {
                size: 14,
              },
            },
            position: 'top',
          },
        },
        scales: {
          x: {
            ticks: {
              color: 'white',
            },
            grid: {
              color: 'rgba(255,255,255,0.1)',
            },
          },
          y: {
            ticks: {
              color: 'white',
            },
            grid: {
              color: 'rgba(255,255,255,0.1)',
            },
          },
        },
      }}
    />
  </div>
);


     

}}

export default LineChart;