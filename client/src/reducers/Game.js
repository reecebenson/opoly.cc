import { GAME_CREATE, GAME_JOIN, PLAYER_QUIT } from "../types";

/**
 * @package Game
 *
 * @info Used for Game Handling
 */
const initialState = {};

const gameReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case GAME_CREATE:
      return {
        ...state,
        ...action.game,
      };

    case GAME_JOIN:
      return {
        ...state,
        ...action.game,
      };

    case PLAYER_QUIT:
      return initialState;

    default:
      return state;
  }
};

export default gameReducer;
