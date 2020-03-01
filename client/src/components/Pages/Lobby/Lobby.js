import React, { Component } from 'react';
import { connect } from "react-redux";
import { toast } from 'react-semantic-toasts';
import { Grid, Tab, Image, Button, Icon } from 'semantic-ui-react';
import { Footer, LoadingSpinner } from '../../Common';
import Logo from '../../Common/images/logo.png';
import { getGameStats, leaveGame, forceEndGame, kickPlayer } from '../../../actions/game';
import PropTypes from 'prop-types';
import { ws as WsURL } from '../../../api/constants';

class Lobby extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      loadText: null,
      players: null,
      playerCount: 0,
      isStarting: false,
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

  startGame = () => {
    this.setState({
      isStarting: true
    }, () => {
      // Check if we have a WebSocket
      if (!this.lobbyWebSocket) {
        return;
      }

      // Send start game request
      this.lobbyWebSocket.send(JSON.stringify({
        type: "startgame",
        game: this.props.game,
        player: this.props.player
      }));
    });
  };

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
              if (message.extra && message.extra === "kick") {
                toast({ title: 'A player was kicked' });
              }
              else {
                toast({ title: 'A player disconnected' });
              }
            }
          } else {
            this.lobbyWebSocket.didInit = false;
          }
          break;

        case "KICK_ME":
          toast({ title: 'You were kicked from the game.' });
          this.props.leaveGame(this.props.game.id, this.props.player);
          this.lobbyWebSocket.onclose = undefined;
          this.lobbyWebSocket.close();
          break;

        case "START_GAME":
          toast({ title: 'Game is starting...' });
          this.lobbyWebSocket.onclose = undefined;
          this.lobbyWebSocket.close();
          setTimeout(() => {
            this.props.history.push("/game/play");
          }, 750);
          break;

        case "END_GAME":
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
              {this.props.player.id === this.props.game.host && (<th style={{ width: "1%" }}>Kick?</th>)}
              <th style={{ width: "35%" }}>Name</th>
              <th style={{ width: "50%" }}>Joined</th>
            </tr>
          </thead>
          <tbody>
            {this.state.players !== null && this.state.players.map((player, i) => (
              <tr key={i}>
                {this.props.player.id === this.props.game.host && (
                  <td style={{ width: "5%" }}>
                    {this.props.player.id !== player.id && (
                      <Icon name='boot circle' onClick={() => this.props.kickPlayer(this.props.game, player, this.lobbyWebSocket)} />
                    )}
                  </td>
                )}
                <td>{player.name}</td>
                <td>{player.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Tab.Pane>,
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
    const { isStarting, loading, loadText } = this.state;

    return (
      <div>
        {loading && <LoadingSpinner text={loadText} />}
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 650 }}>
            <div style={{ textAlign: "center" }}>
              <Image src={Logo} style={{ display: "inline-block", marginBottom: "1em" }} />
            </div>
            <Tab menu={{ pointing: true }} panes={this.tabs()} />
            {this.props.game.host === this.props.player.id && (
              <Button loading={isStarting} positive style={{ width: "100%", marginTop: "1em" }} onClick={this.startGame}>
                Start Game
                <Icon name='chevron right' />
              </Button>
            )}
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
  { getGameStats, leaveGame, forceEndGame, kickPlayer }
)(Lobby);
