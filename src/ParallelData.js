import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Checkbox } from '@mui/material';

export default function ParallelData(props) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Parallel Data
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            id="parallel_left"
            name="parallel_left"
            label="Link to parallel data (optional)"
            fullWidth
            variant="standard"
            value={props.parallelLeft}
            onChange={state=>props.setParallelLeft(state.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Checkbox onChange={state=>props.setAccept(state.target.checked)}/> Agree with the terms? <br/>
          By checking this box, you agree that the data is legally acquired or that you have legal permission to use and distribute the data and you consent that the data would be made publicly available for the purpose of academic research.
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="citation"
            name="citation"
            label="Citations Data (optional)"
            fullWidth
            variant="standard"
            value={props.citation}
            onChange={state=>props.setCitation(state.target.value)}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
