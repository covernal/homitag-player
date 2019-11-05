import { combineReducers } from 'redux';
import spotify from './spotify';
import playlists from './playlists';
import tracks from './tracks';

export default combineReducers({
  spotify,
  playlists,
  tracks
});