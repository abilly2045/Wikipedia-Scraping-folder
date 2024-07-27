const fs = require('fs');

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Register the 'task' event
      on('task', {
         writeResults({ fileName, data }) {
	          fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
          // Your task logic here
          console.log('Received data:', data);
          return null; // Signal that the event has been handled
        },
      });
    },
  },
});

