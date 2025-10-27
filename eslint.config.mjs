// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default withNuxt(
	// Your custom configs here
	{
		plugins: {
			prettier,
		},
		rules: {
			/**
			 * PROJECT-SPECIFIC STYLE RULES
			 *
			 * 1. Long Class Names:
			 *    When class attribute becomes long due to multiple class names,
			 *    use :class array syntax with logical grouping:
			 *
			 *    :class="[
			 *      'size-12 bg-primary-600 rounded-xl',
			 *      'flex items-center justify-center',
			 *      'transition-transform duration-300 hover:scale-110',
			 *    ]"
			 *
			 *    Note: Add trailing comma to maintain multiline format.
			 *    Group classes into small related chunks for better readability.
			 */

			// Prettier integration
			"prettier/prettier": "error",

			// Code style
			indent: ["error", "tab"],
			semi: ["error", "always"],
			quotes: ["error", "double"],

			// Vue specific rules
			"vue/block-order": [
				"error",
				{
					order: ["script", "template", "style"],
				},
			],
			"vue/html-indent": ["error", "tab"],
			"vue/script-indent": ["error", "tab", { baseIndent: 0 }],
			"vue/max-attributes-per-line": [
				"error",
				{
					singleline: { max: 2 },
					multiline: { max: 1 },
				},
			],
			"vue/attributes-order": [
				"error",
				{
					order: [
						"DEFINITION",
						"LIST_RENDERING",
						"CONDITIONALS",
						"RENDER_MODIFIERS",
						"GLOBAL",
						["UNIQUE", "SLOT"],
						"TWO_WAY_BINDING",
						"OTHER_DIRECTIVES",
						"ATTR_STATIC",
						"ATTR_DYNAMIC",
						"ATTR_SHORTHAND_BOOL",
						"EVENTS",
						"CONTENT",
					],
					alphabetical: false,
				},
			],
			"vue/html-self-closing": [
				"error",
				{
					html: {
						void: "always",
						normal: "never",
						component: "always",
					},
				},
			],
			"vue/component-name-in-template-casing": ["error", "PascalCase"],
			"vue/no-v-html": "warn",

			// TypeScript specific rules
			"@typescript-eslint/no-explicit-any": "warn",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
				},
			],
			"@typescript-eslint/explicit-function-return-type": "off",
			"@typescript-eslint/explicit-module-boundary-types": "off",
			"@typescript-eslint/no-non-null-assertion": "warn",

			// General best practices
			"no-console": ["warn", { allow: ["warn", "error"] }],
			"no-debugger": "error",
			"no-unused-vars": "off", // Use TypeScript version instead
		},
	},
	prettierConfig,
);
