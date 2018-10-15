module.exports = {
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "extends": [ "eslint:recommended", "plugin:react/recommended" ],
  "parserOptions": {
    "ecmaVersion": 6,
    "ecmaFeatures": {
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "react/no-unescaped-entities": "off",
    "no-console": process.env.NODE_ENV === "development" ? 0 : ["warn", { allow: ["warn", "error"] }],
    "no-debugger": process.env.NODE_ENV === "development" ? 0 : 2,

    "indent": ["error", 4, { "SwitchCase": 1 }],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ]
  }
}