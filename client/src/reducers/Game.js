import { GAME_CREATE } from "../types";

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

    default:
      return state;
  }
};

export default gameReducer;
