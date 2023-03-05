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

  import CoinItem from "./CoinItem";
  
  const StyledTable = styled(Table)(({ theme }) => ({
    whiteSpace: "pre",
    "& thead": {
      "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
    },
    "& tbody": {
      "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
    },
  }));


  
//   const subscribarList = [
//     {
//       name: "john doe",
//       date: "18 january, 2019",
//       amount: 1000,
//       status: "close",
//       company: "ABC Fintech LTD.",
//     },
//     {
//       name: "kessy bryan",
//       date: "10 january, 2019",
//       amount: 9000,
//       status: "open",
//       company: "My Fintech LTD.",
//     },
//     {
//       name: "james cassegne",
//       date: "8 january, 2019",
//       amount: 5000,
//       status: "close",
//       company: "Collboy Tech LTD.",
//     },
//     {
//       name: "lucy brown",
//       date: "1 january, 2019",
//       amount: 89000,
//       status: "open",
//       company: "ABC Fintech LTD.",
//     },
//     {
//       name: "lucy brown",
//       date: "1 january, 2019",
//       amount: 89000,
//       status: "open",
//       company: "ABC Fintech LTD.",
//     },
//     {
//       name: "lucy brown",
//       date: "1 january, 2019",
//       amount: 89000,
//       status: "open",
//       company: "ABC Fintech LTD.",
//     },
//   ];
  
const SimpleTable = (props) => {

    

    return (

      <Box width="100%" overflow="auto">
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell align="center" width = "10%">#</TableCell>
              <TableCell align="center">Coin</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">24h</TableCell>
              <TableCell align="center">Volume</TableCell>
              <TableCell align="center">Mkt Cap</TableCell>
            </TableRow>
          </TableHead>
  
          <TableBody>
            {props.coins.map(coins => { 
                return(
                    <CoinItem coins={coins} key ={coins.id}></CoinItem>
                )
            })} 
          </TableBody>
        </StyledTable>
      </Box>
    );
  };
  
  export default SimpleTable;