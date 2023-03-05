import { Box, Icon } from "@mui/material";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import React from "react";
import SimpleForm from "./SimpleForm";
import { Span } from "app/components/Typography";
import DescriptionForm from "./DescriptionForm";
import TimeForm from "./TimeForm";

function getSteps() {
  return ["Personal Details","Project Description", "Target and Timestamps"];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <SimpleForm></SimpleForm>;

    case 1:
      return <DescriptionForm></DescriptionForm>;

    case 2:
      return <TimeForm/>;

    default:
      return ``;
  }
}

export default function StepperForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);

  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleReset = () => setActiveStep(0);

  return (
    <Box>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box mt={4}>
        {activeStep === steps.length ? (
          <Box>
            <Typography>All steps completed</Typography>
            <br></br>
            <Button color="primary" variant="contained" type="submit">
              <Icon>send</Icon> 
              <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span> 
            </Button>
          </Box>
        ) : (
          <Box>
            <Typography>{getStepContent(activeStep)}</Typography>

            <Box pt={2}>
              <Button
                variant="contained"
                color="secondary"
                disabled={activeStep === 0}
                onClick={handleBack}
              >
              <Icon>keyboard_arrow_left</Icon>
                Back
              </Button>

              <Button sx={{ ml: 2 }} variant="contained" color="primary" onClick={handleNext}>
                
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
                <Icon>keyboard_arrow_right</Icon>
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};
