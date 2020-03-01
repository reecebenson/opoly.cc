import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";

const AuthenticatedRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
            <Redirect to="/" />
          )
      }
    />
  );

AuthenticatedRoute.propTypes = {
  component: PropTypes.any.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: (state.player && state.player.name && state.player.password && state.game && state.game.name && state.game.key)
});

export default withRouter(connect(mapStateToProps)(AuthenticatedRoute));
