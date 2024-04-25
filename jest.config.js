module.exports = {
	clearMocks: true,
	coverageDirectory: 'coverage',
	moduleFileExtensions: ['js', 'node'],
	testEnvironment: 'node',
	testMatch: ['**/tests/**/*.test.js', '**/__tests__/**/*.test.js'],
	testPathIgnorePatterns: ['/node_modules/'],
	watchman: false,
};
