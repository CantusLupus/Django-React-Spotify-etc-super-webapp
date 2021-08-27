import React, { Component } from 'react';

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
  }

  getRoomDetails() {
    fetch('/api/get-room' + '?code=' + this.roomCode).then((response) =>
     response.json()
     ).then((data) => {
       this.setState({
         guestCanPause: data.guest_can_pause,
         guestCanSkip: data.guest_can_skip,
         isHost: data.is_host,
       });
     });
  }

  render() {
    return <div>
      <h3>{this.roomCode}</h3>
      <p>Can skip: {this.state.guestCanSkip.toString()}</p>
      <p>Can pause: {this.state.guestCanPause.toString()}</p>
      <p>Host: {this.state.isHost.toString()}</p>
    </div>
  }
} 

