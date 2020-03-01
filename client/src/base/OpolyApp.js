import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import { SemanticToastContainer } from "react-semantic-toasts";
import { LandingPage, Terms, Lobby, Board, CreateGame, JoinGame } from '../components/Pages';
import { AuthenticatedRoute, AnonymousRoute } from '../components/Routes';
import { GameManager } from '../utility';
import 'react-semantic-toasts/styles/react-semantic-alert.css';

class OpolyApp extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    // Get our applications className
    let appClass = `opoly-app`;

    return (
      <div className={appClass}>
        <SemanticToastContainer position="bottom-right" />

        {/* Anonymous Only Routes */}
        <Switch>
          {/* Anyone Routes */}
          <AnonymousRoute path="/" exact component={LandingPage} />
          <AnonymousRoute path="/game/create" exact component={CreateGame} />
          <Route path="/game/join" exact component={JoinGame} />
          <Route path="/game/join/:gameId" exact component={JoinGame} />
          <Route path="/terms" exact component={Terms} />

          {/* Game Paths */}
          <AuthenticatedRoute path="/game/lobby" exact component={Lobby} gameManager={this.gameManager} />
          <Route path="/game/play" gameManager={this.gameManager} exact component={Board} />
          <AuthenticatedRoute path="/game/end" exact component={Terms} gameManager={this.gameManager} />

          {/* Error Page */}
          {/*<AnonymousRoute component={ErrorPage} />*/}
        </Switch>
      </div>
    );
  }
}

OpolyApp.propTypes = {};

export default OpolyApp;
