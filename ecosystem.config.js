module.exports = {
	apps: [
		{
			name: 'KiranParajuli',
			port: '5555',
			exec_mode: 'cluster',
			instances: 'max',
			script: './.output/server/index.mjs'
		}
	]
}
