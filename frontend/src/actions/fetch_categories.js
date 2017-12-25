import { FETCH_CATEGORIES } from './actions';
import axios from 'axios';

export default function fetchCategories() {
    return dispatch => {
        axios.get('http://localhost:3001/categories', {
            headers: {
                Authorization: 'token'
            }
        }).then(response => {
            dispatch(fetchCategoriesAsync(response.data.categories))
        }).catch(err => console.log(err));
    }
}

function fetchCategoriesAsync(categories) {
    return {
        type: FETCH_CATEGORIES,
        payload: categories
    }
}