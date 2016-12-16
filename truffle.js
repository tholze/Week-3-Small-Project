module.exports = {
  build: {
    "index.html": "index.html",
    "app.js": [
      "javascripts/small_project.js"
    ],
    "app.css": [
      "stylesheets/app.css"
    ],
    "images/": "images/"
  },
  rpc: {
    host: "localhost",
    port: 8545
  }
};
