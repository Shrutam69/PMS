import { combineReducers } from 'redux';
import { employeeReducer } from '../reducers/employee';
import { projectReducer } from '../reducers/project';

export const reducers = combineReducers({
  employeeReducer,
  projectReducer,
});
