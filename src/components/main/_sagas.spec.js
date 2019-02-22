/* global describe it expect */
import faker from 'faker';
import { put, call, select } from 'redux-saga/effects';
import { getProfesores, getProfesor, saveComment } from '../../api';

import {
  getToken,
  doSaveComment,
} from './_sagas';

const store = {
  auth: {
    token: faker.random.uuid(),
  },
};


describe('comment sagas', () => {
  it('should execute doSaveComment', () => {
    const payload = {
      profesor: faker.random.uuid(),
      comentario: faker.lorem.paragraph(),
    };
    const newCommentId = faker.random.uuid();
    const gen = doSaveComment({ payload });
    expect(gen.next().value).toEqual(select(getToken));
    expect(gen.next(store.auth.token).value).toEqual(put({ type: 'SAVECOMMENT_START' }));
    expect(gen.next().value).toEqual(call(
      saveComment,
      { ...payload, token: store.auth.token },
    ));
    expect(gen.next(newCommentId).value).toEqual(put({ type: 'SAVECOMMENT_SUCCESS', payload: newCommentId }));
  });
});
