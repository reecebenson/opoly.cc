import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './scss/Corner.scss';

class Corner extends Component {
  constructor(props) {
    super(props);

    // @todo link to GameManager
    this.state = {
      category: props.type,
      houses: 0
    }
  }

  componentDidMount() {
    console.log("Corner mounted");
  }

  render() {
    return (
      <div className="item corner">
        <h3>{this.state.category}</h3>
      </div>
    );
  }
}

Corner.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Corner;