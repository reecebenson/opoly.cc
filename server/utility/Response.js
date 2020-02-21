/**
 * --------------------------------------------------
 * Opoly: Interactive Monopoly Game
 * --------------------------------------------------
 * @author   Reece Benson <business@reecebenson.me>
 * @package  Opoly
 * @version  1.0.0
 */

const Response = {
  success: (message, data = {}) => ({
    message: message,
    data: data,
    status: "OK",
    code: 200
  }),
  error: (message, errors = [], data = null, code = null) => ({
    message: message,
    errors: errors,
    data: data,
    status: "FAIL",
    code: code !== null ? code : 404
  })
};

module.exports = Response;
