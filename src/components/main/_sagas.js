
import { put, takeLatest, call, select } from 'redux-saga/effects';

import { getProfesores, getProfesor } from '../../api';

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

function* doTraeComments({ payload }) {
  const token = yield select(getToken);
  yield put({ type: 'GETPROFESOR_START' });
  try {
    const retVal = yield call(
      getProfesor,
      { token, profesor: payload.profesor },
    );
    yield put({ type: 'GETPROFESOR_SUCCESS', payload: retVal });
  } catch (e) {
    yield put({ type: 'GETPROFESOR_FAILED', payload: 'No fue posible traer la lista de Profesores' });
  }
}

export const main = [
  takeLatest('GETPROFESORES', doTraeProfesores),
  takeLatest('GETPROFESOR', doTraeComments),
];
