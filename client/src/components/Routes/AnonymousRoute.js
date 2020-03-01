import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";

const AnonymousRoute = ({ isAuthenticated, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated ? <Component {...props} /> : <Redirect to="/game/lobby" />
      }
    />);
};

AnonymousRoute.propTypes = {
  component: PropTypes.any.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: ((state.player && Object.keys(state.player).length > 0) && (state.game && Object.keys(state.game).length > 0))
});

export default withRouter(connect(mapStateToProps)(AnonymousRoute));
