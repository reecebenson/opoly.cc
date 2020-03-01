import API from "../api";
import { redCreateGame, redCreatePlayer } from './game';
import { PLAYER_REAUTH, PLAYER_END_SESSION } from "../types";

/**
 * playerLoggedIn
 *
 * @info Action for a user login submisson
 * @param {object} player
 */
export const playerLoggedIn = player => ({
  type: PLAYER_REAUTH,
  player
});

/**
 * playerLoggedOut
 *
 * @info Action for a player logout submisson
 * @param {object} player
 */
export const playerLoggedOut = () => ({
  type: PLAYER_END_SESSION
});

/**
 * reauthPlayer
 *
 * @info Calls the API and attempts to reauth a player
 * @param {object} credentials: { gameId: xxx, player: { name: xxx, pass: xxx } }
 */
export const reauthPlayer = credentials => dispatch =>
  new API("/api/player/auth")
    .post(credentials)
    .then(res => {
      const { data } = res;

      // Check authentication
      if (data.status === "FAIL") {
        throw new Error({ response: { data: { message: data.message } } });
      }

      // Update our localStorage
      localStorage.setItem("game", JSON.stringify(data.data.game));
      localStorage.setItem("player", JSON.stringify(data.data.player));

      // Update our props
      dispatch(playerLoggedIn(data.data.player));
      dispatch(redCreateGame(data.data.game));
      dispatch(redCreatePlayer(data.data.player));
    })
    .catch(err => {
      localStorage.removeItem("game");
      localStorage.removeItem("player");
    });
