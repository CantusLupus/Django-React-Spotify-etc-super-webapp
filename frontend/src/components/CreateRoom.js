import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Link } from "react-router-dom"

export default class CreateRoomPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guestCanPause: true,
      guestCanSkip: true,
    }

    this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
    this.handleGuestCanPause = this.handleGuestCanPause.bind(this);
    this.handleGuestCanSkip = this.handleGuestCanSkip.bind(this);

  }

  handleGuestCanPause(e) {
    this.setState({
      guestCanPause : e.target.value === "true" ? true : false,
    })
  }

  handleGuestCanSkip(e) {
    this.setState({
      guestCanSkip : e.target.value === "true" ? true : false,
    })
  }

  handleRoomButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
        guest_can_skip: this.state.guestCanSkip,
        guest_can_pause: this.state.guestCanPause,
      }),
    };
    fetch("/api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => this.props.history.push('/room/' + data.code));
  }

  render() {
    return (<Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          Create a room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText>
            <div align="center">Guest control of playback state</div>
          </FormHelperText>

          <RadioGroup row defaultValue="true" onChange={this.handleGuestCanPause}>
            <FormControlLabel value="true" control={<Radio color="primary"/>}
                                        label="Play/Pause"
                                        labelPlacement="bottom" />
            <FormControlLabel value="false" control={<Radio color="secondary"/>}
                                        label="No control"
                                        labelPlacement="bottom" />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText>
            <div align="center">Guest can skip</div>
          </FormHelperText>
          <RadioGroup row defaultValue="true" onChange={this.handleGuestCanSkip}>
            <FormControlLabel value="true" control={<Radio color="primary"/>}
                                        label="Can Skip"
                                        labelPlacement="bottom" />
            <FormControlLabel value="false" control={<Radio color="secondary"/>}
                                        label="No control"
                                        labelPlacement="bottom" />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" onClick={this.handleRoomButtonPressed}>Create a room</Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="primary" variant="contained" to="/" component={Link}>Back</Button>
      </Grid>
    </Grid>
    );
  }
}