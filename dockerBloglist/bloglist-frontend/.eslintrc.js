module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "jest/globals": true,
    "cypress/globals": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "react", "jest", "cypress"
  ],
  "rules": {
    "no-unused-vars": ["warn"],
    "indent": [
      "warn",
      2,
      { "SwitchCase": 1 }
    ],
    // "linebreak-style": [
    //   "warn",
    //   "unix"
    // ],
    "quotes": [
      "warn",
      "single",
      { avoidEscape: true }
    ],
    "semi": [
      "warn",
      "always"
    ],
    "eqeqeq": "warn",
    "no-trailing-spaces": "warn",
    "object-curly-spacing": [
      "warn", "always"
    ],
    "arrow-spacing": [
      "warn", { "before": true, "after": true }
    ],
    "no-console": "off",
    "react/prop-types": 0
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}