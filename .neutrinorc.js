module.exports = {
  use: [
    ['@neutrinojs/airbnb', {
      eslint: {
        rules: {
          'react/prefer-stateless-function': [1, {
            ignorePureComponents: true
          }]
        }
      }
    }],
    [
      '@neutrinojs/react',
      {
        html: {
          title: 'eduardo-perez-app'
        }
      }
    ],
    '@neutrinojs/jest'
  ]
};
