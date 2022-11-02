import { createSlice } from '@reduxjs/toolkit';
import todosService from '../services/todos.service';
import { setError } from './errors';

const initialState = {entities: [], isLoading: true};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    create(state, action) {
      state.entities = [...state.entities, action.payload];
    },
    recived(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    update(state, action) {
      const arrIndex = state.entities.findIndex(el => el.id === action.payload.id);
      state.entities[arrIndex] = {...state.entities[arrIndex], ...action.payload};
    },
    remove(state, action) {
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
    taskRequested(state) {
      state.isLoading = true;
    },
    taskRequestFailed(state) {
      state.isLoading = false;
    }
  }
});

const {actions, reducer: taskReducer} = taskSlice;
const {create, update, remove, recived, taskRequested, taskRequestFailed} = actions;

export const loadTasks = () => async (dispatch) =>  {
  dispatch(taskRequested());
  try {
   const {data} = await todosService.fetch();
   dispatch(recived(data));
  } catch(err) {
    dispatch(taskRequestFailed());
    dispatch(setError(err.message));
  }

}

export const createTask = () => async (dispatch) => {
  try {
    const {data} = await todosService.create({title: 'NEW TASK', completed: false});
    dispatch(create(data));
  } catch(err) {
    dispatch(taskRequestFailed());
    dispatch(setError(err.message));
  }
}

export const completeTask = (id) => (dispatch) => {
  dispatch(update({ id, completed: true }));
}

export const changeTitle = (id) => (dispatch) => {
   dispatch(update({ id, title: `New title for ${id}` }));
};


export const deleteTask = (id) => (dispatch) => {
  dispatch(remove({id}))
}


export const getTasks = () => (state) => state.tasks.entities;
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading;
export default taskReducer;