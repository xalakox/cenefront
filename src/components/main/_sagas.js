
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
    console.log('error !', e);
    yield put({ type: 'GETPROFESOR_FAILED', payload: 'No fue posible traer la lista de Profesores' });
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
    console.log(e);
    yield put({ type: 'SAVECOMMENT_FAILED', payload: 'No fue posible guardar el comentario' });
  }
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
];
