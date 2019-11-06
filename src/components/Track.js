import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';


class Track extends Component
{
  state = {
    isLoading: false,
    playlists: []
  }

  openPlaylists = () => {
    const { openPlaylists } = this.props;
    openPlaylists();
  }

  openTracks = () => {
    const { openTracks } = this.props;
    openTracks();
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
    const { info } = this.props;
    return (
      <Container fluid={true}>
        <Row>
          <Col>
            <h1>
              <a className="text-secondary" href="#" onClick={this.openPlaylists}>&lt; Playlists</a> / <a className="text-secondary" href="#" onClick={this.openTrack}>Tracks</a>
            </h1>
            <h1 className="text-primary">
              {info.track.name}
            </h1>
            <div>
              <img className=""src={info.track.album.images[info.track.album.images.length - 1].url} />
            </div>
            <h3>Artists: {this.displayArtists(info.track.artists)}</h3>
            <h3>Album: {info.track.album.name}</h3>
            <h3>Duration: {this.displayDuration(info.track.duration_ms)}</h3>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Track;