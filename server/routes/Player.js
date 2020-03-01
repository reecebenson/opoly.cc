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
   * @route     /api/player/auth
   * @desc      A route used for reauthenticating a player.
   * @request   POST
   * @access    Public
   * ----------------------------------------------------------
   */
  app.all("/player/auth", async (req, res) => {
    let data = req.body;
    if (!data.gameId || !data.player || (data.player && (!data.player.id || !data.player.secretKey || !data.player.name || !data.player.password))) {
      return res.status(404).json({ status: 'FAIL', message: 'Invalid data received for reauthentication.' });
    }

    // Check if the Game ID exists
    let game = await models.Game.findOne({
      where: {
        id: data.gameId,
        pregame: true,
        active: false,
        finished: false
      }
    });

    // Get the owner of the Game
    let owner = await models.Player.findOne({
      where: {
        gameId: data.gameId,
        id: game.owner
      }
    });

    // Check if the Player exists against this Game
    let player = await models.Player.findOne({
      where: {
        gameId: data.gameId,
        id: data.player.id,
        name: data.player.name,
        password: data.player.password,
        secretKey: data.player.secretKey
      }
    });

    // Check if the game or player failed to be created
    if (!game || !owner || !player) {
      return res.status(500).json({
        status: 'FAIL',
        message: 'Unable to find a player or game to reauthenticate to.'
      });
    }

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
          hostName: owner.name,
          hostSecretKey: (game.owner === player.id ? game.hostSecretKey : undefined),
        }
      },
      status: 'OK'
    });
  });
};
