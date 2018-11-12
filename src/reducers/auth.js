
const defaultState = {
  loading: false,
  error: false,
  token: null,
  signUpEmailSent: false,
  link: null,
  signUpTokenOk: false,
};

const auth = (state = defaultState, { type, payload }) => {
  switch (type) {
    case 'LOGIN_START':
      return { ...state, loading: true };
    case 'LOGIN_SUCCESS':
      return { ...state, loading: false, token: payload.token };
    case 'LOGIN_FAILED':
      return { ...state, loading: false, error: true };
    case 'SIGNUP_START':
      return { ...state, loading: true };
    case 'SIGNUP_SUCCESS':
      return { ...state, loading: false, signUpEmailSent: true, link: payload.link };
    case 'SIGNUP_FAILED':
      return { ...state, loading: false, error: true };
    case 'CHECKTOKEN_START':
      return { ...state, loading: true };
    case 'CHECKTOKEN_SUCCESS':
      return { ...state, loading: false, signUpTokenOk: true };
    case 'CHECKTOKEN_FAILED':
      return { ...state, loading: false, error: true, signUpTokenOk: false };
    case 'SAVEUSER_START':
      return { ...state, loading: true };
    case 'SAVEUSER_SUCCESS':
      return { ...state, loading: false, token: payload.token };
    case 'SAVEUSER_FAILED':
      return { ...state, loading: false, error: true };
    case 'LOGOUT':
      return { ...state, loading: false, error: false, token: null, link: null };
    default:
      return state;
  }
};

export default auth;
