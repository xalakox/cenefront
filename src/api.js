
const base64 = require('base-64');
import {
  put
} from 'redux-saga/effects';

const api = async (url, opts) => {
  const baseUrl = process.env.CENEBACK || 'http://localhost:3000';
  const newOpts = {
    ...opts,
    mode: 'cors',
    headers: {
      ...(opts.headers || {}),
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(opts.body),
  };
  const resp = await fetch(`${baseUrl}${url}`, newOpts);
  const { status } = resp;
  if (status > 299) {
    const jsonError = await resp.json();
    const splitError = (jsonError.error || jsonError).split(':');
    const mensaje = splitError[1] || splitError[0];
    throw new Error(mensaje);
  }
  return await resp.json();
};

export default api;

export const login = ({ email, password, options = {} } = {}) => api('/autores/login', {
  ...options,
  method: 'POST',
  body: { email, password },
});
export const signUp = ({ email, options = {} } = {}) => api('/autores/registrar', {
  ...options,
  method: 'POST',
  body: { email },
});
export const checkToken = ({ token, options = {} } = {}) => api(`/autores/confirmarRegistro/${token}`, {
  ...options,
  method: 'GET',
});
export const saveUser = ({ token, nombre, password, options = {} } = {}) => api(`/autores/confirmarRegistro/${token}`, {
  ...options,
  method: 'POST',
  body: { nombre, password },
});

export const getProfesores = ({ token } = {}) => api('/profesores', {
  method: 'GET',
  headers: {
    Authorization: `Basic: ${base64.encode(`:${token}`)}`,
  },
});

export const getProfesor = ({ token, profesor } = {}) => api(`/profesores/${profesor}`, {
  method: 'GET',
  headers: {
    Authorization: `Basic: ${base64.encode(`:${token}`)}`,
  },
});

export const saveComment = ({ token, comentario, profesor } = {}) => api('/profesores/comentar', {
  method: 'POST',
  headers: {
    Authorization: `Basic: ${base64.encode(`:${token}`)}`,
  },
  body: { comentario, profesor },
});
