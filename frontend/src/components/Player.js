import React, { Component } from "react";
import { Grid, Typography, Card, IconButton, LinearProgress, IconButton } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/PauseIcon";
import SkipNextIcon from "@material-ui/icons/SkipNextIcon";

export default class MusicPlayer extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {

    const songProgress = (this.props.time / this.props.duration) * 100;
    
    return (
      <Card>
        <Grid container alignItems="center">
          <Grid item align="center" xs={4}>
            <img src={this.props.image_url} height="100%" width="100%" />
          </Grid>
          <Grid item align="center" xs={8}>
            <Typography component="h4" variant="h4">
              {this.props.title}
            </Typography>
            <Typography color="textSecondary" variant="subtitle1">
              {this.props.artist}
            </Typography>
            <div>
              <IconButton>
                {this.props.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              <IconButton>
                <SkipNextIcon />
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <LinearProgress variant="determinate" value={songProgress}></LinearProgress>
      </Card>
    );
  }
}