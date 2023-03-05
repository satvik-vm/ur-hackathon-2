import {
  Box,
  Button,
  Card,
  Icon,
  IconButton,
  MenuItem,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import { Paragraph } from 'app/components/Typography';
import useAuth from 'app/hooks/useAuth';
import { findIndex } from 'lodash';
import React, { useState, useEffect } from 'react';


const CardHeader = styled(Box)(() => ({
  display: 'flex',
  paddingLeft: '24px',
  paddingRight: '24px',
  marginBottom: '12px',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  textTransform: 'capitalize',
}));

const ProductTable = styled(Table)(() => ({
  minWidth: 400,
  whiteSpace: 'pre',
  '& small': {
    width: 50,
    height: 15,
    borderRadius: 500,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
  },
  '& td': { borderBottom: 'none' },
  '& td:first-of-type': { paddingLeft: '16px !important' },
}));

const Small = styled('small')(({ bgcolor }) => ({
  width: 50,
  height: 15,
  color: '#fff',
  padding: '2px 8px',
  borderRadius: '4px',
  overflow: 'hidden',
  background: bgcolor,
  boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
}));

const TopSellingTable = () => {
  const { palette } = useTheme();
  const bgError = palette.error.main;
  const bgPrimary = palette.primary.main;
  const bgSecondary = palette.secondary.main;

  const productList = [
    {
      imgUrl: '/assets/images/products/headphone-2.jpg',
      name: 'earphone',
      price: 100,
      available: 15,
    },
    {
      imgUrl: '/assets/images/products/headphone-3.jpg',
      name: 'earphone',
      price: 1500,
      available: 30,
    },
    {
      imgUrl: '/assets/images/products/iphone-2.jpg',
      name: 'iPhone x',
      price: 1900,
      available: 35,
    },
    {
      imgUrl: '/assets/images/products/iphone-1.jpg',
      name: 'iPhone x',
      price: 100,
      available: 0,
    },
    {
      imgUrl: '/assets/images/products/headphone-3.jpg',
      name: 'Head phone',
      price: 1190,
      available: 5,
    },
  ];
  

  // const [transaction_arr, setTransactions] = useState([user.transactions])
  
  // useEffect(() => {
	  //   setTransactions(user)
	  // }, [user]);
	  
	  
	  // console.log("Button Clicked")
const {user, transactions} = useAuth(); 
const handleClick = (event) => {
		  
  try{
    // call_trans();
	transactions();
  }catch (e) {
    console.log(e);
  }

  console.log("User called from TopSellingTable ")
  console.log(user.transac)
  console.log(productList)
  // console.log(transaction_arr);
  // setTransactions(transaction_arr) ;
};


// const transaction_arr = Object.values(user.transactions)
// const [tran, setTransactions] = useState([transactions, ]);



// const productList = transactions;
  return (
    <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
      <CardHeader>
        <Title>Transaction History</Title>

        <Button
          size="small"
          color="primary"
          variant="contained"
          sx={{ textTransform: 'uppercase' }}
          onClick = {(event) => {handleClick(event);}}
          id="deposit_btn"
        >
          Update <Icon>forward</Icon>
        </Button>
        
        <Select size="small" defaultValue="this_month">
          <MenuItem value="this_month">This Month</MenuItem>
          <MenuItem value="last_month">Last Month</MenuItem>
        </Select>
      </CardHeader>

      <Box overflow="auto">
        <ProductTable>
          <TableHead>
            <TableRow>
              <TableCell sx={{ px: 17 }} colSpan={4}>
                Trnx Hash
              </TableCell>
              <TableCell sx={{ px: 3 }} colSpan={1}>
                Amount
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={1}>
                Action Type
              </TableCell>
              <TableCell sx={{ px: 17 }} colSpan={4}>
                TimeStamp
              </TableCell>
            </TableRow> 
          </TableHead>

          <TableBody>
            {user.transac?.reverse().slice(0, 5).map(transac => (
              <TableRow key={transac.id} hover>
                <TableCell colSpan={4} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                  <Box display="flex" alignItems="center">
                    <Paragraph sx={{ m: 0, ml: 4 }}>{transac.hash_id}</Paragraph>
                  </Box>
                </TableCell>

                <TableCell align="left" colSpan={1} sx={{ px: 4, textTransform: 'capitalize' }}>
                  ${transac.amount > 999 ? (transac.amount / 1000).toFixed(1) + 'k' : transac.amount}
                </TableCell>

                <TableCell sx={{ px: 0 }} align="left" colSpan={1}>
                  {
				  transac.type === 'Deposit' ? ( <Small bgcolor={bgSecondary}>Deposit</Small>) : 
				  ( <Small bgcolor={bgError}>Withdrawal</Small> )
				          }
                </TableCell>
                <TableCell colSpan={4} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                  <Box display="flex" alignItems="center">
                    <Paragraph sx={{ m: 0, ml: 4 }}>{transac.timestamp}</Paragraph>
                  </Box>
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </ProductTable>
      </Box>
    </Card>
  );
};




export default TopSellingTable;
