import React, { Component } from 'react';
import { connect } from "react-redux";
import { toast } from 'react-semantic-toasts';
import { Grid, Tab, Image, Button } from 'semantic-ui-react';
import { Footer, LoadingSpinner } from '../../Common';
import Logo from '../../Common/images/logo.png';
import { getGameStats, leaveGame, forceEndGame } from '../../../actions/game';
import PropTypes from 'prop-types';
import { ws as WsURL } from '../../../api/constants';

class Lobby extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      loadText: null,
      players: null,
      playerCount: 0
    };

    this.lobbyWebSocket = null;
  }

  componentDidMount() {
    // Get the game statistics
    // this.props.getGameStats(this.props.game.id)
    //   .then(res => {
    //     let { data } = res;
    //     this.setState({
    //       ...this.state,
    //       ...data
    //     });
    //   })
    //   .catch(err => {
    //     console.warn("[API]: Error when getting game stats:", err)
    //     this.setState({
    //       ...this.state,
    //       players: [],
    //     });
    //   });

    // Setup the WebSocket
    this.setupWebSocket();
  }

  setupWebSocket = () => {
    this.lobbyWebSocket = new WebSocket(`${WsURL}`);
    this.lobbyWebSocket.onclose = () => { console.log(`[WS]: Closed WS`); setTimeout(() => this.setupWebSocket(), 1000); }
    this.lobbyWebSocket.onopen = () => {
      console.log(`[WS]: Opened WS`);
      this.lobbyWebSocket.send(JSON.stringify({
        type: "init",
        game: this.props.game,
        player: this.props.player
      }));
      toast({ title: 'Connected', description: <p>Successfully connected to the lobby server.</p> });
      this.lobbyWebSocket.didInit = true;
    }
    this.lobbyWebSocket.onmessage = (data) => {
      console.log(`[WS]: Received message`);
      let message = "";
      try {
        message = JSON.parse(data.data);
      }
      catch (e) { return console.warn("Unable to parse websocket message.", e); }

      switch (message.type) {
        case "UPDATE_PLAYERS":
          let currentCount = this.state.playerCount;
          this.setState({
            ...this.state,
            players: message.players,
            playerCount: message.playerCount
          });
          if (!this.lobbyWebSocket.didInit) {
            if (message.playerCount > currentCount) {
              toast({ title: 'A player connected.' });
            }
            else if (message.playerCount < currentCount) {
              toast({ title: 'A player disconnected' });
            }
          } else {
            this.lobbyWebSocket.didInit = false;
          }
          break;

        case "END_GAME":
          // Check if the host left
          toast({ title: 'The host ended the game.' });
          this.props.leaveGame(this.props.game.id, this.props.player);
          break;
      }
    }
  };

  /* Tabs */
  tabs = () => ([
    {
      menuItem: 'Lobby',
      render: () => <Tab.Pane attached={false} loading={this.state.players === null}>
        <h3 className="underline">Game Information</h3>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th style={{ width: "33%", textAlign: "center" }}>Name</th>
              <th style={{ width: "33%", textAlign: "center" }}>Key</th>
              <th style={{ width: "33%", textAlign: "center" }}>Host</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ textAlign: "center" }}>{this.props.game.name}</td>
              <td style={{ textAlign: "center" }}>{this.props.game.key}</td>
              <td style={{ textAlign: "center" }}>{this.props.game.hostName}</td>
            </tr>
          </tbody>
        </table>
        <h3 className="underline">Players</h3>
        <table style={{ width: "100%", textAlign: "center" }}>
          <thead>
            <tr>
              <th style={{ width: "50%" }}>Name</th>
              <th style={{ width: "50%" }}>Joined</th>
            </tr>
          </thead>
          <tbody>
            {this.state.players !== null && this.state.players.map((player, i) => (
              <tr key={i}>
                <td>{player.name}</td>
                <td>{player.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Tab.Pane>,
    },
    {
      menuItem: 'Start Game',
      render: () => <Tab.Pane attached={false}>
        {this.props.game.host === this.props.player.id && (
          <div>
            Start Game
          </div>
        )}
        {this.props.game.host !== this.props.player.id && (
          <div>
            You're not the host, you cannot start this game.
          </div>
        )}
      </Tab.Pane>
    },
    {
      menuItem: 'Game Options',
      render: () => <Tab.Pane attached={false}>
        {this.props.game.host === this.props.player.id && (
          <div>
            Game Options
          </div>
        )}
        {this.props.game.host !== this.props.player.id && (
          <div>
            You're not the host, you cannot change the game options.
            (might change to disable output)
          </div>
        )}
      </Tab.Pane>
    },
    {
      menuItem: 'Leave Game',
      render: () => <Tab.Pane attached={false} style={{ textAlign: "center" }}>
        {this.props.game.host === this.props.player.id && (
          <div>
            <h3 style={{ marginBottom: "0" }}>Are you sure you want to leave?</h3>
            <p>As the host, leaving this game will end the session and kick all players.</p>
            <p></p>
          </div>
        )}
        {this.props.game.host !== this.props.player.id && (
          <h3>Are you sure you want to leave?</h3>
        )}
        <Button negative onClick={() => {
          if (this.lobbyWebSocket) {
            if (this.props.game.host === this.props.player.id) {
              this.props.forceEndGame(this.props.game.id, this.props.game.hostSecretKey);
              this.lobbyWebSocket.send(JSON.stringify({
                type: "endgame",
                game: this.props.game,
                player: this.props.player
              }))
            }
            this.lobbyWebSocket.onclose = undefined;
            this.lobbyWebSocket.send(JSON.stringify({
              type: "leave",
              game: this.props.game,
              player: this.props.player
            }));
            this.lobbyWebSocket.close();
          }

          this.props.leaveGame(this.props.game.id, this.props.player);
          this.props.history.push("/");
        }}>Leave Game</Button>
      </Tab.Pane>
    }
  ]);

  render() {
    const { loading, loadText } = this.state;

    return (
      <div>
        {loading && <LoadingSpinner text={loadText} />}
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 650 }}>
            <div style={{ textAlign: "center" }}>
              <Image src={Logo} style={{ display: "inline-block", marginBottom: "1em" }} />
            </div>
            <Tab menu={{ pointing: true }} panes={this.tabs()} />
            <Footer />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

Lobby.propTypes = {

};

const mapStateToProps = state => ({
  game: state.game,
  player: state.player,
});

export default connect(
  mapStateToProps,
  { getGameStats, leaveGame, forceEndGame }
)(Lobby);
