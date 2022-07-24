//.prettierrc.js
module.exports = {
  printWidth: 120,
  trailingComma: 'none',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  SpaceBeforeFunctionParen: true,
  overrides: [
    {
      files: '*.hbs',
      options: {
        singleQuote: false
      }
    }
  ]
}
