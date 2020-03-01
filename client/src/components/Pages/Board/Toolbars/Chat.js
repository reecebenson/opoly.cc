import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        chatMessage: ""
      },
      chats: props.chats
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.chats !== this.props.chats) {
      this.setState({
        chats: this.props.chats.reverse()
      });
    }
  }

  onChange = (e) => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value
      }
    });
  };

  keyPress = (e) => {
    let msg = this.state.data.chatMessage;
    if (e.keyCode !== 13) { return; }
    if (msg === "") { return; }
    if (msg.length > 60) { msg = msg.substring(0, 60) + "..." }

    // Send message
    this.props.chatMessage(msg);
    this.setState({ data: { chatMessage: "" } });
  }

  render() {
    return (
      <div className="chat">
        <h3>Chat</h3>
        <div className="messages">
          <ul>
            {this.state.chats.map((e, i) => (
              <li key={i} title={e.time}><strong>[{e.playerName}]</strong>: {e.message}</li>
            ))}
          </ul>
        </div>
        <div className="user-input">
          <Input
            name="chatMessage"
            value={this.state.data.chatMessage}
            type="text"
            placeholder="Chat..."
            style={{ width: "100%" }}
            onChange={this.onChange}
            onKeyUp={this.keyPress}
          />
        </div>
      </div>
    );
  }
}

Chat.propTypes = {
  chatMessage: PropTypes.func.isRequired,
};

export default Chat;