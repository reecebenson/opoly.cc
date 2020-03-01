/**
 * --------------------------------------------------
 * Opoly: Interactive Monopoly Game
 * --------------------------------------------------
 * @author   Reece Benson <business@reecebenson.me>
 * @package  Opoly
 * @version  1.0.0
 */
const express = require("express");
const cors = require("cors");
const http = require("http");
const { models } = require("./orm");
const WSL = require("./websocket");
const config = require("./config");
const app = express();

// Enable CORS for each response
app.use(cors());

// Setup Express Server
const server = http.createServer(app);

// Setup WebSocket Server
const wss = new WSL(models, server);

// Return JSON for each response
app.use(express.json({ extended: false }));

// API Routes
const routePath = require("path").join(__dirname, "routes");
require("fs")
  .readdirSync(routePath)
  .forEach(file => {
    if (file.slice(-2) === "js") {
      console.log(`[SRV]: Loaded route handler: ${file}`);
      require(`${routePath}/${file}`)(app, models);
    }
  });

// Error Handling
app.all("*", (req, res) =>
  res.status(404).json({
    error: true,
    message: "This API route does not exist."
  })
);

// Express Listener
server.listen(config.serverPort, () => {
  console.log(`[SRV]: API is serving on port ${process.env.OPOLY_SERVER_PORT}!`);
});