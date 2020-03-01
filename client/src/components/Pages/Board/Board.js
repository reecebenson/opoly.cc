import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Logo from '../../Common/images/logo.png';
import GameBoard from './GameBoard';
import GameManager from '../../../utility/GameManager';
import { MyProperties, UserTrade, Chat, SystemLogs } from './Toolbars';
import './scss/Board.scss';

class Board extends Component {
  constructor(props) {
    super(props);

    this.gameManager = new GameManager();
    this.state = {};
  }

  // TODO: Move things out to separate components (i.e. "hotbar")
  render() {
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
            <Chat />
            <SystemLogs />
          </div>
        </div>
      </div>
    );
  }
}

Board.propTypes = {};

export default Board;