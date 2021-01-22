import { ACTION_TYPES } from '../actions/employeeSkill';
const initialState = {
  list: [],
};

export const employeeSkillReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_ALL_EMPLOYEEWISE_SKILL_COUNT:
      return {
        ...state,
        list: [...action.payload],
      };
    default:
      return state;
  }
};
