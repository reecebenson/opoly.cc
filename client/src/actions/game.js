import API from "../api";
import { GAME_CREATE, GAME_JOIN, PLAYER_CREATE, PLAYER_QUIT } from "../types";

/**
 * Reducer Types
 */
export const redCreateGame = details => ({
  type: GAME_CREATE,
  game: details
});

export const redJoinGame = details => ({
  type: GAME_JOIN,
  game: details
});

export const redCreatePlayer = details => ({
  type: PLAYER_CREATE,
  player: details
});

export const redLeaveGame = () => ({
  type: PLAYER_QUIT
});

export const startGame = (game, player) => dispatch =>
  new API("/api/game/start")
    .post({
      game: game,
      player: player
    });

export const leaveGame = (gameId, player) => dispatch => {
  // Cleanup localStorage
  localStorage.removeItem("game");
  localStorage.removeItem("player");

  // Update API
  new API("/api/game/leave")
    .post({
      gameId: gameId,
      player: player
    })

  // Dispatch to update props
  dispatch(redLeaveGame());
}

export const kickPlayer = (game, player, ws) => dispatch =>
  new API("/api/game/kick")
    .post({
      gameId: game.id,
      key: game.hostSecretKey,
      playerId: player.id
    })
    .then(res => {
      if (!ws) { return; }
      ws.send(JSON.stringify({
        type: "kick",
        game: game,
        player: player
      }));
    })
    .catch(err => console.warn(`[API]: Unable to kick player.`, err));

export const forceEndGame = (gameId, ownerSecretKey) => dispatch =>
  new API("/api/game/force-end")
    .post({
      gameId: gameId,
      key: ownerSecretKey
    })
    .catch(err => console.warn(`[API]: Unable to end game.`));

export const getJoinableGames = () =>
  new API("/api/game/joinables").post();

export const verifyGamePassword = (gameId, password) => dispatch =>
  new API("/api/game/password")
    .post({ gameId, password })
    .then(res => dispatch(redJoinGame(res.data.game)));

export const getGameStats = id => dispatch =>
  new API("/api/game/stats")
    .post({ gameId: id });

/**
 * createGame
 *
 * @info Creates a game
 */
export const createGame = game => dispatch =>
  new API("/api/game/create")
    .post(game)
    .then(res => {
      const { data } = res.data;

      // Update our localStorage
      localStorage.setItem("game", JSON.stringify(data.game));
      localStorage.setItem("player", JSON.stringify(data.player));

      // Dispatch
      dispatch(redCreateGame(data.game));
      setTimeout(() => dispatch(redCreatePlayer(data.player)), 500);
    })
    .catch(err => console.warn("[API]: Error when creating game:", err));

/**
 * joinGame
 * 
 * @info Joins an existing game
 */
export const joinGameAsPlayer = (game, player, history) => dispatch =>
  new API("/api/game/connect")
    .post({
      gameId: game.id,
      player: {
        name: player.playerName,
        password: player.playerPass
      }
    })
    .then(res => {
      const { data } = res.data;

      // Update our localStorage
      localStorage.setItem("game", JSON.stringify(data.game));
      localStorage.setItem("player", JSON.stringify(data.player));

      // Dispatch
      dispatch(redCreatePlayer(data.player));
      dispatch(redJoinGame(data.game));

      // Direct to lobby
      history.push("/game/lobby");
    })
    .catch(err => console.warn("[API]: Error when joining game:", err));
