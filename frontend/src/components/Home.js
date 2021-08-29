import React, { Component } from "react";
import RoomJoinPage from "./RoomJoin";
import CreateRoomPage from "./CreateRoom"; 
import Room from "./Room";
import { BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";
import { ButtonGroup, Button, Grid, Typography } from "@material-ui/core";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: null,
    };
    this.clearRoomCode = this.clearRoomCode.bind(this);
  }

  async componentDidMount() {
    fetch('/api/user-in-room')
    .then((response) => response.json())
    .then((data) => {
      this.setState({
        roomCode: data.code
      });
    });
  }

  renderHomePage() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <Typography variant="h3" component="h3">
            Co-music
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup disableElevation variant="contained" color="primary">
              <Button variant="contained" color="secondary" to="/join" component={Link}>
                Join
                </Button>
              <Button variant="contained" color="primary" to="/create" component={Link}>
                Create
                </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  }

  clearRoomCode() {
    this.setState({
      roomCode: null,
    });
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={() => {
            return this.state.roomCode ? (
              <Redirect to={`/room/${this.state.roomCode}`} />
            ) : (
              this.renderHomePage()
            );
          }} 
          />
          <Route exact path="/join" component={RoomJoinPage} />
          <Route exact path="/create" component={CreateRoomPage} />
          <Route exact path="/room/:roomCode" 
          render={(props) => {
            return <Room {...props} leaveRoomCallback={this.clearRoomCode} />;
          }}
          />
        </Switch>
    </Router>
    );
  }
}