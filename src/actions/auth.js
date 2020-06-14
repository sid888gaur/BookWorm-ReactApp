import {USER_LOGGED_IN} from "../types";
import api from '../api';

export const userLoggedIn = (user) => ({
	type: USER_LOGGED_IN,
	user
});

const login = (credentials) => dispatch =>
	api.user.login(credentials).then(user => dispatch(userLoggedIn(user)));

export default login;