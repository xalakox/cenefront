
export const getProfesores = () => ({ type: 'GETPROFESORES' });
export const getProfesor = (profesor) => ({ type: 'GETPROFESOR', payload: { profesor } });
export const saveComment = (comentario, profesor) => ({ type: 'SAVECOMMENT', payload: { comentario, profesor } });
