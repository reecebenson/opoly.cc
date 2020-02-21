/**
 * --------------------------------------------------
 * Opoly: Interactive Monopoly Game
 * --------------------------------------------------
 * @author   Reece Benson <business@reecebenson.me>
 * @package  Opoly
 * @version  1.0.0
 */
const env = process.env;

module.exports = {
  environment: env.OPOLY_ENV,
  jwtSecret: env.POKIO_JWT_SECRET,
  dbUser: env.OPOLY_DB_USER,
  dbPass: env.OPOLY_DB_PASS,
  dbPort: env.OPOLY_DB_PORT,
  dbName: env.OPOLY_DB_NAME,
  serverPort: env.OPOLY_SERVER_PORT
};
