import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

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
            label="Link to parallel data of left language (optional)"
            fullWidth
            variant="standard"
            value={props.parallelLeft}
            onChange={state=>props.setParallelLeft(state.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="parallel_right"
            name="parallel_right"
            label="Link to parallel data of right language (optional)"
            fullWidth
            variant="standard"
            value={props.parallelRight}
            onChange={state=>props.setParallelRight(state.target.value)}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
