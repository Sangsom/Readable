import { FETCH_POSTS } from './actions';
import axios from 'axios';

export default function fetchPosts() {
    return dispatch => {
        axios.get('http://localhost:3001/posts', {
            headers: {
                Authorization: 'token'
            }
        }).then(response => {
            dispatch(fetchPostsAsync(response.data))
        })
    }
}

function fetchPostsAsync(posts) {
    return {
        type: FETCH_POSTS,
        payload: posts
    }
}