
import { all } from 'redux-saga/effects';

import { auth } from './components/signinandup/_sagas';
import { main } from './components/main/_sagas';

export default function* rootSaga() {
  yield all([
    ...auth,
    ...main,
  ]);
}
