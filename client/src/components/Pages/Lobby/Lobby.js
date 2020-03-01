import React, { Component } from 'react';
import { Grid, Tab, Image } from 'semantic-ui-react';
import { Footer, LoadingSpinner } from '../../Common';
import Logo from '../../Common/images/logo.png';
import PropTypes from 'prop-types';

class Lobby extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      loadText: null
    };
  }

  componentDidMount() {

    console.log(this.props);
  }


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
            <Footer />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

Lobby.propTypes = {

};

export default Lobby;