import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Tab, Button, Icon } from 'semantic-ui-react';

class CreateGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        gameName: "test", //"",
        gameKey: "test", //"",
        playerName: "test", //"",
        playerPass: "test", //"",
      },
      errors: {}
    };
  }

  onChange = (e) => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value
      }
    });
  };

  validate = (data) => {
    const errors = {};

    if (!data.gameName) {
      errors.gameName = "Please enter a game name.";
    }

    if (!data.gameKey) {
      errors.gameKey = "Please enter a game key.";
    }

    if (!data.playerName) {
      errors.playerName = "Please enter a nickname.";
    }

    if (!data.playerPass) {
      errors.playerPass = "Please enter a password.";
    }

    return errors;
  };

  createGame = (e) => {
    e.preventDefault();

    // Validate form
    const errors = this.validate(this.state.data);
    this.setState({ errors });

    // Check if we made no errors
    if (Object.keys(errors).length === 0) {
      return this.props.uiCreateGame(this.state.data);
    }
  };

  render() {
    const { data, errors } = this.state;

    return (
      <div className="tab">
        <Tab.Pane attached={false}>
          <Form size='large'>
            <h3 className="underline">Game</h3>
            <Form.Field>
              <label>Name</label>
              {!errors.gameName && (<small>The name of the game.</small>)}
              {errors.gameName && (<small className='error'>{errors.gameName}</small>)}
              <Form.Input name='gameName' fluid icon='game' iconPosition='left' placeholder='The best game ever' value={data.gameName} onChange={this.onChange} />
            </Form.Field>
            <Form.Field>
              <label>Key</label>
              {!errors.gameKey && (<small>A secret passphrase for friends to use to connect to your game.</small>)}
              {errors.gameKey && (<small className='error'>{errors.gameKey}</small>)}
              <Form.Input name='gameKey' fluid icon='key' iconPosition='left' type='password' placeholder='Game password' value={data.gameKey} onChange={this.onChange} />
            </Form.Field>
          </Form>
        </Tab.Pane>
        <Tab.Pane attached={false}>
          <Form size='large'>
            <h3 className="underline">Player</h3>
            <Form.Field>
              <label>Name</label>
              {!errors.playerName && (<small>A nickname to identify yourself in the game.</small>)}
              {errors.playerName && (<small className='error'>{errors.playerName}</small>)}
              <Form.Input name='playerName' fluid icon='user' iconPosition='left' placeholder='BestPlayerEver123' value={data.playerName} onChange={this.onChange} />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              {!errors.playerPass && (<small>This password is used incase you need to reconnect to the game.</small>)}
              {errors.playerPass && (<small className='error'>{errors.playerPass}</small>)}
              <Form.Input name='playerPass' fluid icon='key' iconPosition='left' type='password' placeholder='Player password' value={data.playerPass} onChange={this.onChange} />
            </Form.Field>
          </Form>
        </Tab.Pane>
        <Button positive style={{ width: "100%" }} onClick={this.createGame}>
          Create Game
          <Icon name='chevron right' />
        </Button>
      </div>
    );
  }
}

CreateGame.propTypes = {
  uiCreateGame: PropTypes.func.isRequired,
};

export default CreateGame;
