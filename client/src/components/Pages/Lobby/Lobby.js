import React, { Component } from 'react';
import { connect } from "react-redux";
import { toast } from 'react-semantic-toasts';
import { Grid, Tab, Image, Button } from 'semantic-ui-react';
import { Footer, LoadingSpinner } from '../../Common';
import Logo from '../../Common/images/logo.png';
import { getGameStats, leaveGame } from '../../../actions/game';
import PropTypes from 'prop-types';
import { ws as WsURL } from '../../../api/constants';

class Lobby extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      loadText: null,
      players: null
    };

    this.lobbyWebSocket = null;
  }

  componentDidMount() {
    // Get the game statistics
    this.props.getGameStats(this.props.game.id)
      .then(res => {
        let { data } = res;
        this.setState({
          ...this.state,
          ...data
        });
      })
      .catch(err => {
        console.warn("[API]: Error when getting game stats:", err)
        this.setState({
          ...this.state,
          players: [],
        });
      });

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
          this.setState({
            ...this.state,
            players: message.players
          });
          if (!this.lobbyWebSocket.didInit) {
            toast({ title: 'New Player Connected' });
          } else {
            this.lobbyWebSocket.didInit = false;
          }
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
      render: () => <Tab.Pane attached={false}>Start</Tab.Pane>
    },
    {
      menuItem: 'Game Options',
      render: () => <Tab.Pane attached={false}>Game Options</Tab.Pane>
    },
    {
      menuItem: 'Leave Game',
      render: () => <Tab.Pane attached={false} style={{ textAlign: "center" }}>
        <p>Are you sure you want to leave?</p>
        <Button negative onClick={() => {
          if (this.lobbyWebSocket) {
            this.lobbyWebSocket.close();
          }

          this.props.leaveGame();
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
  { getGameStats, leaveGame }
)(Lobby);
