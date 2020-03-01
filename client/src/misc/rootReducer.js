import { combineReducers } from "redux";
import { game, player } from '../reducers';

export default combineReducers({
  game,
  player
});
