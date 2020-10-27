import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import ToDoContainer from './todo-component/ToDoContainer';
function App() {
  return (
    <Provider store={store}>
      <ToDoContainer />
    </Provider>
  );
}

export default App;
