let PORT = process.env.PORT || 4000;
let KEY = 'olma';

process.DEFAULT = {};
process.DEFAULT.pagination = {};
process.DEFAULT.pagination.limit = 9;
process.DEFAULT.pagination.page = 1;

export { PORT, KEY };
