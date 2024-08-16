const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Read files from the routes directory
const routesPath = path.join(__dirname);

// Register each route file
fs.readdirSync(routesPath).forEach(file => {
  if (file.endsWith('.js') && file !== 'index.js') {
    const routePath = path.join(routesPath, file);
    const route = require(routePath);

    // Ensure that the required module is an Express Router
    if (typeof route === 'function') {
      router.use('/' + file.replace('.js', ''), route);
    } else {
      console.error(`Route file ${file} does not export a function`);
    }
  }
});

module.exports = router;
