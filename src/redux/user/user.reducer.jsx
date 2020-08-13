// Reducer gets two properties:
// Last state and action - type
// payload
import { UserActionTypes } from './user.types';

const INITIAL_STATE = { // similar to set state in constructor
  currentUser: null
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) { // action type = reducer type
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state, // every other state needs to be spread, because every reducer gets called for any action
        currentUser: action.payload
      }
    default:
      return state; // important to have a default state, because every reducer gets called for any action
  }
}

export default userReducer;
