import pg from 'pg';
import { pgConfig } from './../config.js';

let pool = new pg.Pool(pgConfig);

async function fetchAll(SQL, params = []) {
	let client = await pool.connect();
	try {
		let { rows } = await client.query(SQL, params);
		return rows;
	} catch (error) {
		console.log(error);
	} finally {
		client.release();
	}
}

export { fetchAll };
