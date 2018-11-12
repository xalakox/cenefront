
const defaultState = {
  loading: false,
  error: false,
  data: [],
};

const auth = (state = defaultState, { type, payload }) => {
  switch (type) {
    case 'GETPROFESORES_START':
      return { ...state, loading: true };
    case 'GETPROFESORES_SUCCESS':
      return { ...state, loading: false, data: payload };
    case 'GETPROFESORES_FAILED':
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default auth;
