import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SpotifyLogin from 'react-spotify-login';
import PlayLists from './PlayLists';
import Tracks from './Tracks';
import Track from './Track';

import { clientId, redirectUri } from '../settings';
import * as spotifyActions from '../store/modules/spotify';


class SpotifyPlayer extends Component
{
  state = {
    pageId: 0
  }

  onSuccess = response => {
    console.log(response);
    // this.setState({
    //   token: response.access_token
    // })
    this.props.spotifyActions.setToken(response.access_token);
  }

  onFailure = response => {
    console.log(response);
  }

  openPlaylists = () => {
    this.setState({
      pageId: 0
    })
  }

  openPlaylist = playlist_id => {
    this.setState({
      pageId: 1,
      playlist_id: playlist_id || this.state.playlist_id
    })
  }

  openTrack = track => {
    this.setState({
      pageId: 2,
      track: track
    })
  }

  render() {
    let login = 
    <div className="login">
      <SpotifyLogin
        clientId={clientId}
        redirectUri={redirectUri}
        onSuccess={this.onSuccess}
        onFailure={this.onFailure}/>
        <h1>
          Spotify Player
        </h1>
    </div>;
    
    const { token } = this.props;

    return (
      <div>
        {!token ? (
          login
        ) : (
          (()=> {
            if (this.state.pageId === 0) {
              return (<PlayLists openPlaylist={this.openPlaylist} />);
            } else if (this.state.pageId === 1) {
              return (<Tracks playlist_id={this.state.playlist_id} openPlaylists={this.openPlaylists}  openTrack={this.openTrack}/>);
            } else if (this.state.pageId === 2) {
              return (<Track info={this.state.track} openPlaylists={this.openPlaylists} openTracks={this.openPlaylist} />);
            }
          })()
        )}
      </div>
    );
  }
}

export default connect(
  (store) => ({
    token: store.spotify.token
  }),
  (dispatch) => ({
    spotifyActions: bindActionCreators(spotifyActions, dispatch)
  })
)(SpotifyPlayer);