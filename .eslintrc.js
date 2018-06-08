module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
	'airbnb-base',
    'plugin:vue/recommended',
  ],
  /* rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }, */
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  plugins: [
		'vue',
		'filenames',
  ],
  rules: {
		'filenames/match-regex': [ 2, '^([A-Za-z]+).(?:[A-Za-z]+)*$', true ],
		'filenames/match-exported': 2,
		// don't require .vue extension when importing
		/* 'import/extensions': [ 'error', 'always', {
			js: 'never',
			vue: 'never',
		} ], */
		// disallow reassignment of function parameters
		// disallow parameter object manipulation except for specific exclusions
		'no-param-reassign': [ 'error', {
			props: true,
			ignorePropertyModificationsFor: [
				'state', // for vuex state
				'acc', // for reduce accumulators
				'e', // for e.returnvalue
			],
		} ],
		// allow optionalDependencies
		'import/no-extraneous-dependencies': [ 'error', {
			optionalDependencies: [ 'test/unit/index.js' ],
		} ],
		// allow debugger during development
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		// Ventoro custom settings
		"import/no-unresolved": "off",
		indent: [ 2, 'tab' ],
		'no-tabs': 0,
		'space-in-parens': [ 2, 'always' ],
		'template-curly-spacing': [ 2, 'always' ],
		'array-bracket-spacing': [ 2, 'always' ],
		'object-curly-spacing': [ 2, 'always' ],
		'computed-property-spacing': [ 2, 'always' ],
		'no-multiple-empty-lines': [ 2, {
			max: 1,
		} ],
		'max-len': [ 'error', 100, 2, {
			tabWidth: 4,
			ignoreUrls: true,
			ignoreComments: false,
			ignoreRegExpLiterals: true,
			ignoreStrings: true,
			ignoreTemplateLiterals: true,
			ignorePattern: '[ \t]*<(.*)',
		} ],
		'vue/html-indent': [ 'error', 'tab', {
			attribute: 1,
			closeBracket: 0,
			alignAttributesVertically: true,
		} ],
		// TODO: change to 'always' and rename all attributes
		'vue/attribute-hyphenation': [ 2, 'never' ],
	},
	overrides: [
		{
			files: [ '*.spec.js', '**/**.spec/*.js' ],
			env: {
				jest: true,
			},
		},
		{
			files: [ '*.vue' ],
			rules: {
				indent: 'off',
				'vue/script-indent': [ 'error', 'tab', {
					baseIndent: 1,
					switchCase: 0,
				} ],
			},
		},
	],
}
