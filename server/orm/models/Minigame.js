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
      name: "Minigame"
    },
    exec: () =>
      db.define("minigames", {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        }
      })
  };
};
