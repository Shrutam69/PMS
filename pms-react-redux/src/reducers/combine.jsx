import { combineReducers } from 'redux';
import { employeeReducer } from '../reducers/employee';
import { projectReducer } from '../reducers/project';
import { skillsReducer } from '../reducers/skills';
import { assignProjectReducer } from '../reducers/assignProject';
import { employeeSkillReducer } from '../reducers/employeeSkill';

export const reducers = combineReducers({
  employeeReducer,
  projectReducer,
  skillsReducer,
  assignProjectReducer,
  employeeSkillReducer,
});
