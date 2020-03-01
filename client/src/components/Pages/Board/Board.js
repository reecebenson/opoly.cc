import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { toast } from 'react-semantic-toasts';
import Logo from '../../Common/images/logo.png';
import GameBoard from './GameBoard';
import GameManager from '../../../utility/GameManager';
import { MyProperties, UserTrade, Chat, SystemLogs } from './Toolbars';
import './scss/Board.scss';
import { ws as WsURL } from '../../../api/constants';

class Board extends Component {
  constructor(props) {
    super(props);

    this.gameManager = new GameManager();
    this.webSocket = null;
    this.state = {
      loading: true,
      chats: [],
      logs: [],
    };
  }

  componentDidMount() {
    // Setup the WebSocket
    if (Object.keys(this.props.game).length > 0 && Object.keys(this.props.player).length > 0) {
      this.setupWebSocket();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.webSocket === null && prevState.loading) {
      if (Object.keys(this.props.game).length > 0 && Object.keys(this.props.player).length > 0) {
        this.setupWebSocket();
      }
    }
  }


  setupWebSocket = () => {
    this.webSocket = new WebSocket(`${WsURL}`);
    this.webSocket.onclose = () => { console.log(`[WS]: Closed WS`); setTimeout(() => this.setupWebSocket(), 1000); }
    this.webSocket.onopen = () => {
      console.log(`[WS]: Opened WS`);
      this.webSocket.send(JSON.stringify({
        type: "game-on",
        game: this.props.game,
        player: this.props.player,
        socketOpener: true
      }));
      toast({ title: 'Connected', description: <p>Successfully connected to the game server.</p> });
      this.webSocket.didInit = true;
    }
    this.webSocket.onmessage = (data) => {
      console.log(`[WS]: Received message`, data);
      let message = "";
      try {
        message = JSON.parse(data.data);
      }
      catch (e) { return console.warn("Unable to parse websocket message.", e); }

      switch (message.type) {
        case "POLL": {
          this.setState({
            chats: message.data.messages,
            logs: message.data.logs
          }, () => console.log("State:", this.state));
          break;
        }
      }
    }
  };

  chatMessage = (message) => {
    this.webSocket.send(JSON.stringify({
      type: "message",
      message: message,
      game: this.props.game,
      player: this.props.player
    }));
  }

  // TODO: Move things out to separate components (i.e. "hotbar")
  render() {
    const { chats, logs } = this.state;
    return (
      <div className="ui opoly">
        <div className="hotbar">
          <div className="logo"><img src={Logo} /></div>
        </div>
        <div className="game">
          <div className="toolbar left">
            <MyProperties />
            <UserTrade />
          </div>
          <GameBoard gameManager={this.gameManager} />
          <div className="toolbar right">
            <Chat chats={chats} chatMessage={this.chatMessage} />
            <SystemLogs logs={logs} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  game: state.game,
  player: state.player,
});

export default connect(
  mapStateToProps,
  null
)(Board);
