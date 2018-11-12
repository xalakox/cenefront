
import { put, takeLatest, call, select } from 'redux-saga/effects';

import { getProfesores } from '../../api';

const getToken = ({ auth }) => auth.token;

function* doTraeProfesores() {
  const token = yield select(getToken);
  yield put({ type: 'GETPROFESORES_START' });
  try {
    const retVal = yield call(
      getProfesores,
      { token },
    );
    yield put({ type: 'GETPROFESORES_SUCCESS', payload: retVal });
  } catch (e) {
    yield put({ type: 'GETPROFESORES_FAILED', payload: 'No fue posible traer la lista de Profesores' });
  }
}

export const main = [
  takeLatest('GETPROFESORES', doTraeProfesores),
];
