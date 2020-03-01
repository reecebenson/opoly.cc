import React from 'react';
import PropTypes from 'prop-types';
import Middle from './Middle';
import { Property, Corner } from './Items';
import './scss/GameBoard.scss';

class GameBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameManager: props.gameManager,
      hovering: null,
    };
  }

  propertyHandler = (id, pos, type = "") =>
    (<Property
      gameManager={this.state.gameManager}
      id={id}
      pos={pos}
      type={type}
      handleMouseOver={this.handleMouseOver}
      resetMouseOver={this.resetMouseOver} />);

  handleMouseOver = (id) => {
    this.setState({
      hovering: this.state.gameManager.getPropertyName(id)
    });
  };

  resetMouseOver = (id) => {
    this.setState({
      hovering: null,
    });
  };

  render() {
    const { hovering } = this.state;

    return (
      <div className="board">
        <table cellSpacing="0">
          <tbody>
            <tr>
              <Corner type="free-parking" />
              {this.propertyHandler("15", "top")}
              {this.propertyHandler("16", "top")}
              {this.propertyHandler(null, "top", "chance")}
              {this.propertyHandler("17", "top")}
              {this.propertyHandler("18", "top", "station")}
              {this.propertyHandler("19", "top")}
              {this.propertyHandler("20", "top")}
              {this.propertyHandler("21", "top")}
              {this.propertyHandler("22", "top")}
              <Corner type="go-to-jail" />
            </tr>
            <tr>
              {this.propertyHandler("14", "right")}
              <Middle hovering={hovering} />
              {this.propertyHandler("23", "left")}
            </tr>
            <tr>
              {this.propertyHandler("13", "right")}
              {this.propertyHandler("24", "left")}
            </tr>
            <tr>
              {this.propertyHandler(null, "right", "chance")}
              {this.propertyHandler(null, "left", "community-chest")}
            </tr>
            <tr>
              {this.propertyHandler("12", "right")}
              {this.propertyHandler("25", "left")}
            </tr>
            <tr>
              {this.propertyHandler("11", "right", "station")}
              {this.propertyHandler("26", "left", "station")}
            </tr>
            <tr>
              {this.propertyHandler("10", "right")}
              {this.propertyHandler(null, "left", "chance")}
            </tr>
            <tr>
              {this.propertyHandler("9", "right")}
              {this.propertyHandler("27", "left")}
            </tr>
            <tr>
              {this.propertyHandler("8", "right")}
              {this.propertyHandler(null, "left", "tax")}
            </tr>
            <tr>
              {this.propertyHandler("7", "right")}
              {this.propertyHandler("28", "left")}
            </tr>
            <tr>
              <Corner type="jail" />
              {this.propertyHandler("6", "bottom")}
              {this.propertyHandler("5", "bottom")}
              {this.propertyHandler(null, "bottom", "chance")}
              {this.propertyHandler("4", "bottom")}
              {this.propertyHandler("3", "bottom", "station")}
              {this.propertyHandler(null, "bottom", "net-worth")}
              {this.propertyHandler("2", "bottom")}
              {this.propertyHandler(null, "bottom", "community-chest")}
              {this.propertyHandler("1", "bottom")}
              <Corner type="start" />
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

GameBoard.propTypes = {
  gameManager: PropTypes.any.isRequired,
};

export default GameBoard;