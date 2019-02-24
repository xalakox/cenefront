
import {
  put, takeLatest, call, select,
} from 'redux-saga/effects';

import { getProfesores, getProfesor, saveComment } from '../../api';

export const getToken = ({ auth }) => auth.token;

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
    yield errorHandler('GETPROFESORES', e);
  }
}

function* errorHandler(prefix, error) {
  if (error.message === 'Credenciales Invalidas') {
    yield put({ type: 'AUTH_ERROR' });
  } else {
    yield put({ type: `${prefix}_FAILED`, payload: 'No fue posible traer la list de Comentarios' });
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
    yield errorHandler('GETPROFESOR', e);
  }
}

export function* doSaveComment({ payload }) {
  const token = yield select(getToken);
  yield put({ type: 'SAVECOMMENT_START' });
  try {
    const retVal = yield call(
      saveComment,
      { token, profesor: payload.profesor, comentario: payload.comentario },
    );
    yield put({ type: 'SAVECOMMENT_SUCCESS', payload: retVal });
    yield call(doTraeComments, { payload });
  } catch (e) {
    yield errorHandler('SAVECOMMENT', e);
  }
}

function* AuthError() {
  yield put({ type: 'SHOW_ALERT', payload: 'Sus credenciales han sido invalidadas.' });
  yield put({ type: 'LOGOUT' });
}

function showAlert({ payload }) {
  alert(payload);
}


export const main = [
  takeLatest('GETPROFESORES', doTraeProfesores),
  takeLatest('GETPROFESOR', doTraeComments),
  takeLatest('SAVECOMMENT', doSaveComment),
  takeLatest('SAVECOMMENT_FAILED', showAlert),
  takeLatest('GETPROFESOR_FAILED', showAlert),
  takeLatest('AUTH_ERROR', AuthError),
  takeLatest('SHOW_ALERT', showAlert),
];
