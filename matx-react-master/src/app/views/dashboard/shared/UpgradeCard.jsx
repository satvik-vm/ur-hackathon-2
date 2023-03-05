import { Button, Card, styled } from '@mui/material';
import { convertHexToRGB } from 'app/utils/utils';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { useEffect, useState, setState } from "react";
// import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useAuth from 'app/hooks/useAuth';
import {
  FormControlLabel,
  Grid,
  Icon,
} from "@mui/material";


const CardRoot = styled(Card)(({ theme }) => ({
  marginBottom: '24px',
  padding: '24px !important',
  [theme.breakpoints.down('sm')]: { paddingLeft: '16px !important' },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  position: 'relative',
  padding: '24px !important',
  background: `rgb(${convertHexToRGB(theme.palette.primary.main)}, 0.15) !important`,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));

const Paragraph = styled('p')(({ theme }) => ({
  margin: 0,
  paddingTop: '24px',
  paddingBottom: '24px',
  color: theme.palette.text.secondary,
}));

const UpgradeCard = () => {
  const [state, setState] = useState({amount});

  // useEffect(() => {
  //   ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
  //     if (value !== state.password) return false;

  //     return true;
  //   });
  //   return () => ValidatorForm.removeValidationRule("isPasswordMatch");
  // }, [state.password]);

  // const handleSubmit = (event) => {
  //   // console.log("submitted");
  //   // console.log(event);
  // };

  // const handleChange = (event) => {
  //   event.persist();
  //   setState({ ...state, [event.target.amount]: event.target.value });
  // };

  // // const handleDateChange = (date) => setState({ ...state, date });

  // const {
  //   amount,
  // } = state;
  // const [state, setState] = useState('');

  // const handleChange = (event) => {
  //   event.persist();
  //   setState({ ...state, [event.target.name]: event.target.value });
  // };
  const {amount,} = state;
  //var value;

  const {deposit, withdraw} = useAuth();

  
  // const handleFieldChange = (event) => {
  //   value = event.target.value;
  // }
  const handleChange = (e) => {
    setState({amount : e.target.value});
  }

  const handleClickdep = (event) => {
    try{
      const mss =  deposit(amount);
      // if(mss != null){
      //   alert("Trasanction completed");
      // }
    }catch (e) {
      console.log(e);
    }
  };

  const handleClickwit = (event) => {
    try{
      withdraw(amount);
    }catch (e) {
      console.log(e);
    }
 };

 const resetInputField = () => {
  setState("");
  };
  
  
  return (

    <CardRoot>
      <StyledCard elevation={0}>
        <Paragraph>
          What type of <b>Transaction</b>  <br /> would you like?  
        </Paragraph>
        
        {/* <ValidatorForm onSubmit = {handleSubmit} onError = {() => null}>

          
        </ValidatorForm> */}
        <Button
          size="large"
          color="primary"
          variant="contained"
          sx={{ textTransform: 'uppercase' }}
          onClick = {(event) => {handleClickdep(event); resetInputField();}}
          id="deposit_btn"
        >
          Deposit <Icon>keyboard_arrow_right</Icon>
        </Button>
        <br/>
        <br></br>

        <Button
          size="large"
          color="primary"
          variant="contained"
          sx={{ textTransform: 'uppercase' }}
          onClick = {(event) => {handleClickwit(event); resetInputField();}}
          id="withdrawl_btn"
        >
          
          Withdrawal<Icon>keyboard_arrow_left</Icon>
        </Button>
        <br></br>
        <br></br>


        {/* <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
          <Input
            name = "amount"
            id="standard-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            value = {amount || ""}
            size = "large"
          />
        </FormControl> */}

        {/* <FormControl fullWidth sx={{ m: 1 }} variant="filled">
          <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
          <FilledInput
            name = "amount"
            id="filled-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            value = {state.amount|| ""}
            onChange = {handleSubmit}
          />
        </FormControl> */}
        <TextField
        type = "text"
        name = "amount"
        label = "Amount"
        onChange = {handleChange}
        value = {amount || ""}
        fullWidth sx={{ m: 1 }} variant="filled"
        InputProps = {{
            startAdornment : <InputAdornment position="start">$</InputAdornment>
       
        }}

        />

      </StyledCard>
    </CardRoot>
  );
};

export default UpgradeCard;
