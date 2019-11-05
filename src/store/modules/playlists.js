import { handleActions } from 'redux-actions';
import axios from 'axios';

function getPlaylistsAPI(token) {
    let config = {
        headers: {
            Authorization: "Bearer " + token,
        }
      }
    return axios.get(`https://api.spotify.com/v1/browse/featured-playlists?&limit=20&locale=`+navigator.language, config);
}

const GET_PLAYLIST_PENDING = 'playlists/pending';
const GET_PLAYLIST_SUCCESS = 'playlists/success';
const GET_PLAYLIST_FAILURE = 'playlists/failure';

export const getPlaylists = (token) => dispatch => {
    // notify GET_POST_PENDING to notify the http call
    dispatch({type: GET_PLAYLIST_PENDING});
    // request the http api
    // return the promise
    return getPlaylistsAPI(token)
    .then(
        (response) => {
            // if success, dispatch GET_POST_SUCCESS with the response as payload
            dispatch({
                type: GET_PLAYLIST_SUCCESS,
                payload: response.data.playlists.items
            })
        }
    ).catch(error => {
        // if error occured, dispatch GET_POST_FAILURE with the error as payload
        dispatch({
            type: GET_PLAYLIST_FAILURE,
            payload: error
        });
    })
}

const initialState = {
    pending: false,
    error: false,
    playlists: []
}

export default handleActions({
    [GET_PLAYLIST_PENDING]: (state, action) => {
        return {
            ...state,
            pending: true,
            error: false
        };
    },
    [GET_PLAYLIST_SUCCESS]: (state, action) => {

        return {
            ...state,
            pending: false,
            playlists: action.payload
        };
    },
    [GET_PLAYLIST_FAILURE]: (state, action) => {
        return {
            ...state,
            pending: false,
            error: true
        }
    }
}, initialState);