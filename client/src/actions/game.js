import API from "../api";
import { GAME_CREATE, PLAYER_CREATE } from "../types";

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
      dispatch(redCreateGame(data.game));
      setTimeout(() => dispatch(redCreatePlayer(data.player)), 500);
    })
    .catch(err => console.warn("[API]: Error when creating game:", err));

