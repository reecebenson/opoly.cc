import { PLAYER_CREATE } from "../types";

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

    default:
      return state;
  }
};

export default playerReducer;
