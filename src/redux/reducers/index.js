import { combineReducers } from "redux";
import auth from "./authReducer";
import message from "./messageReducer";
import test from "./testReducer";
import map from "./mapReducer";
import support from "./supportReducer";


export default combineReducers({
  auth,
  message,
  test,
  map,
  support
});
