import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Grid, Tab, Image, Message, Button, Icon, Table } from 'semantic-ui-react';
import { Welcome } from './snippets';
import Logo from '../../Common/images/logo.png';

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  tabs = () => ([
    {
      menuItem: 'Welcome',
      render: () => <Welcome />,
    },
    {
      menuItem: 'Create a game',
      render: () => (
        <div className="tab">
          <Tab.Pane attached={false}>
            <Form size='large'>
              <h3 className="underline">Game</h3>
              <Form.Field>
                <label>Name</label>
                <small>The name of the game.</small>
                <Form.Input fluid icon='game' iconPosition='left' />
              </Form.Field>
              <Form.Field>
                <label>Key</label>
                <small>A secret passphrase for friends to use to connect to your game.</small>
                <Form.Input fluid icon='key' iconPosition='left' type='password' />
              </Form.Field>
            </Form>
          </Tab.Pane>
          <Tab.Pane attached={false}>
            <Form size='large'>
              <h3 className="underline">Player</h3>
              <Form.Field>
                <label>Name</label>
                <small>A nickname to identify yourself in the game.</small>
                <Form.Input fluid icon='user' iconPosition='left' />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <small>This password is used incase you need to reconnect to the game.</small>
                <Form.Input fluid icon='key' iconPosition='left' type='password' />
              </Form.Field>
            </Form>
          </Tab.Pane>
          <Button positive style={{ width: "100%" }}>
            Create Game
            <Icon name='chevron right' />
          </Button>
        </div>
      ),
    },
    {
      menuItem: 'Join an existing game',
      render: () => (
        <div>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Players</Table.HeaderCell>
                <Table.HeaderCell>Public</Table.HeaderCell>
                <Table.HeaderCell width={1}></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Example Game Name #1</Table.Cell>
                <Table.Cell>0 / 16</Table.Cell>
                <Table.Cell negative>No</Table.Cell>
                <Table.Cell><Icon name='x circle' /></Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Example Game Name #2</Table.Cell>
                <Table.Cell>3 / 16</Table.Cell>
                <Table.Cell positive>Yes</Table.Cell>
                <Table.Cell><Icon name='chevron circle right' /></Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Example Game Name #3</Table.Cell>
                <Table.Cell>0 / 16</Table.Cell>
                <Table.Cell negative>No</Table.Cell>
                <Table.Cell><Icon name='chevron circle right' /></Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Example Game Name #4</Table.Cell>
                <Table.Cell>0 / 16</Table.Cell>
                <Table.Cell negative>No</Table.Cell>
                <Table.Cell><Icon name='x circle' /></Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Button primary style={{ width: "100%" }}>
            <Icon name='refresh' />
            Refresh List
          </Button>
        </div>
      ),
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
          <Message>
            Opoly, <a href='//reece.biz'>rbDev</a> &copy; {+new Date().getFullYear()}
            <br /><small><Link to='/terms'>Terms and Conditions</Link></small>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default LandingPage;