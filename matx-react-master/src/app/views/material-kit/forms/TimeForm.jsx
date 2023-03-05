import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  styled,
  Box,
  Stack
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const TimeForm= () => {
    const [state, setState] = useState({ date: new Date() });

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== state.password) return false;

      return true;
    });
    return () => ValidatorForm.removeValidationRule("isPasswordMatch");
  }, [state.password]);

  const handleSubmit = (event) => {
    console.log(event);
    console.log("submitted");
  };

  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleDateChange = (date) => setState({ ...state, date });

  const {
    date,
    amount,
    accountid,
    ifscode,
  } = state;

  return(
    <div>
        This asks you to specify your target amount, along with the timestamps required so that the money raised is in stages and so that your project is funded throughout.
        <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="amount"
              id="standard-basic"
              value={amount || ""}
              onChange={handleChange}
              errorMessages={["this field is required"]}
              label="Amount"
              validators={["required", "minStringLength: 4", "maxStringLength: 9"]}
            />

            <TextField
              type="text"
              name="accountid"
              label="Account Number"
              onChange={handleChange}
              value={accountid || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />

            <TextField
              type="text"
              name="accountid"
              label="Wallet ID"
              value={accountid || ""}
              onChange={handleChange}
              validators={["required", "isEmail"]}
              errorMessages={["this field is required", "email is not valid"]}
            />

            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDateRangePicker
                displayStaticWrapperAs="desktop"
                value={date}
                onChange={handleDateChange}
                renderInput={(startProps, endProps) => (
                <React.Fragment>
                    <TextField {...startProps} />
                    <Box sx={{ mx: 2 }}> to </Box>
                    <TextField {...endProps} />
                </React.Fragment>
                )}
            />
            </LocalizationProvider> */}

            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                label="Date&Time picker"
                value={state}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider> */}
          </Grid>

          
        </Grid>

        <Button color="primary" variant="contained" type="submit">
          {/* <Icon>send</Icon> */}
          {/* <Span sx={{ pl: 1, textTransform: "capitalize" }}>Save</Span> */}
          Save
        </Button>
      </ValidatorForm>
    </div>


  );


};

export default TimeForm;