import { ACTION_TYPES } from '../actions/assignProject';
const initialState = {
  list: [],
};

export const assignProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_ALL_PROJECT_ASSIGN:
      return {
        ...state,
        list: [...action.payload],
      };
    case ACTION_TYPES.CREATE_PROJECT_ASSIGN:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case ACTION_TYPES.UPDATE_PROJECT_ASSIGN:
      return {
        ...state,
        list: state.list.map((x) =>
          x.Id === action.payload.id ? action.payload : x
        ),
      };
    case ACTION_TYPES.DELETE_PROJECT_ASSIGN:
      return {
        ...state,
        list: state.list.filter((x) => x.Id !== action.payload),
      };

    default:
      return state;
  }
};
