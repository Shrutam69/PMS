import api from './api';
import { PROJECT_URL } from '../utils/constatnts';

export const ACTION_TYPES = {
  CREATE_PROJECT: 'CREATE_PROJECT',
  UPDATE_PROJECT: 'UPDATE_PROJECT',
  DELETE_PROJECT: 'DELETE_PROJECT',
  FETCH_ALL_PROJECT: 'FETCH_ALL_PROJECT',
};

//Get
export const fetchAll = () => (dispatch) => {
  api
    .actions(PROJECT_URL)
    .fetchAll()
    .then((response) => {
      // console.log(response.data);
      dispatch({
        type: ACTION_TYPES.FETCH_ALL_PROJECT,
        payload: response.data,
      });
    })
    .catch((error) => console.log(error));
};

//Create
export const create = (data, onSuccess) => (dispatch) => {
  api
    .actions(PROJECT_URL)
    .create(data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.CREATE_PROJECT,
        payload: res.data,
      });
      onSuccess();
    })
    .catch((error) => console.log(error));
};

//Update
export const update = (id, data, onSuccess) => (dispatch) => {
  api
    .actions(PROJECT_URL)
    .update(id, data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.UPDATE_PROJECT,
        payload: { id, ...data },
      });
      onSuccess();
    })
    .catch((error) => console.log(error));
};

//Delete
export const Delete = (id, onSuccess) => (dispatch) => {
  api
    .actions(PROJECT_URL)
    .delete(id)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.DELETE_PROJECT,
        payload: id,
      });
      onSuccess();
    })
    .catch((error) => console.log(error));
};
