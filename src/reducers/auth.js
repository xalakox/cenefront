
const defaultState = {
  loading: false,
  error: false,
  token: null,
};

const auth = (state = defaultState, { type, payload }) => {
  switch (type) {
    case 'LOGIN_START':
      return { ...state, loading: true };
    case 'LOGIN_SUCCESS':
      return { ...state, loading: false, token: payload.token };
    case 'LOGIN_FAILED':
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default auth;
