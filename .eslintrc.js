module.exports = {
	"env": {
		"browser": true,
		"node": true,
		"es2021": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:vue/vue3-recommended"
	],
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"plugins": [
		"vue"
	],
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"never"
		],
		"vue/html-indent": ["error", "tab"],
		"vue/script-indent": ["error", "tab"],
		"vue/max-attributes-per-line": ["error", {
			"singleline": {
				"max": 4
			},
			"multiline": {
				"max": 4
			}
		}]
	}
}
