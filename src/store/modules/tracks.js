import { handleActions } from 'redux-actions';
import axios from 'axios';

function getTracksAPI(token, id) {
    let config = {
        headers: {
            Authorization: "Bearer " + token,
        }
      }
    return axios.get(`https://api.spotify.com/v1/playlists/`+id, config);
}

const GET_TRACK_PENDING = 'tracks/pending';
const GET_TRACK_SUCCESS = 'tracks/success';
const GET_TRACK_FAILURE = 'tracks/failure';

export const getTracks = (token, id) => dispatch => {
    // notify GET_POST_PENDING to notify the http call
    dispatch({type: GET_TRACK_PENDING});
    // request the http api
    // return the promise
    return getTracksAPI(token, id)
    .then(
        (response) => {
            // if success, dispatch GET_POST_SUCCESS with the response as payload
            dispatch({
                type: GET_TRACK_SUCCESS,
                payload: response.data
            })
        }
    ).catch(error => {
        // if error occured, dispatch GET_POST_FAILURE with the error as payload
        dispatch({
            type: GET_TRACK_FAILURE,
            payload: error
        });
    })
}

const initialState = {
    pending: false,
    error: false,
    playlist: { name: '' },
    tracks: []
}

export default handleActions({
    [GET_TRACK_PENDING]: (state, action) => {
        return {
            ...state,
            pending: true,
            error: false
        };
    },
    [GET_TRACK_SUCCESS]: (state, action) => {

        return {
            ...state,
            pending: false,
            playlist: action.payload,
            tracks: action.payload.tracks.items
        };
    },
    [GET_TRACK_FAILURE]: (state, action) => {
        return {
            ...state,
            pending: false,
            error: true
        }
    }
}, initialState);