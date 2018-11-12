
const defaultState = {
  loading: false,
  error: false,
  data: [],
  profesor: null,
  saving: false,
};

const auth = (state = defaultState, { type, payload }) => {
  switch (type) {
    case 'GETPROFESOR_START':
      return { ...state, loading: true };
    case 'GETPROFESOR_SUCCESS':
      return { ...state, loading: false, data: payload.comentarios, profesor: payload.profesor };
    case 'GETPROFESOR_FAILED':
      return { ...state, loading: false, error: true };
    case 'SAVECOMMENT_START':
      return { ...state, saving: true };
    case 'SAVECOMMENT_SUCCESS':
      return { ...state, saving: false };
    case 'SAVECOMMENT_FAILED':
      return { ...state, saving: false };
    default:
      return state;
  }
};

export default auth;
