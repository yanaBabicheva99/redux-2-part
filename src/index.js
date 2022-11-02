import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import  createStore from './store/store';
import {
  changeTitle,
  createTask,
  deleteTask,
  getTasks,
  getTasksLoadingStatus,
  loadTasks,
  titleChanged
} from './store/task';
import {completeTask} from './store/task';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { getError } from './store/errors';

const store = createStore();

const App = () => {
 const state = useSelector(getTasks());
 const isLoading = useSelector(getTasksLoadingStatus());
 const error = useSelector(getError());

 const dispatch = useDispatch();

  useEffect(() => {
   dispatch(loadTasks());
  }, [])

if (isLoading) {
  return <h2>Loading...</h2>
}

if (error) {
  return <p>{error}</p>
}

  return (
    <>
      <h1>App</h1>
      <button onClick={() => dispatch(createTask())}>Create task</button>
      <ul>{state.map(el => (
        <li key={el.id}>
          <p>{el.title}</p>
          <p>{`Completed: ${el.completed}`}</p>
          <button onClick={() => dispatch(completeTask(el.id))}>Complete task</button>
          <button onClick={() => dispatch(changeTitle(el.id))}>Change title</button>
          <button onClick={() => dispatch(deleteTask(el.id))}>Delete task</button>
        </li>
      ))}</ul>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
