import { combineReducers } from "redux";
import CategoriesReducer from "./categories_reducer";
import PostsReducer from "./posts_reducer";
import PostDetailsReducer from "./postDetails_reducer";
import CommentsReducer from "./comments_reducer";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
  categories: CategoriesReducer,
  posts: PostsReducer,
  postDetails: PostDetailsReducer,
  comments: CommentsReducer,
  form: formReducer
});

export default rootReducer;
