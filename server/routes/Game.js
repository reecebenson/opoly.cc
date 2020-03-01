/**
 * --------------------------------------------------
 * Opoly: Interactive Monopoly Game
 * --------------------------------------------------
 * @author   Reece Benson <business@reecebenson.me>
 * @package  Opoly
 * @version  1.0.0
 */
const sha1 = require("sha1");

module.exports = (app, models) => {
  /**
   * ----------------------------------------------------------
   * @route     /api/game/create
   * @desc      A route used for creating a game.
   * @request   POST
   * @access    Public
   * ----------------------------------------------------------
   */
  app.all("/game/create", async (req, res) => {
    let data = req.body;

    if (!data.gameName || !data.gameKey || !data.playerName || !data.playerPass) {
      return res.status(404).json({ status: 'FAIL' });
    }

    // Create the game
    let game = await models.Game.create({
      name: data.gameName,
      key: data.gameKey,
    });

    if (!game) {
      return res.status(500).json({
        status: 'FAIL',
        message: 'Unable to create the game',
      });
    }

    // Create the player
    let player = await models.Player.create({
      name: data.playerName,
      password: data.playerPass,
      gameId: game.id,
      secretKey: sha1(`secret${data.playerName}`),
    });

    // Check if the game or player failed to be created
    if (!player) {
      return res.status(500).json({
        status: 'FAIL',
        message: 'Unable to create the player.'
      });
    }

    // Update the game to have this player set as the owner
    game.owner = player.id;
    game.hostSecretKey = sha1(player.id + "." + game.id);
    await game.save();

    // Return the response
    return res.json({
      data: {
        player: {
          id: player.id,
          name: player.name,
          password: player.password,
          createdAt: player.createdAt,
          secretKey: player.secretKey,
        },
        game: {
          id: game.id,
          name: game.name,
          key: game.key,
          host: game.owner,
          hostName: player.name,
          hostSecretKey: game.hostSecretKey
        }
      },
      status: 'OK'
    });
  });

  /**
   * ----------------------------------------------------------
   * @route     /api/game/leave
   * @desc      A route used for leaving a game.
   * @request   POST
   * @access    Public
   * ----------------------------------------------------------
   */
  app.all("/game/leave", async (req, res) => {
    let data = req.body;
    if (!data.gameId || !data.player) {
      return res.status(403).json({ status: 'FAIL' });
    }

    let game = await models.Game.findOne({
      where: { id: data.gameId }
    });

    if (!game) {
      res.status(404).json({ status: 'FAIL', message: 'Invalid game.' });
    }

    // Find the player
    let player = await models.Player.findOne({
      where: {
        gameId: data.gameId,
        id: data.player.id,
        secretKey: data.player.secretKey
      }
    });

    if (!player) {
      res.status(404).json({ status: 'FAIL', message: 'Invalid player key.' });
    }

    // Destroy the player
    await player.destroy();
    return res.json({ status: 'OK' });
  });

  /**
   * ----------------------------------------------------------
   * @route     /api/game/force-end
   * @desc      A route used for force ending a game.
   * @request   POST
   * @access    Public
   * ----------------------------------------------------------
   */
  app.all("/game/force-end", async (req, res) => {
    let data = req.body;
    if (!data.gameId || !data.key) {
      return res.status(403).json({ status: 'FAIL' });
    }

    let game = await models.Game.findOne({
      where: {
        id: data.gameId,
        hostSecretKey: data.key
      }
    });

    if (!game) {
      return res.status(404).json({ status: 'FAIL', message: 'Invalid key.' });
    }

    // Destroy the game
    await game.destroy();
    return res.json({ status: 'OK' });
  });

  /**
   * ----------------------------------------------------------
   * @route     /api/game/connect
   * @desc      A route used for game authentication.
   * @request   POST
   * @access    Public
   * ----------------------------------------------------------
   */
  app.all("/game/connect", async (req, res) => {
    let data = req.body;

    if (!data.gameId || !data.player || (data.player && (!data.player.name || !data.player.password))) {
      return res.status(404).json({ status: 'FAIL' });
    }

    let game = await models.Game.findOne({
      where: {
        id: data.gameId
      }
    });

    if (!game) {
      return res.status(500).json({
        status: 'FAIL',
        message: 'Unable to lookup game',
      });
    }

    // Check if the Player exists against this Game
    let player = await models.Player.findOne({
      where: {
        gameId: null,
        id: data.player.id || null,
        name: data.player.name,
        password: data.player.password,
        secretKey: data.player.secretKey || "",
      }
    });

    // Create the player if it doesn't exist
    if (!player) {
      player = await models.Player.create({
        name: data.player.name,
        password: data.player.password,
        gameId: game.id,
        secretKey: sha1(`secret${data.player.name}`),
      });
    }

    // Check if the Owner exists against this Game
    let owner = await models.Player.findOne({
      where: {
        gameId: game.id,
        id: game.owner,
      }
    });

    // Check if the game or player failed to be created
    if (!game || !owner || !player) {
      return res.status(500).json({
        status: 'FAIL',
        message: 'Unable to find a player or game to reauthenticate to.'
      });
    }

    // Update our player to join this game
    player.gameId = game.id;
    await player.save();

    // Return the response
    return res.json({
      data: {
        player: {
          id: player.id,
          name: player.name,
          password: player.password,
          createdAt: player.createdAt,
          secretKey: player.secretKey,
        },
        game: {
          id: game.id,
          name: game.name,
          key: game.key,
          host: game.owner,
          hostName: owner.name
        }
      },
      status: 'OK'
    });
  });

  /**
   * ----------------------------------------------------------
   * @route     /api/game/joinables
   * @desc      A route used for finding existing games.
   * @request   POST
   * @access    Public
   * ----------------------------------------------------------
   */
  app.all("/game/joinables", async (req, res) => {
    let gameData = [];
    let games = await models.Game.findAll();
    for await (const gameObj of games) {
      let game = gameObj.dataValues;
      let gameId = gameObj.id;

      // Get Player Count
      let count = await models.Player.count({
        where: {
          gameId: gameId,
        }
      });

      // Push Game
      gameData.push({
        id: gameId,
        name: game.name,
        players: `${count} / ${game.maxPlayers}`,
        public: (game.key === ""),
      });
    };

    return res.json({
      games: gameData
    });
  });

  /**
   * ----------------------------------------------------------
   * @route     /api/game/joinables
   * @desc      A route used for finding existing games.
   * @request   POST
   * @access    Public
   * ----------------------------------------------------------
   */
  app.all("/game/password", async (req, res) => {
    let data = req.body;

    if (!data.gameId || !data.password) {
      return res.status(404).json({ status: 'FAIL' });
    }

    let game = await models.Game.findOne({
      where: { id: data.gameId, key: data.password }
    });

    if (!game) {
      return res.status(403).json({
        status: 'FAIL',
        message: 'Invalid game',
      });
    }

    // Check if the Player exists against this Game
    let owner = await models.Player.findOne({
      where: {
        gameId: game.id,
        id: game.owner,
      }
    });

    if (!owner) {
      return res.status(403).json({
        status: 'FAIL',
        message: 'Unable to find a valid owner for game',
      });
    }

    return res.json({
      status: 'OK',
      game: {
        id: game.id,
        name: game.name,
        key: game.key,
        host: game.owner,
        hostName: owner.name
      }
    });
  });

  /**
   * ----------------------------------------------------------
   * @route     /api/game/stats
   * @desc      A route used for game stats.
   * @request   POST
   * @access    Public
   * ----------------------------------------------------------
   */
  app.all("/game/stats", async (req, res) => {
    let data = req.body;

    if (!data.gameId) {
      return res.status(404).json({ status: 'FAIL' });
    }

    let game = models.Game.findOne({
      where: {
        id: data.gameId
      }
    });

    if (!game) {
      return res.status(500).json({
        status: 'FAIL',
        message: 'Unable to lookup game',
      });
    }

    let players = await models.Player.findAll({
      where: {
        gameId: data.gameId,
      }
    });

    // Remove player keys
    Object.keys(players).forEach(p => {
      players[p].password = undefined;
    });

    return res.json({
      pregame: game.pregame || null,
      active: game.active || null,
      finished: game.finished || null,
      players: players || null,
    });
  });
};
