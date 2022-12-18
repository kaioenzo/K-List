module.exports = {
  extends: ["@react-native-community", "eslint-config-prettier"],
  rules: {
    // Note: you must disable the base rule as it can report incorrect errors
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "warn",
  },
};
