import React, { Component } from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import CreateRoomPage from "./CreateRoom";

export default class room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guestCanSkip: false,
      guestCanPause: false,
      isHost: false,
      showSettings: false,
      spotifyAuthenticated: false
    };
    this.roomCode = this.props.match.params.roomCode;
    this.getRoomDetails();
    this.leaveButtonPressed = this.leaveButtonPressed.bind(this);
    this.updateShowSettings = this.updateShowSettings.bind(this);
    this.renderSettingButton = this.renderSettingButton.bind(this);
    this.renderSetting = this.renderSetting.bind(this);
    this.getRoomDetails = this.getRoomDetails.bind(this);
    this.authenticateSpotify = this.authenticateSpotify.bind(this);
  }

  getRoomDetails() {
    return fetch("/api/get-room" + "?code=" + this.roomCode)
      .then((response) => {
        if (!response.ok) {
          this.props.leaveRoomCallback();
          this.props.history.push("/");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          guestCanPause: data.guest_can_pause,
          guestCanSkip: data.guest_can_skip,
          isHost: data.is_host,
        });
        if (this.state.isHost) {
          this.authenticateSpotify();
        }
      });
  }

  authenticateSpotify() {
    fetch('/spotify/is-authenticated')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ spotifyAuthenticated: data.status });
        if (!data.status) {
          fetch('/spotify/get-auth-url')
            .then((response) => response.json())
            .then((data) => {
              window.location.replace(data.url);
            });
        }
      });
  }

  leaveButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/leave-room", requestOptions).then((_response) => {
      this.props.leaveRoomCallback();
      this.props.history.push("/");
    });
  }

  updateShowSettings(value) {
    this.setState({
      showSettings: value,
    });
  }

  renderSetting() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <CreateRoomPage
            update={true}
            guestCanSkip={this.state.guestCanSkip}
            guestCanPause={this.state.guestCanPause}
            roomCode={this.roomCode}
            updateCallback={this.getRoomDetails}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => this.updateShowSettings(false)}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    );
  }

  renderSettingButton() {
    return (
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.updateShowSettings(true)}
        >
          Settings
        </Button>
      </Grid>
    );
  }

  render() {
    if (this.state.showSettings) {
      return this.renderSetting();
    }
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
            Code: {this.roomCode}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6" component="h6">
            Guest can pause: {this.state.guestCanPause.toString()}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6" component="h6">
            Guest can skip: {this.state.guestCanSkip.toString()}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6" component="h6">
            Host: {this.state.isHost.toString()}
          </Typography>
        </Grid>
        {this.state.isHost ? this.renderSettingButton() : null}
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            to="/"
            onClick={this.leaveButtonPressed}
          >
            Leave Room
          </Button>
        </Grid>
      </Grid>
    );
  }
}
