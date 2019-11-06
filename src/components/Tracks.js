import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Row, Col, Button, Media } from 'reactstrap';
import { css } from '@emotion/core';
import { ScaleLoader } from 'react-spinners';

import * as tracksActions from '../store/modules/tracks';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

const media_img = css`
  width: 64px;
  height: 64px;
`;

class Tracks extends Component
{
  state = {
    isLoading: false,
    playlists: []
  }

  componentDidMount() {
    console.log('fetching url');
    const { token, playlist_id, playlist } = this.props;
    if (playlist_id !== playlist.id) {
      this.props.tracksActions.getTracks(token, playlist_id);
    }
  }

  componentWillReceiveProps(nextProps) {
    // const { PostActions } = this.props;

    // if(this.props.number !== nextProps.number) {
    //     PostActions.getPost(nextProps.number)
    // }
  }

  openPlaylists = () => {
    const { openPlaylists } = this.props;
    openPlaylists();
  }

  displayArtists = (artists) => {
    let result = '';
    for(let i = 0; i < artists.length; i++) {
      result += artists[i].name + ", ";
    }

    return result ==='' ? '' : result.slice(0, -2);
  }

  displayDuration = (ms) => {
    let sec = Math.floor(ms / 1000);
    let min = Math.floor(sec / 60);
    sec = sec - min * 60;
    return min + ":" + (sec < 10 ? '0' + sec : sec);
  }

  render() {
    const { pending, error, playlist, tracks } = this.props;
    console.log(pending, error, playlist);
    const list = tracks.filter(info => (
        info.track
      ))
      .map(info => (
        <Media className="poster" key={info.track.id}>
          <Media left href="#">
            <Media object className="poster_thumb" src={info.track.album.images[info.track.album.images.length - 1].url} alt="Generic placeholder image"/>
          </Media>
          <Media body>
            <Media heading>
              {info.track.name}
            </Media>
            <span>Artists: {this.displayArtists(info.track.artists)}</span><br/>
            <span>Duration: {this.displayDuration(info.track.duration_ms)}</span><br/>
            <span>Popularity: {info.track.popularity} </span><br/>
          </Media>
        </Media>
      ))
    return (
      <Container fluid={true}>
        <Row>
          <Col>
            <h2>
              <a className="text-secondary" href="#" onClick={this.openPlaylists}>&lt; Playlists</a>
            </h2>
            <h1 className="text-primary">
            { pending === false ? playlist.name : <span /> }
            </h1>
            <div>
              { pending === false ? list : <span /> }
            </div>
            <div>
              <ScaleLoader
                css={override}
                sizeUnit={"px"}
                size={150}
                color={'rgb(54, 215, 183)'}
                loading={pending}
              />
            </div> 
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect(
  (store) => ({
    token: store.spotify.token,
    pending: store.tracks.pending,
    error: store.tracks.error,
    playlist: store.tracks.playlist,
    tracks: store.tracks.tracks
  }),
  (dispatch) => ({
    tracksActions: bindActionCreators(tracksActions, dispatch)
  })
)(Tracks);