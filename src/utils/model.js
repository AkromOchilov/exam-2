import { writeFileSync, readFileSync } from 'fs';
import { resolve } from 'path';
import crypto from 'crypto';

function read(filename) {
	let data = readFileSync(resolve('database', filename + '.json'), 'utf-8');
	return JSON.parse(data);
}

function write(filename, data) {
	writeFileSync(
		resolve('database', filename + '.json'),
		JSON.stringify(data, null, 4),
	);
	return true;
}

function hashPassword(password) {
	let hash = crypto.createHash('sha256').update(password).digest('hex');
	return hash;
}

export { read, write, hashPassword };
