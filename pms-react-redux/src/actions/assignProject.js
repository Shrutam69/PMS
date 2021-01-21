import api from './api';
import { ASSIGNMENT_URL } from '../utils/constatnts';

export const ACTION_TYPES = {
  CREATE_PROJECT_ASSIGN: 'CREATE_PROJECT_ASSIGN',
  UPDATE_PROJECT_ASSIGN: 'UPDATE_PROJECT_ASSIGN',
  DELETE_PROJECT_ASSIGN: 'DELETE_PROJECT_ASSIGN',
  FETCH_ALL_PROJECT_ASSIGN: 'FETCH_ALL_PROJECT_ASSIGN',
};

//Get
export const fetchAll = () => (dispatch) => {
  api
    .actions(ASSIGNMENT_URL)
    .fetchAll()
    .then((response) => {
      // console.log(response.data);
      dispatch({
        type: ACTION_TYPES.FETCH_ALL_PROJECT_ASSIGN,
        payload: response.data,
      });
    })
    .catch((error) => console.log(error));
};

//Create
export const create = (data, onSuccess) => (dispatch) => {
  api
    .actions(ASSIGNMENT_URL)
    .create(data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.CREATE_PROJECT_ASSIGN,
        payload: res.data,
      });
      onSuccess();
    })
    .catch((error) => console.log(error));
};

//Update
export const update = (id, data, onSuccess) => (dispatch) => {
  api
    .actions(ASSIGNMENT_URL)
    .update(id, data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.UPDATE_PROJECT_ASSIGN,
        payload: { id, ...data },
      });
      onSuccess();
    })
    .catch((error) => console.log(error));
};

//Delete
export const Delete = (id, onSuccess) => (dispatch) => {
  api
    .actions(ASSIGNMENT_URL)
    .delete(id)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.DELETE_PROJECT_ASSIGN,
        payload: id,
      });
      onSuccess();
    })
    .catch((error) => console.log(error));
};
