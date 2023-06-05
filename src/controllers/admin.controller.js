import { read, write, hashPassword } from '../utils/model.js';
import adminModel from './../model/adminModel.js';
import jwt from './../utils/jwt.js';
import {
	InternalServerError,
	NotFoundError,
	BadRequestError,
} from '../utils/error.js';

let LOGIN = async (req, res, next) => {
	try {
		let { username, password } = req.body;
		password = hashPassword(password);

		let admin = await adminModel.adminLogin(username, password);

		if (!admin.length) {
			return next(
				new BadRequestError(400, 'invalid username or password'),
			);
		}
		delete admin.password;

		res.status(200).json({
			status: 200,
			message: 'successfull',
			access_token: jwt.sign({ adminId: admin.adminId }),
			data: admin,
		});
	} catch (error) {
		next(error);
	}
};

let GET = async (req, res, next) => {
	try {
		let { status } = req.query;
		if (!status) status = 'waiting';
		let posts = await adminModel.getAdminPosts(status);

		res.status(200).json({
			status: 200,
			message: 'success',
			data: posts,
		});
	} catch (error) {
		next(error);
	}
};

let PUT = async (req, res, next) => {
	try {
		let posts = read('posts');
		let { status, postId } = req.body;

		let post = await adminModel.updatePost(status, postId);
		console.log(post);
		// if (!post.length) {
		// 	return next(new NotFoundError(404, 'post not found'));
		// }
		res.status(200).json({
			status: 200,
			message: 'successfully updated',
			data: post,
		});
	} catch (error) {
		return next(new InternalServerError(500, 'InternalServerError'));
	}
};

export default { GET, LOGIN, PUT };
