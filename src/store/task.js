import { SET_COMPLETED, SET_TODOS, SET_INACTIVE } from './action';

export const setTodos = (data) => (dispatch) => {
  dispatch({
    type: SET_TODOS,
    payload: data,
  });
};

export const setCompleted = (data) => (dispatch) => {
  dispatch({
    type: SET_COMPLETED,
    payload: data,
  });
};
export const setInactiveItem = (data) => (dispatch) => {
  dispatch({
    type: SET_INACTIVE,
    payload: data,
  });
};
