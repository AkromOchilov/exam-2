import { fetchAll } from './../utils/postgres.js';

let getAllPosts = async () => {
	try {
		let posts = await fetchAll(
			'SELECT * FROM posts WHERE status = $1 AND deleted_at IS NULL',
			['accepted'],
		);
		return posts;
	} catch (error) {
		return error;
	}
};

let getPostById = async (postId) => {
	try {
		let targetPost = await fetchAll(
			'SELECT * FROM POSTS WHERE postId = $1 AND status = $2',
			[postId, 'accepted'],
		);
		return targetPost;
	} catch (error) {
		return error;
	}
};

let createNewPost = async (data) => {
	try {
		let newPost = await fetchAll(
			'INSERT INTO posts(category, subcategory, format, link, date, time, organizator, job, contact, title, content, status, image) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *',
			data,
		);
		return newPost;
	} catch (error) {
		return error;
	}
};

export default { getAllPosts, getPostById, createNewPost };
