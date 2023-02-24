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
            required={props.need_mono}
            id="monolingual_left"
            name="monolingual_left"
            label={!props.need_mono ? "Link to monolingual data of right language ( optional )": "Link to monolingual data of right language"}
            fullWidth
            variant="standard"
            value={props.leftMonolingual}
            onChange={state=>props.setLeftMonolingual(state.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required={props.need_mono}
            id="monolingual_right"
            name="monolingual_right"
            label={!props.need_mono ? "Link to monolingual data of right language ( optional )": "Link to monolingual data of right language"}
            fullWidth
            variant="standard"
            value={props.rightMonolingual}
            onChange={state=>props.setRightMonolingual(state.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use the monolingual data to generate more dictionary entries"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
