import React from 'react';
import { connect } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

import { settingsUpdate } from '../redux/actions';

const styles = {
  formControl: {
    width: `100%`,
    marginTop: 10,
  },
  select: {
    width: `100%`,
  },
};

function Settings({ classes, settings, handleChecked, handleNumber, handleValue }) {
  return (
    <>
      <Card raised>
        <CardHeader title="General" />
        <CardContent>
          <FormControlLabel
            control={<Checkbox checked={settings.dark} onChange={handleChecked(`dark`)} />}
            label="Dark Mode"
          />
        </CardContent>
      </Card>

      <br />

      <Card raised>
        <CardHeader title="Notifications" />
        <CardContent>
          <TextField
            fullWidth
            inputProps={{ max: '100', min: '0', step: '10' }}
            label="New HIT Volume"
            onChange={handleNumber(`hitVolume`)}
            type="number"
            value={settings.hitVolume}
          />

          <FormControl className={classes.formControl}>
            <InputLabel>New HIT Audio</InputLabel>
            <Select
              className={classes.select}
              MenuProps={{
                getContentAnchorEl: null,
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'left',
                },
              }}
              onChange={handleValue(`hitAudio`)}
              value={settings.hitAudio}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="sweetAlert1">Sweet Alert 1</MenuItem>
              <MenuItem value="sweetAlert2">Sweet Alert 2</MenuItem>
              <MenuItem value="sweetAlert3">Sweet Alert 3</MenuItem>
              <MenuItem value="sweetAlert4">Sweet Alert 4</MenuItem>
              <MenuItem value="sweetAlert5">Sweet Alert 5</MenuItem>
            </Select>
          </FormControl>

          <FormControlLabel
            control={
              <Checkbox checked={settings.hitNotification} onChange={handleChecked(`hitNotification`)} />
            }
            label="Desktop Notification"
          />
        </CardContent>
      </Card>

      <br />

      <Card raised>
        <CardHeader title="Filters" />
        <CardContent>
          <FormControlLabel
            control={<Checkbox checked={settings.filterMasters} onChange={handleChecked(`filterMasters`)} />}
            label="Hide Masters"
          />
          <FormControlLabel
            control={<Checkbox checked={settings.filterUsOnly} onChange={handleChecked(`filterUsOnly`)} />}
            label="Hide US Only"
          />
        </CardContent>
      </Card>

      <br />

      <Card raised>
        <CardHeader title="Panda Buttons" />
        <CardContent>
          <FormControlLabel
            control={<Checkbox checked={settings.hitCatcher} onChange={handleChecked(`hitCatcher`)} />}
            label="HIT Catcher"
          />
          <FormControlLabel
            control={<Checkbox checked={settings.pandaCrazy} onChange={handleChecked(`pandaCrazy`)} />}
            label="Panda Crazy"
          />
        </CardContent>
      </Card>
    </>
  );
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleChecked: (key) => (event) => {
      dispatch(settingsUpdate({ [key]: event.target.checked }));
    },
    handleNumber: (key) => (event) => {
      dispatch(settingsUpdate({ [key]: Number(event.target.value) }));
    },
    handleValue: (key) => (event) => {
      dispatch(settingsUpdate({ [key]: event.target.value }));
    },
  };
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Settings),
);
