const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

mongoose.set('strictQuery', false);

const adminClient = new MongoClient(
	`mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/admin`
);

const ensureUserExists = async () => {
	try {
		await adminClient.connect();
		const adminDb = adminClient.db('admin');

		const userExists = await adminDb.command({
			usersInfo: process.env.DATABASE_LOG,
		});

		if (!userExists.users || userExists.users.length === 0) {
			await adminDb.command({
				createUser: process.env.DATABASE_LOG,
				pwd: process.env.DATABASE_PASS,
				roles: [{ role: 'userAdminAnyDatabase', db: process.env.AUTH_SOURCE }],
			});
		}

		await adminClient.close();
	} catch (err) {
		console.error('Error in ensureUserExists:', err);
		throw err;
	}
};

const connect = async () => {
	try {
		await ensureUserExists();
		mongoose.connect(
			`mongodb://${process.env.DATABASE_LOG}:${process.env.DATABASE_PASS}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/?authMechanism=${process.env.AUTH_MECANISM}&authSource=${process.env.AUTH_SOURCE}`
		);
		console.log('Connected to database');
	} catch (err) {
		console.error('Error in connect:', err);
		throw err;
	}
};

module.exports = {
	connect,
};
