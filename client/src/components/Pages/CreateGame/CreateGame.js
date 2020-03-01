import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Grid, Tab, Image } from 'semantic-ui-react';
import Logo from '../../Common/images/logo.png';
import { Footer, LoadingSpinner } from '../../Common';
import { createGame } from '../../../actions/game';
import CreateGameForm from './CreateGameForm';

class CreateGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loadText: null,
      creatingGame: false
    };
  }

  uiCreateGame = (gameData) => {
    if (Object.keys(this.props.game).length > 0) {
      return;
    }

    this.setState({
      ...this.state,
      loading: true,
      loadText: `Creating game '${gameData.gameName}'...`,
      creatingGame: true,
    }, () => this.props.createGame(gameData));
  }

  componentDidUpdate(prevProps, prevState) {
    if (Object.keys(prevProps.game).length === 0 && Object.keys(this.props.game).length > 0) {
      this.setState({
        loading: true,
        loadText: `Game created, creating player...`
      });
    }

    if (Object.keys(prevProps.player).length === 0 && Object.keys(this.props.player).length > 0) {
      this.setState({
        loading: true,
        loadText: `Player created. Creating waiting lobby...`
      });
      setTimeout(() => this.props.history.push("/game/lobby"), 750);
    }
  }

  /* Default Tabs */
  landingTabs = () => ([
    {
      menuItem: 'Welcome',
      render: () => this.props.history.push("/"),
    },
    {
      menuItem: 'Create a game',
      render: () => <CreateGameForm uiCreateGame={this.uiCreateGame} />,
    },
    {
      menuItem: 'Join an existing game',
      render: () => this.props.history.push("/game/join"),
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
    const { loading, loadText } = this.state;

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
            <Tab
              menu={{ pointing: true }}
              panes={!hasGame ? this.landingTabs() : this.hasGameTabs()}
              defaultActiveIndex={1}
            />
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
  { createGame }
)(CreateGame);
