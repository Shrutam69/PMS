import api from './api';
import { EMPLOYEE_URL } from '../utils/constatnts';

export const ACTION_TYPES = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  FETCH_ALL: 'FETCH_ALL',
};

//Get
export const fetchAll = () => (dispatch) => {
  api
    .actions(EMPLOYEE_URL)
    .fetchAll()
    .then((response) => {
      // console.log('employees', response);
      dispatch({
        type: ACTION_TYPES.FETCH_ALL,
        payload: response.data,
      });
    })
    .catch((error) => console.log(error));
};

//Create
export const create = (data, onSuccess) => (dispatch) => {
  api
    .actions(EMPLOYEE_URL)
    .create(data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.CREATE,
        payload: res.data,
      });
      onSuccess();
    })
    .catch((error) => console.log(error));
};

//Update
export const update = (id, data) => (dispatch) => {
  api
    .actions(EMPLOYEE_URL)
    .update(id, data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.UPDATE,
        payload: { id, ...data },
      });
    })
    .catch((error) => console.log(error));
};

//Delete
export const Delete = (id, onSuccess) => (dispatch) => {
  api
    .actions(EMPLOYEE_URL)
    .delete(id)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.DELETE,
        payload: id,
      });
      onSuccess();
    })
    .catch((error) => console.log(error));
};
