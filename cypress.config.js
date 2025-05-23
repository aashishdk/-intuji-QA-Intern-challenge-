const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}", // ✅ add this line
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
