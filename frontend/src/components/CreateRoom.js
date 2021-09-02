import React, { Component } from "react";
import {
  Button,
  Grid,
  Typography,
  FormControl,
  FormHelperText,
  Radio,
  RadioGroup,
  FormControlLabel,
  Collapse,
} from "@material-ui/core";
import { Link } from "react-router-dom";

export default class CreateRoomPage extends Component {
  static defaultProps = {
    guestCanPause: true,
    guestCanSkip: true,
    update: false,
    roomCode: null,
    updateCallback: () => {}
  }
  constructor(props) {
    super(props);
    this.state = {
      guestCanPause: this.props.guestCanPause,
      guestCanSkip: this.props.guestCanSkip,
      errorMsg: "",
      successMsg: "",
    };

    this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
    this.handleGuestCanPause = this.handleGuestCanPause.bind(this);
    this.handleGuestCanSkip = this.handleGuestCanSkip.bind(this);
    this.handleUpdateButtonPressed = this.handleUpdateButtonPressed.bind(this);
  }

  handleGuestCanPause(e) {
    this.setState({
      guestCanPause: e.target.value === "true" ? true : false,
    });
  }

  handleGuestCanSkip(e) {
    this.setState({
      guestCanSkip: e.target.value === "true" ? true : false,
    });
  }

  handleRoomButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        guest_can_skip: this.state.guestCanSkip,
        guest_can_pause: this.state.guestCanPause,
      }),
    };
    fetch("/api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => this.props.history.push("/room/" + data.code));
  }

  handleUpdateButtonPressed() {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        guest_can_skip: this.state.guestCanSkip,
        guest_can_pause: this.state.guestCanPause,
        code: this.props.roomCode
      }),
    };
    fetch("/api/update-room", requestOptions)
      .then((response) => {
        if (response.ok) {
          this.setState({
            successMsg: "Room has been updated"
          });
        } else {
          this.setState({
            errorMsg: "Error updating room"
          });
        }
        this.props.updateCallback();
      });
  }

  renderCreateButtons() {
    return <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Button
            color="secondary"
            variant="contained"
            onClick={this.handleRoomButtonPressed}
          >
            Create a room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="primary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
    </Grid>
  }

  renderUpdateButtons() {
    return <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={this.handleUpdateButtonPressed}
          >
            Update
          </Button>
        </Grid>
  }

  render() {
    const title = this.props.update ? "Update Room" : "Create a Room"

    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Collapse in={this.state.errorMsg != "" || this.state.successMsg != ""}>
            {this.state.successMsg}
          </Collapse>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl component="fieldset">
            <FormHelperText>
              <div align="center">Guest can pause</div>
            </FormHelperText>

            <RadioGroup
              row
              defaultValue={this.props.guestCanPause.toString()}
              onChange={this.handleGuestCanPause}
            >
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Play/Pause"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="false"
                control={<Radio color="secondary" />}
                label="No control"
                labelPlacement="bottom"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12} align="center">
          <FormControl component="fieldset">
            <FormHelperText>
              <div align="center">Guest can skip</div>
            </FormHelperText>
            <RadioGroup
              row
              defaultValue={this.props.guestCanSkip.toString()}
              onChange={this.handleGuestCanSkip}
            >
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Can Skip"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="false"
                control={<Radio color="secondary" />}
                label="No control"
                labelPlacement="bottom"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        {this.props.update
          ? this.renderUpdateButtons()
          : this.renderCreateButtons()}
      </Grid>
    );
  }
}
