import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SystemLogs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logs: props.logs
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.logs !== this.props.logs) {
      this.setState({
        logs: this.props.logs.reverse()
      });
    }
  }

  render() {
    return (
      <div class="system-logs">
        <h3>System Logs</h3>
        <ul>
          {this.state.logs.map((e) => (
            <li><strong>[{e.time}]</strong>: {e.message}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default SystemLogs;