import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from "react-router-dom";
import { SemanticToastContainer } from "react-semantic-toasts";
import { LandingPage, Terms } from '../components/Pages';

class OpolyApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // Get our applications className
    let appClass = `opoly-app`;

    return (
      <div className={appClass}>
        <SemanticToastContainer position="top-right" />

        {/* Anonymous Only Routes */}
        <Switch>
          {/* Anyone Routes */}
          <Route path="/" exact component={LandingPage} />
          <Route path="/terms" exact component={Terms} />
          {/*<AnonymousRoute path="/login" exact component={Login} />
            <AnonymousRoute path="/register" exact component={Register} />*/}

          {/* Authenticated Only Routes */}
          {/*<AuthenticatedRoute path="/dashboard" exact component={Dashboard} />
          <AuthenticatedRoute path="/app/new" exact component={CreateApp} />
          <AuthenticatedRoute path="/app/builder" component={Builder} />*/}

          {/* Error Page */}
          {/*<AnonymousRoute component={ErrorPage} />*/}
        </Switch>
      </div>
    );
  }
}

OpolyApp.propTypes = {};

export default OpolyApp;
