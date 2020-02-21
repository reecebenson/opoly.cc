import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Dimmer, Loader } from "semantic-ui-react";

const LoadingSpinner = ({ text, children = null }) => (
  <Dimmer active style={{ zIndex: "99999999" }}>
    <Loader>{text}</Loader>
    {children}
  </Dimmer>
);

LoadingSpinner.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.any
};

export default connect()(LoadingSpinner);
