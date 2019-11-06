import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Row, Col, Button,
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, } from 'reactstrap';
import { css } from '@emotion/core';
import { ScaleLoader } from 'react-spinners';

import * as playlistsActions from '../store/modules/playlists';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class PlayLists extends Component
{
  state = {
    isLoading: false,
    playlists: []
  }

  componentDidMount() {
    console.log('fetching url');
    const { token, playlists } = this.props;
    if (playlists.length === 0) {
      this.props.playlistsActions.getPlaylists(token);
    }
  }

  openPlaylist = (playlist_id) => {
    const { openPlaylist } = this.props;
    openPlaylist(playlist_id);
  }

  render() {
    const { pending, error, playlists } = this.props;
    console.log(pending, error, playlists);
    const list = playlists.map(
      pl => (
        <Card className="spotify_card" key={pl.id}>
          <CardImg top width="100%" src={pl.images[0].url} />
          <CardBody>
            <CardTitle>{pl.name}</CardTitle>
            <CardSubtitle>{pl.tracks.total} Tracks</CardSubtitle>
            <div className="clearfix"><Button onClick={() => this.openPlaylist(pl.id) }>Open</Button></div>
          </CardBody>
        </Card>
      )
    )
    return (
      <Container fluid={true}>
        <Row>
          <Col>
            <h1 className="text-primary">
              Playlists by HomiTag
            </h1>
            <h2 className="text-secondary">
              Featured playlist for you
            </h2>
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
    pending: store.playlists.pending,
    error: store.playlists.error,
    playlists: store.playlists.playlists
  }),
  (dispatch) => ({
    playlistsActions: bindActionCreators(playlistsActions, dispatch)
  })
)(PlayLists);