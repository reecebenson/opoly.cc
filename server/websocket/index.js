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
    this._games = {};
    this.setupWebSocket();
  }

  getGame = (gameId) => {
    if (Object.keys(this._games).includes(gameId)) {
      return this._games[gameId];
    }

    return null;
  };

  createGame = (gameDetails) => {
    if (!this.getGame(gameDetails.id)) {
      this._games[gameDetails.id] = {
        ...gameDetails,
        clients: {}
      }
    }
    return null;
  }

  addClientToGame = (gameId, socket, player) => {
    this._games[gameId]['clients'][player.id] = {
      ...player,
      socket: socket
    };
    console.log(`Added ${player.id} to ${gameId}`);
  }

  removeClientFromGame = (gameId, socket, player) => {
    if (!Object.keys(this._games[gameId]['clients']).includes(player.id)) {
      return;
    }
    delete this._games[gameId]['clients'][player.id];
    console.log(`Removed ${player.id} from ${gameId}`);
  }

  kickClient = (gameId, socket, player) => {
    if (!Object.keys(this._games[gameId]['clients']).includes(player.id)) {
      return;
    }
    this._games[gameId]['clients'][player.id].socket.send(JSON.stringify({
      type: "KICK_ME"
    }));
    delete this._games[gameId]['clients'][player.id];
    console.log(`Kicked ${player.id} from ${gameId}`);
  }

  endGame = (gameId) => {
    if (!this.getGame(gameId)) { return; }

    let clients = this._games[gameId]['clients'];
    Object.keys(clients).forEach(key => {
      let player = clients[key];
      if (player.socket) {
        player.socket.send(JSON.stringify({ type: "END_GAME" }));
      }
    });

    // Delete the game
    delete this._games[gameId];
  };

  distributeClients = (gameId, extra = undefined) => {
    // Gather Player Data
    let players = [];
    Object.keys(this._games[gameId]['clients']).forEach(plyrKey => {
      let plyr = this._games[gameId]['clients'][plyrKey];
      players.push({
        id: plyr.id,
        name: plyr.name,
        createdAt: plyr.createdAt
      });
    });

    Object.keys(this._games[gameId]['clients']).forEach(key => {
      let player = this._games[gameId]['clients'][key];
      if (player.socket) {
        player.socket.send(JSON.stringify({
          type: "UPDATE_PLAYERS",
          players: players,
          playerCount: Object.keys(players).length,
          extra: extra
        }));
      }
    })
  };

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
    let message = null;
    try {
      message = JSON.parse(data);
    }
    catch (e) { return console.warn("died", e); }

    switch (message.type) {
      case "init": {
        let game = this.getGame(message.game.id);
        if (!game) {
          this.createGame(message.game, ws);
        }
        this.addClientToGame(message.game.id, ws, message.player);
        this.distributeClients(message.game.id);
        break;
      }

      case "leave": {
        let game = this.getGame(message.game.id);
        if (!game) { return; }
        this.removeClientFromGame(message.game.id, ws, message.player);
        this.distributeClients(message.game.id);
        break;
      }

      case "endgame": {
        let game = this.getGame(message.game.id);
        if (!game) { return; }
        this.endGame(message.game.id);
        break;
      }

      case "kick": {
        let game = this.getGame(message.game.id);
        if (!game) { return; }
        this.kickClient(message.game.id, ws, message.player);
        this.distributeClients(message.game.id, "kick");
        break;
      }
    }
  };
};

module.exports = WSL;
