import { combineReducers } from 'redux';
import { project } from './project.reducer';
import { server } from './server.reducer';

export const reducers ={
  project,
  server,
}


const rootReducer = combineReducers({
  ...reducers,
});

export default rootReducer
