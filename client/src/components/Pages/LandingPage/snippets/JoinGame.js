import React, { Component } from 'react';
import { Button, Icon, Table } from 'semantic-ui-react';

class JoinGame extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
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
    );
  }
}

JoinGame.propTypes = {

};

export default JoinGame;
