import { createAction, handleActions } from 'redux-actions';

const SETTOKEN = 'spotify/settoken';

export const setToken = createAction(SETTOKEN);

const initialState = {
    token: ''
};

export default handleActions({
    [SETTOKEN]: (state, action) => {
      return { token: action.payload };
    }
  }, initialState);