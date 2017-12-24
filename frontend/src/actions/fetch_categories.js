import { FETCH_CATEGORIES } from './actions';

export default function fetchCategories() {
    return {
        type: FETCH_CATEGORIES,
        payload: 'empty'
    }
}