import { fetchAll } from './../utils/postgres.js';

let getAdminPosts = async (status) => {
	try {
		let posts = await fetchAll(
			'SELECT * FROM posts WHERE status = $1 ORDER BY postId DESC',
			[status],
		);
		return posts;
	} catch (error) {
		return error;
	}
};

let adminLogin = async (username, password) => {
	try {
		let admin = fetchAll(
			'SELECT * FROM admins WHERE username = $1 AND password = $2',
			[username, password],
		);
		return admin;
	} catch (error) {
		return error;
	}
};

let updatePost = async (status, postId) => {
	try {
		let target = fetchAll(
			`UPDATE posts 
        SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE postId = $2 RETURNING *`,
			[status, postId],
		);
		return target;
	} catch (error) {
		return error;
	}
};

export default { getAdminPosts, adminLogin, updatePost };
