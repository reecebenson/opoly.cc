/**
 * --------------------------------------------------
 * Opoly: Interactive Monopoly Game
 * --------------------------------------------------
 * @author   Reece Benson <business@reecebenson.me>
 * @package  Opoly
 * @version  1.0.0
 */
const Sequelize = require("sequelize");

module.exports = db => {
  return {
    info: {
      name: "Game"
    },
    exec: () =>
      db.define("games", {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        }
      })
  };
};
