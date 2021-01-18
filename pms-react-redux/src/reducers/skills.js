import { ACTION_TYPES } from '../actions/skills';
const initialState = {
  list: [],
};

export const skillsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_ALL_SKILLS:
      return {
        ...state,
        list: [...action.payload],
      };
    case ACTION_TYPES.CREATE_SKILL:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case ACTION_TYPES.UPDATE_SKILL:
      return {
        ...state,
        list: state.list.map((x) =>
          x.Id === action.payload.id ? action.payload : x
        ),
      };
    case ACTION_TYPES.DELETE_SKILL:
      return {
        ...state,
        list: state.list.filter((x) => x.Id !== action.payload),
      };
    default:
      return state;
  }
};
