import 'dotenv/config';
let PORT = process.env.PORT || 4000;
let KEY = 'olma';

let pgConfig = {
	user: process.env.PG_USER,
	host: process.env.PG_HOST,
	password: process.env.PG_PASSWORD,
	database: process.env.PG_DATABASE,
};

process.DEFAULT = {};
process.DEFAULT.pagination = {};
process.DEFAULT.pagination.limit = 9;
process.DEFAULT.pagination.page = 1;

export { PORT, KEY, pgConfig };
