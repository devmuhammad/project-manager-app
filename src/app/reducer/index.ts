import { combineReducers } from 'redux';
import { project } from './project.reducer';

export const reducers ={
  project,
}


const rootReducer = combineReducers({
  ...reducers,
});

export default rootReducer
