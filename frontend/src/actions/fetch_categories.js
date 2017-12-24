import { FETCH_CATEGORIES } from './types';

export default function fetchCategories() {
    return {
        type: FETCH_CATEGORIES,
        payload: 'empty'
    }
}