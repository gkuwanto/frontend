import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { InputLabel, MenuItem, Select } from '@mui/material';


export default function RequiredInfo(props) {
  const [experiments, setExperiments] = React.useState([])
  const fetchUser = async () => {
    try {
      let response = await fetch('https://able-groove-373701.ue.r.appspot.com/models/');
      let json = await response.json();
      return { success: true, data: json };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }
  React.useEffect(() => {
    (async () => {
      setExperiments([false]);
      let res = await fetchUser();
      if (res.success) {
        setExperiments(res.data.map(data=> data.experiment_name));
      }
    })();
  }, []);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Required Information
      </Typography>
      <Typography>
        * is required
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="email"
            variant="standard"
            value={props.email}
            onChange={state=>props.setEmail(state.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <InputLabel id="experiment_name_label">Model Name *</InputLabel>
          <Select
            required
            id="experiment_name"
            name="experiment_name"
            label="Left Language ID"
            fullWidth
            variant="standard"
            value={props.leftLangID}
            onChange={state=>props.setExperimentName(state.target.value)}
          > 
            {experiments.map(id => <MenuItem value={id} key={"left"+id}>{id}</MenuItem>)}
          </Select>
        </Grid><Grid item xs={12}>
          <InputLabel id="left_lang_id_label">Direction *</InputLabel>
          <Select
            required
            id="left_lang_id"
            name="left_lang_id"
            label="Left Language ID"
            fullWidth
            variant="standard"
            value={props.directions}
            onChange={state=>props.setDirection(state.target.value)}
          > 
            <MenuItem value={"left"} key={"left"}>Left to Right</MenuItem>
            <MenuItem value={"right"} key={"right"}>Right to Left</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="test_set"
            name="test_set"
            label="Link to test set"
            fullWidth
            variant="standard"
            value={props.testSet}
            onChange={state=>props.setTestSet(state.target.value)}
          />
        </Grid>
        
       
      </Grid>
    </React.Fragment>
  );
}
