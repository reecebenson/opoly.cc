import React, { Component } from 'react';
import Logo from '../../Common/images/logo.png';
import PropTypes from 'prop-types';

class Middle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameManager: props.gameManager,
      hovering: props.hovering
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.hovering !== this.props.hovering) {
      this.setState({
        hovering: this.props.hovering
      });
    }
  }

  render() {
    const { hovering } = this.state;
    return (
      <td className="board-middle" rowSpan="9" colSpan="9">
        {hovering !== null && hovering}
        {hovering === null && <img src={Logo} />}
      </td>
    );
  }
}

Middle.propTypes = {

};

export default Middle;