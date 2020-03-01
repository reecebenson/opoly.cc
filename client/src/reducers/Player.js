import { PLAYER_CREATE, PLAYER_QUIT, GAME_JOIN } from "../types";

/**
 * @package Player
 *
 * @info Used for Player Handling
 */
const initialState = {};

const playerReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case PLAYER_CREATE:
      return {
        ...state,
        ...action.player
      };

    case GAME_JOIN:
      return {
        ...state,
        request: true
      };

    case PLAYER_QUIT:
      return initialState;

    default:
      return state;
  }
};

export default playerReducer;
