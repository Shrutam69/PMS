import api from './api';
import { EMPLOYEE_SKILL_URL } from '../utils/constatnts';

export const ACTION_TYPES = {
  FETCH_ALL_EMPLOYEEWISE_SKILL_COUNT: ' FETCH_ALL_EMPLOYEEWISE_SKILL_COUNT',
};

//Get
export const fetchAll = () => (dispatch) => {
  api
    .actions(EMPLOYEE_SKILL_URL)
    .fetchAll()
    .then((response) => {
      // console.log(response.data);
      dispatch({
        type: ACTION_TYPES.FETCH_ALL_EMPLOYEEWISE_SKILL_COUNT,
        payload: response.data,
      });
    })
    .catch((error) => console.log(error));
};
