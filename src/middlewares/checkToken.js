import jwt from './../utils/jwt.js';

let checkToken = (req, res, next) => {
	try {
		let { token } = req.headers;
		if (!token) {
			throw new Error('Token is required');
		}
		let { adminId } = jwt.verify(token);
		req.adminId = adminId;
		next();
	} catch (error) {
		next(error);
	}
};

export { checkToken };
