import React from 'react';
import PropTypes from 'prop-types';
import { Property, Corner } from './Items';
import './scss/GameBoard.scss';

const GameBoard = ({ gameManager }) => {
  return (
    <div className="board">
      <div className="inner">
        <Corner type="start" />
        <Property id="1" gameManager={gameManager} colour="dark-brown" cPos="top" />
        <Property id="0" gameManager={gameManager} colour="invisible" cPos="top" type="community-chest" />
        <Property id="2" gameManager={gameManager} colour="dark-brown" cPos="top" />
        <Property id="" gameManager={gameManager} colour="invisible" cPos="top" type="net-worth" />
        <Property id="3" gameManager={gameManager} colour="invisible" cPos="top" type="station" />
        <Property id="4" gameManager={gameManager} colour="light-blue" cPos="top" />
        <Property id="" gameManager={gameManager} colour="invisible" cPos="top" type="chance" />
        <Property id="5" gameManager={gameManager} colour="light-blue" cPos="top" />
        <Property id="6" gameManager={gameManager} colour="light-blue" cPos="top" />
        <Corner type="jail" />
        <Property id="7" gameManager={gameManager} colour="bright-pink" cPos="right" />
        <Property id="8" gameManager={gameManager} colour="invisible" cPos="right" type="utility" />
        <Property id="9" gameManager={gameManager} colour="bright-pink" cPos="right" />
        <Property id="10" gameManager={gameManager} colour="bright-pink" cPos="right" />
        <Property id="11" gameManager={gameManager} colour="invisible" cPos="right" type="station" />
        <Property id="12" gameManager={gameManager} colour="orange" cPos="right" />
        <Property id="" gameManager={gameManager} colour="invisible" cPos="right" type="community-chest" />
        <Property id="13" gameManager={gameManager} colour="orange" cPos="right" />
        <Property id="14" gameManager={gameManager} colour="orange" cPos="right" />
        <Corner type="freeparking" />
        <Property id="15" gameManager={gameManager} colour="red" cPos="top" />
        <Property id="" gameManager={gameManager} colour="invisible" cPos="top" type="chance" />
        <Property id="16" gameManager={gameManager} colour="red" cPos="top" />
        <Property id="17" gameManager={gameManager} colour="red" cPos="top" />
        <Property id="18" gameManager={gameManager} colour="invisible" cPos="top" type="station" />
        <Property id="19" gameManager={gameManager} colour="yellow" cPos="top" />
        <Property id="20" gameManager={gameManager} colour="yellow" cPos="top" />
        <Property id="21" gameManager={gameManager} colour="invisible" cPos="top" type="utility" />
        <Property id="22" gameManager={gameManager} colour="yellow" cPos="top" />
        <Corner type="gotojail" />
        <Property id="23" gameManager={gameManager} colour="green" cPos="left" />
        <Property id="24" gameManager={gameManager} colour="green" cPos="left" />
        <Property id="" gameManager={gameManager} colour="invisible" cPos="left" type="community-chest" />
        <Property id="25" gameManager={gameManager} colour="green" cPos="left" />
        <Property id="26" gameManager={gameManager} colour="invisible" cPos="left" type="station" />
        <Property id="" gameManager={gameManager} colour="invisible" cPos="left" type="chance" />
        <Property id="27" gameManager={gameManager} colour="blue" cPos="left" />
        <Property id="" gameManager={gameManager} colour="invisible" cPos="left" type="tax" />
        <Property id="28" gameManager={gameManager} colour="blue" cPos="left" />
      </div>
    </div>
  );
};

GameBoard.propTypes = {
  gameManager: PropTypes.any.isRequired,
};

export default GameBoard;