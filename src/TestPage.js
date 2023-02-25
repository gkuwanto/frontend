import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RequiredInfo from './RequiredInfoPredict';

const steps = ['Required Information'];


const theme = createTheme();

export default function Test(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [email, setEmail] = React.useState('');
  const [experimentName, setExperimentName] = React.useState('');
  const [direction, setDirection] = React.useState('');
  const [testSet, setTestSet] = React.useState('');

  const  getStepContent = (step) => {
    switch (step) {
      case 0:
        return <RequiredInfo 
          setEmail={setEmail} email={email}
          setExperimentName={setExperimentName} ExperimentName={experimentName}
          setDirection={setDirection} direction={direction}
          setTestSet={setTestSet} testSet={testSet}
        />;
      default:
        throw new Error('Unknown step');
    }
  }
  const anyNull = (array) => {
    return array.some(element => element === '')
  }
  const handleNext = () => {
    switch (activeStep) {
      case 0:
        if (anyNull([
          email,
          experimentName,
          testSet,
          direction
        ])) {
          return
        } else {
          setActiveStep(activeStep + 1);
        }
      default:
        setActiveStep(activeStep + 1);
    }
  };
  const submitResult = ()=> {
    if (anyNull([
      email,
      experimentName,
      testSet
    ])) {
      return
    } else {
      setActiveStep(activeStep + 1);
    }
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email,
          experiment_name: experimentName,
          test_set: testSet,
          direction: direction
        })
    };

    fetch('https://able-groove-373701.ue.r.appspot.com/predict/', requestOptions)
    .then(async response => {
      if (response.status == 200) {
        return response.json()
      } else {
        console.log(response)
        throw await response.status
      }
    })
    .catch(err => {
      if (err == 400) {
        alert("Some Fields are invalid, please recheck over all submitted link given.")
      }
      else {
        alert("Unexpected Error, please try again in a few moment")
      }
    });
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const models = fetch("https://")

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Low Resource Machine Translation -
          </Typography>
          <Typography variant="h6" color="inherit" noWrap>
            -------
          </Typography>
          <Button onClick={props.setTrain}>
            Train
          </Button>
          <Button onClick={props.setTest}>
            Predict
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Use a model to translate a file
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for using our demo.
              </Typography>
              <Typography variant="subtitle1">
                Your prediction id is {`${experimentName}-${direction}-${email}`}. We have emailed your setup
                confirmation, and will send you an update when your model has finished predicting.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={activeStep === steps.length -1 ? submitResult : handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Submit Predict Setup' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
