module.exports = {
    'env': {
        'node': true,
        'commonjs': true,
        'es2020': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:jsdoc/recommended'
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': '2020'
    },
    'plugins': [
        '@typescript-eslint',
        'jsdoc'
    ],
    'rules': {
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/consistent-type-assertions': 'error',
        '@typescript-eslint/consistent-type-definitions': 'error',
        '@typescript-eslint/array-type': 'error',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/member-delimiter-style': [
            'error',
            {
                'multiline': {
                    'delimiter': 'comma'
                },
                'singleline': {
                    'delimiter': 'comma'
                },
                'overrides': {
                    'interface': {
                        'multiline': {
                            'delimiter': 'semi',
                            'requireLast': true
                        }
                    }
                }
            }
        ],
        '@typescript-eslint/no-empty-function': 'error',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-for-in-array': 'error',
        '@typescript-eslint/no-inferrable-types': 'error',
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-namespace': 'error',
        '@typescript-eslint/no-parameter-properties': 'off',
        '@typescript-eslint/no-unused-expressions': 'error',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-var-requires': 'error',
        '@typescript-eslint/prefer-for-of': 'off',
        '@typescript-eslint/prefer-function-type': 'error',
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        'quotes': 'off',
        '@typescript-eslint/quotes': [
            'error',
            'single',
            {
                'avoidEscape': true
            }
        ],
        'semi': 'off',
        '@typescript-eslint/semi': 'error',
        '@typescript-eslint/triple-slash-reference': 'error',
        '@typescript-eslint/type-annotation-spacing': 'error',
        '@typescript-eslint/unified-signatures': 'error',
        'no-eval': 'error',
        'no-console': 'error',
        'no-debugger': 'error',
        'no-caller': 'error',
        'no-new-wrappers': 'error',
        'no-throw-literal': 'error',
        'no-undef-init': 'error',
        'no-unused-labels': 'error',
        'prefer-object-spread': 'error',
        'keyword-spacing': 'error',
        'brace-style': 'error',
        'constructor-super': 'error',
        'guard-for-in': 'error',
        'no-cond-assign': 'error',
        'no-return-await': 'error',
        'no-trailing-spaces': 'error',
        'eqeqeq': 'error',
        'no-duplicate-imports': 'error',
        'no-template-curly-in-string': 'error',
        'object-shorthand': 'error',
        'prefer-arrow-callback': 'error',
        'prefer-template': 'error',
        'no-multiple-empty-lines': [
            'error',
            {
                'max': 1
            }
        ],
        'id-denylist': [
            'error',
            'any',
            'Number',
            'number',
            'String',
            'string',
            'Boolean',
            'boolean',
            'Undefined',
            'undefined'
        ],
        'id-match': 'error',
        'no-empty': [
            'error',
            {
                'allowEmptyCatch': true
            }
        ],
        'indent': [
            'error',
            4,
            { 'SwitchCase': 1 }
        ],
        'linebreak-style': 'error',
        'eol-last': 'error',
        'max-len': [
            'error',
            { 'code': 150 }
        ],
        'object-curly-spacing': [
            'error',
            'always'
        ],
        'array-bracket-spacing': 'error',
        'comma-spacing': 'error'
    },
    'overrides': [
        {
            'files': ['*.spec.ts'],
            'rules': {
                '@typescript-eslint/no-unused-vars': 'off',
                '@typescript-eslint/no-empty-function': 'off'
            }
        }
    ]
};
