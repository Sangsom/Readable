import { FETCH_CATEGORIES } from "./actions";
import { BASE_URL, TOKEN } from "../utils/constants";
import axios from "axios";

axios.defaults.headers.common["Authorization"] = TOKEN;

export default function fetchCategories() {
  return dispatch => {
    axios
      .get(`${BASE_URL}/categories`)
      .then(response => {
        dispatch(fetchCategoriesAsync(response.data.categories));
      })
      .catch(err => console.log(err));
  };
}

function fetchCategoriesAsync(categories) {
  return {
    type: FETCH_CATEGORIES,
    payload: categories
  };
}
