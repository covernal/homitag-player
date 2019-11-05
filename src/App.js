import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import SpotifyPlayer from './components/SpotifyPlayer';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <SpotifyPlayer />
      </Provider>
    );
  }
}

export default App;
