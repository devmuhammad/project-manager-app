import rootReducer from '../reducer'
import {
  applyMiddleware,
  Store,
  compose,
  createStore,
} from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

export interface IAppState {
  /* ... */

}
export const store: Store = createStore(
  rootReducer,
  composeWithDevTools(
  applyMiddleware(createLogger()),
  )
);
