/**
 * --------------------------------------------------
 * Opoly: Interactive Monopoly Game
 * --------------------------------------------------
 * @author   Reece Benson <business@reecebenson.me>
 * @package  Opoly
 * @version  1.0.0
 */
const Config = require("../config");
const bcrypt = require("bcrypt");
const sha1 = require("sha1");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const http = require("http");

module.exports = {
  /**
   * ----------------------------------------------------------
   * @name      shaHash
   * @desc      Hashes a string with sha1
   * ----------------------------------------------------------
   */
  shaHash: text => sha1(text),
  /**
   * ----------------------------------------------------------
   * @name      passwordHash
   * @desc      Hashes a password with blowfish
   * ----------------------------------------------------------
   */
  passwordHash: async password => await bcrypt.hash(password, 10),

  /**
   * ----------------------------------------------------------
   * @name      passwordVerify
   * @desc      Verifies a hashed password against blowfish
   * ----------------------------------------------------------
   */
  passwordVerify: async (plain, hashed) => await bcrypt.compare(plain, hashed),

  /**
   * ----------------------------------------------------------
   * @name      getTimestamp
   * @desc      Get a UNIX timestamp
   * ----------------------------------------------------------
   */
  getTimestamp: () => Math.round(+new Date() / 1000),

  /**
   * ----------------------------------------------------------
   * @name      generateJWT
   * @desc      Generate a JsonWebToken
   * ----------------------------------------------------------
   */
  generateJWT: data =>
    jwt.sign(
      {
        ...data,
        iss: "OpolyApi"
      },
      Config.jwtSecret
    ),

  /**
   * ----------------------------------------------------------
   * @name      readJWT
   * @desc      Get the payload of a JsonWebToken
   * ----------------------------------------------------------
   */
  readJWT: token => jwt.verify(token, Config.jwtSecret),

  /**
   * ----------------------------------------------------------
   * @name      download
   * @desc      Download a file from a URL and store it
   * ----------------------------------------------------------
   */
  download: (url, dest, cb) => {
    let file = fs.createWriteStream(dest);
    let request = http.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(cb);
      });
    }).on('error', (err) => {
      fs.unlink(dest);
      if (cb) {
        cb(err.message);
      }
    });
  },
};
