import api from './api';
import { SKILL_URL } from '../utils/constatnts';

export const ACTION_TYPES = {
  CREATE_SKILL: 'CREATE_SKILL',
  UPDATE_SKILL: 'UPDATE_SKILL',
  DELETE_SKILL: 'DELETE_SKILL',
  FETCH_ALL_SKILLS: 'FETCH_ALL_SKILLS',
};

//Get
export const fetchAll = () => (dispatch) => {
  api
    .actions(SKILL_URL)
    .fetchAll()
    .then((response) => {
      // console.log('skills', response);
      dispatch({
        type: ACTION_TYPES.FETCH_ALL_SKILLS,
        payload: response.data,
      });
    })
    .catch((error) => console.log(error));
};

//Create
export const create = (data, onSuccess) => (dispatch) => {
  api
    .actions(SKILL_URL)
    .create(data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.CREATE_SKILL,
        payload: res.data,
      });
      onSuccess();
    })
    .catch((error) => console.log(error));
};

//Update
export const update = (id, data, onSuccess) => (dispatch) => {
  api
    .actions(SKILL_URL)
    .update(id, data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.UPDATE_SKILL,
        payload: { id, ...data },
      });
      onSuccess();
    })
    .catch((error) => console.log(error));
};

//Delete
export const Delete = (id, onSuccess) => (dispatch) => {
  api
    .actions(SKILL_URL)
    .delete(id)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.DELETE_SKILL,
        payload: id,
      });
      onSuccess();
    })
    .catch((error) => console.log(error));
};
