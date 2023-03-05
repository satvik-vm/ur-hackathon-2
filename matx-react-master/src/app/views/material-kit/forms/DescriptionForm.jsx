import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Icon,
  Radio,
  RadioGroup,
  styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import UploadAndDisplayImage from "./UploadAndDisplayImage";


const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",
  }));


const DescriptionForm= () => {
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
    desc,
  } = state;

  return(
    
    <ValidatorForm onSubmit={handleSubmit} onError={()=> null}>
    This step invloves you with providing indepth details regarding your project. Supplement it with an attractive cover image which depicts your project. State your cause along with the benefits if any the contributors will receive. This ensures that your project pitch is successful and attracts more people. All these details will be visible to any customer viewing your page.
        <br></br>
        <UploadAndDisplayImage></UploadAndDisplayImage>
        <br></br>
        <br></br>
        
            <Editor></Editor>
            
            <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Button color="primary" variant="contained" type="submit">
          {/* <Icon>send</Icon> */}
          {/* <Span sx={{ pl: 1, textTransform: "capitalize" }}>Save</Span> */}
          Save
        </Button>
    </ValidatorForm>

  );

};

export default DescriptionForm;