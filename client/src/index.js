import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./misc/rootReducer";
import * as serviceWorker from './misc/serviceWorker';
import { reauthPlayer } from "./actions/auth";
import OpolyApp from './base';

// Semantic UI Stylesheet
import "semantic-ui-css/semantic.min.css";
import "./misc/scss/global.scss";

// Redux Store
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

// Reauthenticate our player if we have data in our localStorage
let playerStorage = localStorage.getItem("player");
let gameStorage = localStorage.getItem("player");
if (playerStorage && gameStorage && playerStorage !== null && gameStorage !== null) {
  try {
    const game = JSON.parse(localStorage.getItem("game"));
    const player = JSON.parse(localStorage.getItem("player"));

    // Only attempt to reauthenticate if the email or session exists
    if (game.id && player.name && player.password && player.id && player.secretKey) {
      store.dispatch(
        reauthPlayer({
          gameId: game.id,
          player: {
            id: player.id,
            name: player.name,
            password: player.password,
            secretKey: player.secretKey
          }
        })
      );
    }
  } catch (e) {
    // Unset "player" from localStorage to avoid causing another error
    localStorage.removeItem("player");
    localStorage.removeItem("game");
  }
}

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
