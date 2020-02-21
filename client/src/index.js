import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./misc/rootReducer";
import * as serviceWorker from './misc/serviceWorker';
import OpolyApp from './base';

// Semantic UI Stylesheet
import "semantic-ui-css/semantic.min.css";
import "./misc/scss/global.scss";

// Redux Store
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

// Render
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={OpolyApp} />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
