import { PLAYER_CREATE, PLAYER_QUIT } from "../types";

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

    case PLAYER_QUIT:
      return initialState;

    default:
      return state;
  }
};

export default playerReducer;
