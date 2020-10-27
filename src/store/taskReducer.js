import { SET_COMPLETED, SET_TODOS, SET_INACTIVE } from './action';

const createData = (task, done) => {
  return { task, done };
};

const initialState = {
  todos: [
    createData('playing', false),
    createData('study', false),
    createData('watch moves', false),
    createData('go with friend', false),
    createData('talk to familt', false),
    createData('go to school', false),
  ],
  inactiveItem: null,
  completed: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_TODOS:
      return { ...state, todos: payload };
    case SET_COMPLETED:
      return { ...state, completed: payload };
    case SET_INACTIVE:
      return { ...state, inactiveItem: payload };
    default:
      return state;
  }
}
