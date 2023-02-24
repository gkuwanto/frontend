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
            label="Link to parallel data (optional)"
            fullWidth
            variant="standard"
            value={props.parallelLeft}
            onChange={state=>props.setParallelLeft(state.target.value)}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
