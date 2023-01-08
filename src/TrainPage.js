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
import RequiredInfo from './RequiredInfo';
import ParallelData from './ParallelData';
import DictionartyData from './DictionaryData';

const steps = ['Required Information', 'Semi Supervised Data', 'Parallel Data',];


const theme = createTheme();

export default function Train() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [email, setEmail] = React.useState('');
  const [leftLangID, setLeftLangID] = React.useState('');
  const [rightLangID, setRightLangID] = React.useState('');
  const [testSet, setTestSet] = React.useState('');
  const [valSet, setValSet] = React.useState('');
  const [dictionary, setDictionary] = React.useState('');
  const [leftMonolingual, setLeftMonolingual] = React.useState('');
  const [rightMonolingual, setRightMonolingual] = React.useState('');
  const [leftParallel, setLeftParallel] = React.useState('');
  const [rightParallel, setRightParallel] = React.useState('');

  const  getStepContent = (step) => {
    switch (step) {
      case 0:
        return <RequiredInfo 
          setEmail={setEmail} email={email}
          setLeftLangID={setLeftLangID} leftLangID={leftLangID}
          setRightLangID={setRightLangID} rightLangID={rightLangID}
          setTestSet={setTestSet} testSet={testSet}
          setValSet={setValSet} valSet={valSet}
        />;
      case 1:
        return <DictionartyData 
          setDictionary={setDictionary} dictionary={dictionary}
          setLeftMonolingual={setLeftMonolingual} leftMonolingual={leftMonolingual}
          setRightMonolingual={setRightMonolingual} rightMonolingual={rightMonolingual}
        />;
      case 2:
        return <ParallelData 
          setParallelLeft={setLeftParallel} parallelLeft={leftParallel}
          setParallelRight={setRightParallel} parallelRight={rightParallel}
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
          leftLangID,
          rightLangID,
          testSet,
          valSet,
        ])) {
          return
        } else {
          setActiveStep(activeStep + 1);
        }
      case 1:
        if (anyNull([
          dictionary,
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
    setActiveStep(activeStep + 1);
    console.log({
      email,
      leftLangID,
      rightLangID,
      testSet,
      valSet,
      dictionary,
      leftMonolingual,
      rightMonolingual,
      leftParallel,
      rightParallel
    })
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

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
            Low Resource Machine Translation 
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Train a Model
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
                Your train id is {`${leftLangID}-${rightLangID}`}. We have emailed your setup
                confirmation, and will send you an update when your training has finished.
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
                  {activeStep === steps.length - 1 ? 'Submit Train Setup' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
