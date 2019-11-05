import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import modules from './modules';

const configure = () => {
  const store = createStore(modules, applyMiddleware(ReduxThunk));
  // const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // const store = createStore(modules, devTools);

  return store;
}

export default configure;