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
    res.json({ status: 'OK' });
  });
};
