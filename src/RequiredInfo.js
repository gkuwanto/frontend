import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { InputLabel, MenuItem, Select } from '@mui/material';
import lang_id from "./lang_id"

import CreatableSelect from 'react-select/creatable'

export default function RequiredInfo(props) {
  let left="en";
  let right="en";
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
        <Grid item xs={12} sm={6}>
          <InputLabel id="left_lang_id_label">Left Language ID *</InputLabel>
          <CreatableSelect
          
            required
            id="left_lang_id"
            name="left_lang_id"
            label="Left Language ID"
            fullWidth
            variant="standard"
            onChange={state=>{props.setLeftLangID(state.value); if (!lang_id.includes(state.value)) {props.setMono(true)}}}
            options={lang_id.map(l_id=> {return {label: l_id, value: l_id}})}
          > 
          </CreatableSelect>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel id="right_lang_id_label">Right Language ID *</InputLabel>
          <CreatableSelect
            required
            id="right_lang_id"
            name="right_lang_id"
            label="Right Language ID"
            fullWidth
            variant="standard"
            onChange={state=>{props.setRightLangID(state.value); if (!lang_id.includes(state.value)) {props.setMono(true)}}}
            options={lang_id.map(l_id=> {return {label: l_id, value: l_id}})}
          > 
          </CreatableSelect>
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
        <Grid item xs={12}>
          <TextField
            required
            id="validation_set"
            name="validation_set"
            label="Link to validation set"
            fullWidth
            variant="standard"
            value={props.valSet}
            onChange={state=>props.setValSet(state.target.value)}
          />
        </Grid>
       
      </Grid>
    </React.Fragment>
  );
}
