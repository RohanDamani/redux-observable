import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import { ajax } from 'rxjs/ajax';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import {fetchBeersEpic} from '../beers';
import beersReducer from '../beers';
import { configReducer } from './configReducer';
import { hydrateEpic, persistEpic } from './persist';

export function configureStore(dependencies = {}) {
  const rootEpic = combineEpics(fetchBeersEpic, persistEpic, hydrateEpic);

  const epicMiddleware = createEpicMiddleware({
    dependencies: {
      getJSON: ajax.getJSON,
      document: document,
      ...dependencies,
    },
  });

  const rootReducer = combineReducers({
    beers: beersReducer,
    config: configReducer,
  });

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(epicMiddleware)),
  );

  epicMiddleware.run(rootEpic);

  return store;
}
