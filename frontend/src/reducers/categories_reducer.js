import _ from "lodash";
import { FETCH_CATEGORIES } from "../actions/actions";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return _.values(action.payload);
    default:
      return state;
  }
}
