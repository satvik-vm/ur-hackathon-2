import React from 'react'

import {
    Box,
    Icon,
    IconButton,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
  } from "@mui/material";


const CoinItem = (props) => {
    return (
        <TableRow key={props.coins.id}>
        <TableCell align="center" width = "10%">{props.coins.market_cap_rank}</TableCell>
        <TableCell align="center" ><img src = {props.coins.image} width = '20' alt="" ></img> {props.coins.symbol.toUpperCase()}</TableCell>
        <TableCell align="center">{props.coins.current_price.toLocaleString()}</TableCell>
        <TableCell align="center">{props.coins.price_change_percentage_24h.toFixed(2)}%</TableCell>
        <TableCell align="center">${props.coins.total_volume.toLocaleString()}</TableCell>
        <TableCell align="center">${props.coins.market_cap.toLocaleString()}</TableCell>
      </TableRow>
    )
}

export default CoinItem
