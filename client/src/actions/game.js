import API from "../api";
import { GAME_CREATE, PLAYER_CREATE, PLAYER_QUIT } from "../types";

/**
 * Reducer Types
 */
export const redCreateGame = details => ({
  type: GAME_CREATE,
  game: details
});

export const redCreatePlayer = details => ({
  type: PLAYER_CREATE,
  player: details
});

export const redLeaveGame = () => ({
  type: PLAYER_QUIT
});

export const leaveGame = () => dispatch => {
  // Cleanup localStorage
  localStorage.removeItem("game");
  localStorage.removeItem("player");

  // Dispatch to update props
  dispatch(redLeaveGame());
}

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

