const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3')
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile')

let accounts;

beforeEach(async () => {
	accounts = await web3.eth.getAccounts();
});

describe('EVoting', () => {
	it('Contract deployed successfully', () => {
		console.log(accounts);
	});
});