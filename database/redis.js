const 
    redis = require('redis');

module.exports = (router) => {
	global.client = redis.createClient(6379, '127.0.0.1');

	client.on('connect', () => {
		console.log("Redis is connected");
	});

	client.on('ready', () => {
		console.log("Redis is ready");
	});

	client.on('error', (err) => {
		console.log('Redis error encountered : ', err);
	});

	client.monitor((err, res) => {
		if (err) {
			console.err(err);
		} else {
		console.info(res);
		}
	});

	client.on('monitor', (time, args, raw_reply) => {
		console.log(time + ': ' + args + ' | ' + raw_reply);
	});

	router.use((req, res, next) => {
		req.cache = client;
		next();
	});

	//client.unref();
};