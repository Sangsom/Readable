import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

import "./index.css";
import Root from "./components/Root";
import registerServiceWorker from "./registerServiceWorker";

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(<Provider store={store}><Root /></Provider>, document.getElementById("root"));
registerServiceWorker();
