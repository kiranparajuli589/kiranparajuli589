module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		"plugin:vue/vue3-essential",
		"eslint:recommended",
		"@vue/eslint-config-typescript",
	],
	rules: {
		"quotes": ["error", "double"],
		"semi": ["error", "never"],
		"indent": ["error", "tab"],
		"vue/multi-word-component-names": "off",
	},
}
