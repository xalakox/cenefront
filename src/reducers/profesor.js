
const defaultState = {
  loading: false,
  error: false,
  data: [],
  profesor: null,
};

const auth = (state = defaultState, { type, payload }) => {
  switch (type) {
    case 'GETPROFESOR_START':
      return { ...state, loading: true };
    case 'GETPROFESOR_SUCCESS':
      return { ...state, loading: false, data: payload.comentarios, profesor: payload.profesor };
    case 'GETPROFESOR_FAILED':
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default auth;
