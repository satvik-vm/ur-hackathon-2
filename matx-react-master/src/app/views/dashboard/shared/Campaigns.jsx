import { Box } from '@mui/material';
import { MatxProgressBar, SimpleCard } from 'app/components';
import { Small } from 'app/components/Typography';
import ReactDOM from "react-dom";
import SimpleTable  from './CoinTracker/SimpleTable';


import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Routes, Route } from 'react-router-dom'

const Campaigns = () => {

  const [coins, setCoins] = useState([])

    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'

    useEffect(() => {
        axios.get(url).then((response) => {
        setCoins(response.data)
        // console.log(response.data[0])
        }).catch((error) => {
        console.log(error)
        })
    }, [])

  return (
    <Box>
      <SimpleTable coins = {coins}/>
    </Box>
  );
};

export default Campaigns;
