import rootReducer from '../reducer'
import {
  applyMiddleware,
  Store,
  compose,
  createStore,
} from 'redux';
import { createLogger } from 'redux-logger';


export interface IAppState {
  /* ... */
}
export const store: Store<IAppState> = createStore(
  rootReducer,
  applyMiddleware(createLogger()),
);
