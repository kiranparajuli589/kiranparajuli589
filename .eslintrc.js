module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [
		"plugin:vue/essential",
		"eslint:recommended"
	],
	parserOptions: {
		parser: "babel-eslint"
	},
	rules: {
		indent: [
			"error",
			"tab"
		],
		semi: ["error", "never"],
		"vue/html-indent": [
			"error",
			"tab",
			{
				attribute: 1,
				baseIndent: 1,
				closeBracket: 0,
				alignAttributesVertically: true,
				ignores: []
			}
		],
		"vue/script-indent": [
			"error",
			"tab"],
		"space-before-function-paren": ["error", {
			anonymous: "always",
			named: "never",
			asyncArrow: "always"
		}],
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
		"quotes": ["error", "double"],
		"vue/require-prop-types": "off",
		"vue/multi-word-component-names": "off"
	}
}
