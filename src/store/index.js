
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import reducers from '../reducers';
const middlewware = applyMiddleware(thunk, apiMiddleware);
const storeConfig = (initialState) => createStore(reducers, initialState, middlewware);
export default storeConfig;
