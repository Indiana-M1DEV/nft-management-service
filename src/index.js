const express = require('express');
const session = require('express-session');

const Web3 = require('web3');
const contract = require('@truffle/contract');
const path = require('path');
const provider = new Web3.providers.HttpProvider(
	`${process.env.WEB3_PROVIDER}`
);

require('dotenv').config();
require('./database').connect();

const app = express();
const port = process.env.NFT_API_PORT;

const Contract = contract(
	require(path.join(__dirname, '../build/contracts/GeoCachingNFT.json'))
);
Contract.setProvider(provider);

// async function callContractFunction() {
// 	// const instance = await Contract.deployed();
// 	// const result = await instance.someFunction();
// 	// return result;
// }

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
