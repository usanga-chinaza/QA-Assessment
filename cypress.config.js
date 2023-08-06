const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    url: "https://plug-frontend.vercel.app",

  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/*.js'

  },
});
