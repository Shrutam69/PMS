import { combineReducers } from 'redux';
import { employeeReducer } from '../reducers/employee';
import { projectReducer } from '../reducers/project';
import { skillsReducer } from '../reducers/skills';

export const reducers = combineReducers({
  employeeReducer,
  projectReducer,
  skillsReducer,
});
