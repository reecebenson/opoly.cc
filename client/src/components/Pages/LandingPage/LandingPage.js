import React, { Component } from 'react';
import { connect } from "react-redux";
import { Grid, Tab, Image } from 'semantic-ui-react';
import { Welcome, CreateGame, JoinGame } from './snippets';
import Logo from '../../Common/images/logo.png';
import { Footer, LoadingSpinner } from '../../Common';
import { createGame } from '../../../actions/game';

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      loadText: null
    };
  }

  uiCreateGame = (gameData) => {
    this.setState({
      ...this.state,
      loading: true,
      loadText: `Creating game '${gameData.gameName}'...`,
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

  landingTabs = () => ([
    {
      menuItem: 'Welcome',
      render: () => <Welcome />,
    },
    {
      menuItem: 'Create a game',
      render: () => <CreateGame uiCreateGame={this.uiCreateGame} />,
    },
    {
      menuItem: 'Join an existing game',
      render: () => <JoinGame />,
    }
  ]);

  render() {
    const { loading, loadText } = this.state;

    return (
      <div>
        {loading && <LoadingSpinner text={loadText} />}
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 650 }}>
            <div style={{ textAlign: "center" }}>
              <Image src={Logo} style={{ display: "inline-block", marginBottom: "1em" }} />
            </div>
            <Tab menu={{ pointing: true }} panes={this.landingTabs()} />
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
)(LandingPage);
