module.exports = {
    'env': {
        'browser': true,
        'es2021': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:vue/vue3-essential'
    ],
    'overrides': [
        {
            'env': {
                'node': true
            },
            'files': [
                '.eslintrc.{js,cjs}'
            ],
            'parserOptions': {
                'sourceType': 'script'
            }
        }
    ],
    'parserOptions': {
        'ecmaFeactures':{
            'jsx': true
        },
        //'ecmaVersion': 12, //'latest',
        'sourceType': 'module'
    },
    'plugins': [
        'vue'
    ],
    'rules': {
        semi: ['error', 'always'],
        quotes: ['error', 'single'],
        indent: ['error', 2],
        'linebreak-style': 0,
        'comma-spacing': ['error', {before: false, after: true}],
    },

    
};
