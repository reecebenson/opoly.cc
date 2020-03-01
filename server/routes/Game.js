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
   * @route     /api/log
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

    // Create the player
    let player = await models.Player.create({
      name: data.playerName,
      password: data.playerPass
    });

    // Check if the game or player failed to be created
    if (!game || !player) {
      return res.status(500).json({
        status: 'FAIL',
        message: 'Unable to create the game or player.'
      });
    }

    // Return the response
    return res.json({
      data: {
        player: {
          name: player.name,
          password: player.password
        },
        game: {
          id: game.id,
          name: game.name,
          key: game.key
        }
      },
      status: 'OK'
    });
  });
};
