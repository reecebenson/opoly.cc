/**
 * --------------------------------------------------
 * Opoly: Interactive Monopoly Game
 * --------------------------------------------------
 * @author   Reece Benson <business@reecebenson.me>
 * @package  Opoly
 * @version  1.0.0
 */
const WebSocket = require("ws");

class WSL {
  constructor(models, server) {
    this._models = models;
    this._wss = new WebSocket.Server({ server });
    this._clients = {};
    this.setupWebSocket();
  }

  /**
   * setupWebSocket
   *
   * @param {*} _models
   * @param {*} _server
   */
  setupWebSocket = () => {
    // Setup Connections
    this._wss.on('connection', (ws) => this.handleConnection(ws));
  };

  /**
   * handleConnection
   *
   * @param {*} ws
   */
  handleConnection = (ws) => {
    // Setup Connection Handlers
    ws.on('message', (data) => this.handleClientMessage(ws, data));
    console.log("[WS]: Received connection request.");
  };

  /**
   * handleClientMessage
   *
   * @param {*} ws
   * @param {*} data
   */
  handleClientMessage = (ws, data) => {
    console.log("[WS]: Received client message.");
  };
};

module.exports = WSL;
