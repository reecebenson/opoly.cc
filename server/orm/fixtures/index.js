/**
 * --------------------------------------------------
 * Opoly: Interactive Monopoly Game
 * --------------------------------------------------
 * @author   Reece Benson <business@reecebenson.me>
 * @package  Opoly
 * @version  1.0.0
 */
const bcrypt = require("bcrypt");
const sha1 = require("sha1");

const ExampleFixtures = models => {
  console.log("No fixtures to make.");
};

module.exports = models => {
  // Load Fixtures
  ExampleFixtures(models);
};
