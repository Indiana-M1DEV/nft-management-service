const express = require('express');
const session = require('express-session');

require('dotenv').config();
require('./database').connect();

const app = express();
const port = process.env.NFT_API_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
	})
);

const routes = [];

routes.forEach((route) => {
	if (route.secure) app.use(route.path, route.router);

	app.use(route.path, route.router);
});

app.listen(port, () => {
	console.log(`Server is listening on port ${process.env.NFT_API_PORT}`);
});
