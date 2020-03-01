import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {

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
    if (e.keyCode !== 13) { return; }
    this.props.chatMessage(this.state.data.chatMessage);
    this.setState({ data: { chatMessage: "" } });
  }

  render() {
    return (
      <div class="chat">
        <h3>Chat</h3>
        <div class="messages">
          <ul>
            {this.state.chats.map((e) => (
              <li title={e.time}><strong>[{e.playerName}]</strong>: {e.message}</li>
            ))}
          </ul>
        </div>
        <div class="user-input">
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