import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Form, Grid, Tab, Image, Button, Icon } from 'semantic-ui-react';
import Logo from '../../Common/images/logo.png';
import { Footer, LoadingSpinner } from '../../Common';
import { joinGameAsPlayer } from '../../../actions/game';
import JoinGameForm from './JoinGameForm';

class JoinGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        playerName: "test", //"",
        playerPass: "test", //"",
      },
      errors: {},
      loading: false,
      loadText: null,
      getPlayerDetails: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.player !== this.props.player) {
      if (prevProps.player.request !== this.props.player.request) {
        this.setState({
          getPlayerDetails: this.props.player.request || false
        });
      }
    }
  }

  validate = (data) => {
    const errors = {};

    if (!data.playerName) {
      errors.playerName = "Please enter a nickname.";
    }

    if (!data.playerPass) {
      errors.playerPass = "Please enter a password.";
    }

    return errors;
  };

  onChange = (e) => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value
      }
    });
  };

  joinGame = () => {
    // Validate form
    const errors = this.validate(this.state.data);
    this.setState({ errors });

    // Check if we made no errors
    if (Object.keys(errors).length === 0) {
      return this.props.joinGameAsPlayer(this.props.game, this.state.data, this.props.history);
    }
  };

  /* Default Tabs */
  landingTabs = () => ([
    {
      menuItem: 'Welcome',
      render: () => this.props.history.push("/"),
    },
    {
      menuItem: 'Create a game',
      render: () => this.props.history.push("/game/create"),
    },
    {
      menuItem: 'Join an existing game',
      render: () => <JoinGameForm />,
    }
  ]);

  /* Existing Game Tabs */
  hasGameTabs = () => ([
    {
      menuItem: 'Welcome',
      render: () => this.props.history.push("/"),
    },
    {
      menuItem: 'My Game',
      render: () => this.props.history.push("/game/lobby"),
    }
  ]);

  render() {
    const { data, errors, loading, loadText, getPlayerDetails } = this.state;

    // Check if user has a game
    let hasGame = (Object.keys(this.props.game).length > 0);
    return (
      <div>
        {loading && <LoadingSpinner text={loadText} />}
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 650 }}>
            <div style={{ textAlign: "center" }}>
              <Image src={Logo} style={{ display: "inline-block", marginBottom: "1em" }} />
            </div>
            {!getPlayerDetails && (
              <Tab
                menu={{ pointing: true }}
                panes={!hasGame ? this.landingTabs() : this.hasGameTabs()}
                defaultActiveIndex={2}
              />
            )}
            {getPlayerDetails && (<div>
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
              <Button positive style={{ width: "100%" }} onClick={this.joinGame}>
                Join Game as {data.playerName}
                <Icon name='chevron right' />
              </Button>
            </div>)}
            <Footer />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  game: state.game,
  player: state.player,
});

export default connect(
  mapStateToProps,
  { joinGameAsPlayer }
)(JoinGame);
