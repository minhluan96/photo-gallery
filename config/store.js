import { createStore, applyMiddleware } from 'redux';
import createSagaMiddle from 'redux-saga';
import rootReducer from './reducers.js';
import rootSaga from './saga.js';
import { composeWithDevTools } from 'redux-devtools-extension';

export default function configureStore() {
  const sagaMiddle = createSagaMiddle();
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddle))
  );
  sagaMiddle.run(rootSaga);

  return store;
}
