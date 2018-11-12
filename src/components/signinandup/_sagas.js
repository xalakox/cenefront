
import { put, takeLatest, call } from 'redux-saga/effects';
import { login, signUp, checkToken, saveUser } from '../../api';

function* doLogin({ payload }) {
  yield put({ type: 'LOGIN_START' });
  try {
    const retVal = yield call(
      login,
      {
        email: payload.email,
        password: payload.password,
      },
    );
    yield put({ type: 'LOGIN_SUCCESS', payload: retVal });
  } catch (e) {
    console.log({ e });
    yield put({ type: 'LOGIN_FAILED', payload: 'Correo / Contraseña Inválidos' });
  }
}

function* navInside() {
  yield put({ type: '@@router/LOCATION_CHANGE', payload: { location: { pathname: '/main' }, action: 'PUSH' } });
}

function* showAlert({ payload }) {
  alert(payload);
}
function* doSignUp({ payload }) {
  yield put({ type: 'SIGNUP_START' });
  try {
    const retVal = yield call(
      signUp,
      {
        email: payload.email,
      },
    );
    yield put({ type: 'SIGNUP_SUCCESS', payload: retVal });
  } catch (e) {
    console.log({ e });
    yield put({ type: 'SIGNUP_FAILED', payload: 'Correo / Contraseña Inválidos' });
  }
}

function* doCheckToken({ payload }) {
  yield put({ type: 'CHECKTOKEN_START' });
  try {
    const retVal = yield call(
      checkToken,
      {
        token: payload.token,
      },
    );
    yield put({ type: 'CHECKTOKEN_SUCCESS', payload: retVal });
  } catch (e) {
    console.log({ e });
    yield put({ type: 'CHECKTOKEN_FAILED' });
  }
}

function* doSaveUSer({ payload }) {
  yield put({ type: 'SAVEUSER_START' });
  try {
    const retVal = yield call(
      saveUser,
      {
        token: payload.token,
        nombre: payload.nombre,
        password: payload.password,
      },
    );
    yield put({ type: 'SAVEUSER_SUCCESS', payload: retVal });
  } catch (e) {
    yield put({ type: 'SAVEUSER_FAILED', payload: e || 'No fue posible crear la cuenta' });
  }
}

export const auth = [
  takeLatest('LOGIN', doLogin),
  takeLatest('LOGIN_FAILED', showAlert),
  takeLatest('LOGIN_SUCCESS', navInside),
  takeLatest('SIGNUP', doSignUp),
  takeLatest('SIGNUP_FAILED', showAlert),
  takeLatest('CHECKTOKEN', doCheckToken),
  takeLatest('SAVEUSER', doSaveUSer),
  takeLatest('SAVEUSER_FAILED', showAlert),
  takeLatest('SAVEUSER_SUCCESS', navInside),
];
