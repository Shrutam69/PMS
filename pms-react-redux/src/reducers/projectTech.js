import { ACTION_TYPES } from '../actions/projectTech';
const initialState = {
  list: [],
};

export const projectTechReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_ALL_TECHWISE_PROJECT_COUNT:
      return {
        ...state,
        list: [...action.payload],
      };
    default:
      return state;
  }
};
