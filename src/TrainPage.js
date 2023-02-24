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
import lang_id from "./lang_id";

const steps = ['Required Information', 'Semi Supervised Data', 'Parallel Data',];


const theme = createTheme();

export default function Train(props) {
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
  const [experimetnName, setExperimetnName] = React.useState('');
  const [needMono, setMono] = React.useState(false)
  const [accept, setAccept] = React.useState(false)
  const [citation, setCitation] = React.useState('');

  const  getStepContent = (step) => {
    switch (step) {
      case 0:
        return <RequiredInfo 
          setEmail={setEmail} email={email}
          setLeftLangID={setLeftLangID} leftLangID={leftLangID}
          setRightLangID={setRightLangID} rightLangID={rightLangID}
          setTestSet={setTestSet} testSet={testSet}
          setValSet={setValSet} valSet={valSet}
          setMono={setMono}
        />;
      case 1:
        return <DictionartyData 
          setDictionary={setDictionary} dictionary={dictionary}
          need_mono={needMono}
          setLeftMonolingual={setLeftMonolingual} leftMonolingual={leftMonolingual}
          setRightMonolingual={setRightMonolingual} rightMonolingual={rightMonolingual}
        />;
      case 2:
        return <ParallelData 
          setParallelLeft={setLeftParallel} parallelLeft={leftParallel}
          setParallelRight={setRightParallel} parallelRight={rightParallel}
          setCitation={setCitation} citation={citation}
          setAccept={setAccept} 
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
        if (needMono) {
          if (anyNull([
            dictionary,
            leftMonolingual,
            rightMonolingual
          ])) {
            return
          }
        }
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
    if (!accept) {
      return
    }
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email,
          left_language_id: leftLangID,
          right_language_id: rightLangID,
          monolingual_left_uploadpath: leftMonolingual,
          monolingual_right_uploadpath: rightMonolingual,
          parallel_uploadpath: leftParallel,
          word_dictionary_uploadpath: dictionary,
          validation_uploadpath: valSet,
          test_uploadpath: testSet,
          citation: citation,
        })
    };
    
    fetch('https://able-groove-373701.ue.r.appspot.com/jobs/', requestOptions)
      .then(async response => {
        if (response.status == 200) {
          return response.json()
        } else {
          console.log(response)
          throw await response.status
        }
      })
      .then(data => {
        if (data) {
          setExperimetnName(data.experiment_name)
          setActiveStep(activeStep + 1);
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
                Your train id is {`${experimetnName}`}. We have emailed your setup
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
