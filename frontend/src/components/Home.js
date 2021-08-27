import React, { Component } from "react";
import RoomJoinPage from "./RoomJoin";
import CreateRoomPage from "./CreateRoom"; 
import Room from "./Room";
import { BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Router>
      <Switch>
        <Route exact path="/">HomePage</Route>
        <Route path="/join" component={RoomJoinPage} />
        <Route path="/create" component={CreateRoomPage} />
        <Route path="/room/:roomCode" component={Room} />
      </Switch>
    </Router>;
  }
}