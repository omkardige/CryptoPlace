import React, { useContext, useEffect, useState } from 'react'
import './Home.css';
import { CoinContext } from '../../Context/CoinContext';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
const Home = () => {
    const { allCoins, Currency } = useContext(CoinContext);
    const [showCoin, setshowCoin] = useState([]);
    const [Input, setInput] = useState("")
    const [page, setpage] = useState(1)
    useEffect(() => {
        setshowCoin(allCoins)
    }, [allCoins])
    const inputHandler = (e) => {
        setInput(e.target.value);
        if (e.target.value === '') {
            setshowCoin(allCoins)
        }

    }
    const searchHandler = async (e) => {
        e.preventDefault();
        const filteredCoins = await allCoins.filter((item) => {
            return item.name.toLowerCase().includes(Input.toLowerCase()) || item.symbol.toLowerCase().includes(Input.toLowerCase())
        })
        setshowCoin(filteredCoins);

    }
    return (

        <div className='home'>
            <div className="hero">
                <h1>Larget <br />Crypto Marketplace</h1>
                <p>Welcome to largest cryptocurrency marketplace.Sign up to explore more about cryptos.</p>
                <form onSubmit={searchHandler}>
                    <input onChange={inputHandler} value={Input} type="text" placeholder='Search crypto..' required />
                    <button type='submit'>Search</button>
                </form>
            </div>
            <div className="crypto-table">
                <div className="table-layout">
                    <p>#</p>
                    <p>Coins</p>
                    <p>Price</p>
                    <p style={{ textAlign: "center" }}>24H Change</p>
                    <p style={{ textAlign: 'right' }}>Market Cap</p>
                </div>

                {
                    
                        showCoin.slice((page - 1) * 10, (page - 1) * 10 + 10).map((item, index) => {
                            return <div >
                                <Link to={`/coin/${item.id}`} className='table-layout' key={index}>
                                    <p>{item.market_cap_rank}</p>
                                    <div>
                                        <img src={item.image} alt='cryptoImage'></img>
                                        <p>{item.name + '-' + item.symbol}</p>
                                    </div>
                                    <p >{Currency.symbol} {item.current_price.toLocaleString()}</p>
                                    <p className={item.price_change_percentage_24h > 0 ? 'Green' : 'Red'} style={{ textAlign: "center" }}>{Math.floor(item.price_change_percentage_24h * 100) / 100}%</p>
                                    <p style={{ textAlign: 'right' }}>{Currency.symbol + item.market_cap.toLocaleString()}</p>
                                </Link>
                                </div>
                                

                        })
              
                }

            </div>

            <div className="parent-container-pagination">
                <Stack spacing={10}>
                    <Pagination className="Pagination" count={showCoin.length / 10} size="large" sx={{ button: { color: 'gold' } }} variant="outlined" color="primary"
                        onChange={(_, value) => {
                            setpage(value);
                            window.scroll(0, 300)
                        }}>

                    </Pagination>
                </Stack>
            </div>



        </div>
    )
}

export default Home