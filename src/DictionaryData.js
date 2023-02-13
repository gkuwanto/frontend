import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function DictionartyData(props) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Semi Supervised Data
      </Typography>
      <Typography>
        * is required
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="dictionary_data"
            name="dictionary_data"
            label="Link to dictionary data"
            fullWidth
            variant="standard"
            value={props.dictionary}
            onChange={state=>props.setDictionary(state.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="monolingual_left"
            name="monolingual_left"
            label="Link to monolingual data of left language (optional)"
            fullWidth
            variant="standard"
            value={props.leftMonolingual}
            onChange={state=>props.setLeftMonolingual(state.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="monolingual_right"
            name="monolingual_right"
            label="Link to monolingual data of right language (optional)"
            fullWidth
            variant="standard"
            value={props.rightMonolingual}
            onChange={state=>props.setRightMonolingual(state.target.value)}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
