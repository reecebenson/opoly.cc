import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Grid, Tab, Image } from 'semantic-ui-react';
import Logo from '../../Common/images/logo.png';
import { Footer, LoadingSpinner } from '../../Common';
import Welcome from './Welcome';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loadText: null,
      creatingGame: false
    };
  }

  /* Default Tabs */
  landingTabs = () => ([
    {
      menuItem: 'Welcome',
      render: () => <Welcome />,
    },
    {
      menuItem: 'Create a game',
      render: () => this.props.history.push("/game/create"),
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
      render: () => <Welcome />,
    },
    {
      menuItem: 'My Game',
      render: () => this.props.history.push("/game/lobby"),
    }
  ]);

  render() {
    const { type, loading, loadText } = this.state;

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
              defaultActiveIndex={0}
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
  null
)(LandingPage);
