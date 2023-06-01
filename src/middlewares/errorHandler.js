export let errorHandler = (err, req, res, next) => {
	if (err.status != 500) {
		res.status(400).json({
			status: 400,
			error_name: err.name,
			message: err.message,
		});
	} else {
		res.status(500).json({
			status: 500,
			message: err.name,
		});
	}
};
