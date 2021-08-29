import React, { Component } from 'react';
import { TextField, Button, Grid, Typography } from "@material-ui/core";

export default class room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guestCanSkip: false,
      guestCanPause: false,
      isHost: false,
    };
    this.roomCode = this.props.match.params.roomCode;
    this.getRoomDetails();
    this.leaveButtonPressed = this.leaveButtonPressed.bind(this);
  }

  getRoomDetails() {
    return fetch('/api/get-room' + '?code=' + this.roomCode)
      .then((response) => {
        if (!response.ok) {
          this.props.leaveRoomCallback();
          this.props.history.push('/');
        }
        return response.json();
      })
      .then((data) => {
       this.setState({
         guestCanPause: data.guest_can_pause,
         guestCanSkip: data.guest_can_skip,
         isHost: data.is_host,
       });
     });
  }

  leaveButtonPressed() {
    const requestOptions = {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
    };
    fetch('/api/leave-room', requestOptions).then((_response) => {
      this.props.leaveRoomCallback();
      this.props.history.push('/');
    });
  }

  render() {
    return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
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
      <Grid item xs={12} align="center">
      <Button variant="contained" color="secondary" to="/" onClick={this.leaveButtonPressed}>
        Leave Room
        </Button>
      </Grid>
    </Grid>
    )
  }
} 
