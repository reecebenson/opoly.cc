import React, { Component } from 'react';
import { Grid, Tab, Image, Button, Icon } from 'semantic-ui-react';
import Logo from '../../Common/images/logo.png';
import { Footer } from '../../Common';

class Terms extends Component {

  tabs = () => ([
    {
      menuItem: 'Terms and Conditions',
      render: () => (
        <div>
          <Tab.Pane>
            <p>Hereafter, "The Website" refers to officers, directors, owners, agents, employees,
            associates and any other affiliates of this website, *.opoly.cc, and its content.
            "User" refers to any person or system that directly or indirectly requests information
            from and/or transmits information to The Website.</p>
            <p>The Website is provided as is without warranty of any kind, either express or implied,
            including but not limited to, availability, game play, game mechanics and scoring accuracy.</p>
            <p>The Website reserves the right to deny access to any User at any time and for any reason.</p>
            <p>The Website further does not warrant the accuracy or completeness of the information,
            text, graphics, links or other items contained within the website.</p>
            <p>The Website shall not be liable for any special, indirect, incidental, or consequential damages,
            including without limitation, lost revenues or lost profits, which may result from the use of
            these materials. The information on this server is subject to change without notice and does
            not represent a commitment on the part of The Website in the future.</p>
            <p>The Website reserves the right to modify these terms and conditions at any time and for any
            reason, with or without explicit notification to any User. Continued use of The Website
            after any such changes shall constitute your consent to such changes. It is your
            responsibility to check this page for the current terms.</p>
          </Tab.Pane>
          <Button positive style={{ width: "100%" }} onClick={() => this.props.history.goBack()}>
            Go back to Opoly
            <Icon name='chevron right' />
          </Button>
        </div>
      ),
    },
    {
      menuItem: 'Back to site',
      render: () => this.props.history.push('/')
    }
  ]);

  render() {
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 650 }}>
          <div style={{ textAlign: "center" }}>
            <Image src={Logo} style={{ display: "inline-block", marginBottom: "1em" }} />
          </div>
          <Tab menu={{ pointing: true }} panes={this.tabs()} />
          <Footer />
        </Grid.Column>
      </Grid>
    );
  }
}

export default Terms;