import { ACTION_TYPES } from '../actions/project';
const initialState = {
  list: [],
};

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_ALL_PROJECT:
      return {
        ...state,
        list: [...action.payload],
      };
    case ACTION_TYPES.CREATE_PROJECT:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case ACTION_TYPES.UPDATE_PROJECT:
      return {
        ...state,
        list: state.list.map((x) =>
          x.Id === action.payload.id ? action.payload : x
        ),
      };
    case ACTION_TYPES.DELETE_PROJECT:
      return {
        ...state,
        list: state.list.filter((x) => x.Id !== action.payload),
      };

    default:
      return state;
  }
};
