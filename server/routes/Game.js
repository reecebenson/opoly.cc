/**
 * --------------------------------------------------
 * Opoly: Interactive Monopoly Game
 * --------------------------------------------------
 * @author   Reece Benson <business@reecebenson.me>
 * @package  Opoly
 * @version  1.0.0
 */
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
      key: data.gameKey
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
      gameId: game.id
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
    await game.save();

    // Return the response
    return res.json({
      data: {
        player: {
          id: player.id,
          name: player.name,
          password: player.password,
          createdAt: player.createdAt
        },
        game: {
          id: game.id,
          name: game.name,
          key: game.key,
          host: game.owner,
          hostName: player.name,
        }
      },
      status: 'OK'
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
      return res.status(404).json({ status: 'FAIL', data });
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
