import rootReducer from '../reducer'
import {
  applyMiddleware,
  Store,
  compose,
  createStore,
} from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
// import { NgRedux } from '@angular-redux/store';



// const encryptor = createEncryptor({
//   secretKey: 'comsoftltd-key',
//   onError: function(error) {
//     // Handle the error.
//   } 
// })

// const persistConfig = {
//   key: 'root',
//   storage,
//   transforms:[encryptor]
// }

// const persistedReducer = persistReducer(
//   persistConfig,
//   rootReducer,
//    )
// export interface IAppState {
//   /* ... */

// }

export interface IAppState {
  //   /* ... */
  
  }
export const store: Store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(createLogger()),
    )
    );
// export const persistor = persistStore(store);
