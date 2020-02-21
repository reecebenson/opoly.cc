import React, { Component } from 'react';
import { Grid, Tab, Image } from 'semantic-ui-react';
import { Welcome, CreateGame, JoinGame } from './snippets';
import Logo from '../../Common/images/logo.png';
import { Footer, LoadingSpinner } from '../../Common';

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      loadText: null
    };
  }

  createGame = ({ gameName, gameKey, playerName, playerPass }) => {
    this.setState({
      ...this.state,
      loading: true,
      loadText: `Creating game '${gameName}'...`,
    }, () => {
      console.log("createGame");
      setTimeout(() => this.setState({ loadText: "Initialising lobby..." }), 3000);
      setTimeout(() => this.setState({ loadText: null, loading: false }), 6500);
    });
  }

  landingTabs = () => ([
    {
      menuItem: 'Welcome',
      render: () => <Welcome />,
    },
    {
      menuItem: 'Create a game',
      render: () => <CreateGame createGame={this.createGame} />,
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

export default LandingPage;