
export const doLogin = (email, password) => ({ type: 'LOGIN', payload: { email, password } });
export const doSignUp = (email) => ({ type: 'SIGNUP', payload: { email } });
export const checkSignUpToken = (token) => ({ type: 'CHECKTOKEN', payload: { token } });
export const createNewUser = (token, nombre, password) => ({ type: 'SAVEUSER', payload: { token, nombre, password } });
export const logout = () => ({ type: 'LOGOUT' });
export const resetSignUpSent = () => ({ type: 'RESET_SIGNUPSENT' });
