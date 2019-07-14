import { combineReducers } from 'redux';
import { project } from './project.reducer';
import { server } from './server.reducer';
import { auth } from './auth.reducer';

export const reducers ={
  project,
  server,
  auth,
}


const rootReducer = combineReducers({
  ...reducers,
});

export default rootReducer
