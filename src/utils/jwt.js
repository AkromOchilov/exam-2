import jwt from 'jsonwebtoken';
import { KEY } from './../config.js';

export default {
	sign: (payload) => jwt.sign(payload, KEY),
	verify: (token) => jwt.verify(token, KEY),
};
