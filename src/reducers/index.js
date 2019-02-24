
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import auth from './auth';
import profesores from './profesores';
import profesor from './profesor';


export default (history) => combineReducers({
  router: connectRouter(history),
  auth,
  profesores,
  profesor,
});

