import api from './api';
import { PROJECT_TECH_URL } from '../utils/constatnts';

export const ACTION_TYPES = {
  FETCH_ALL_TECHWISE_PROJECT_COUNT: ' FETCH_ALL_TECHWISE_PROJECT_COUNT',
};

//Get
export const fetchAll = () => (dispatch) => {
  api
    .actions(PROJECT_TECH_URL)
    .fetchAll()
    .then((response) => {
      // console.log(response.data);
      dispatch({
        type: ACTION_TYPES.FETCH_ALL_TECHWISE_PROJECT_COUNT,
        payload: response.data,
      });
    })
    .catch((error) => console.log(error));
};
