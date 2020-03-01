import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Icon, Table, Tab, Modal, Header, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { getJoinableGames, verifyGamePassword } from '../../../actions/game';
import './scss/JoinGame.scss';

class JoinGameForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      games: [],

      /* Join Games */
      joiningGame: false,
      joinGameAttempt: false,
      passwordWrong: false,
      gamePassword: "",
    };
  }

  componentDidMount() {
    this.getGames();
  }

  getGames = () => {
    this.setState({ loading: true }, () => {
      setTimeout(() => {
        getJoinableGames()
          .then(res => this.setState({ games: res.data.games }))
          .catch(err => console.warn(`Unable to get games`))
          .finally(() => this.setState({ loading: false }))
      }, 300);
    });
  };

  attemptJoinGame = () => {
    this.setState({
      ...this.state,
      joinGameAttempt: true
    }, async () => {
      const { gamePassword, joinGameId } = this.state;
      this.props.verifyGamePassword(joinGameId, gamePassword)
        .catch(err => this.setState({ passwordWrong: true }, () => {
          setTimeout(() => { this.setState({ passwordWrong: false }); }, 5000);
        }))
        .finally(() => this.setState({ joinGameAttempt: false }));
    });
  };

  gamePasswordChange = (e) =>
    this.setState({ ...this.state, gamePassword: e.target.value });

  joinGame = (gameId) =>
    this.setState({ joiningGame: true, joinGameId: gameId, gamePassword: "", passwordWrong: false, joinGameAttempt: false });

  cancelJoinGame = () =>
    this.setState({ joiningGame: false, joinData: null });

  render() {
    const {
      loading,
      games,
      joiningGame,
      joinGameAttempt,
      gamePassword,
      passwordWrong
    } = this.state;
    return (
      <div>
        {!loading && games.length > 0 && (
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
              {games.map((g, i) => (
                <Table.Row key={i} onClick={() => this.joinGame(g.id)} className="game-row">
                  <Table.Cell>{g.name}</Table.Cell>
                  <Table.Cell>{g.players}</Table.Cell>
                  <Table.Cell {...(g.public ? { positive: true } : { negative: true })}>
                    {g.public ? "Yes" : "No"}
                  </Table.Cell>
                  <Table.Cell><Icon name='chevron circle right' /></Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
        {!loading && games.length === 0 && (
          <Tab.Pane>
            Unable to find any games. Why not <Link to="/game/create">create one?</Link>
          </Tab.Pane>
        )}
        {joiningGame && (
          <Modal open basic size='small'>
            <Header icon='game' content='Join Game?' />
            <Modal.Content>
              <p>You must enter the game password to be able to join this game server.</p>
              <Form.Group>
                {passwordWrong && <p className="red">Invalid game password.</p>}
                <Form.Input type="password" placeholder="Game Password" id={passwordWrong ? "red" : ""} onChange={this.gamePasswordChange} value={gamePassword} />
              </Form.Group>
            </Modal.Content>
            <Modal.Actions>
              <Button basic color='red' inverted onClick={this.cancelJoinGame} disabled={joinGameAttempt}>
                <Icon name='remove' /> Cancel
              </Button>
              <Button color='green' inverted onClick={this.attemptJoinGame} loading={joinGameAttempt}>
                <Icon name='checkmark' /> Join
              </Button>
            </Modal.Actions>
          </Modal>
        )}
        <Button primary style={{ width: "100%" }} onClick={this.getGames} loading={loading}>
          <Icon name='refresh' />
          Refresh List
        </Button>
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
  { verifyGamePassword }
)(JoinGameForm);
