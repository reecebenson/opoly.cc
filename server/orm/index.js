/**
 * --------------------------------------------------
 * Opoly: Interactive Monopoly Game
 * --------------------------------------------------
 * @author   Reece Benson <business@reecebenson.me>
 * @package  Opoly
 * @version  1.0.0
 */
const SQLize = require("sequelize");
const fs = require("fs");
const util = require("util");
const env = require("../config");
const db = new SQLize(env.dbName, env.dbUser, env.dbPass, {
  host: "db",
  dialect: "postgres",
  logging: false
});
let models = {};

const readModels = async callback => {
  // Read models
  const modelPath = require("path").join(__dirname, "models");
  const readdir = util.promisify(fs.readdir);

  await readdir(modelPath).then(dir => {
    // Process Models
    dir.forEach(file => {
      if (file.slice(-2) === "js") {
        let model = require(`${modelPath}/${file}`)(db);
        models[model.info.name] = model.exec();
        console.log(`[DB]: Loaded model: ${model.info.name}`);
      }
    });
  });

  callback();
};

// Initiate database connection
db.authenticate()
  .then(() =>
    readModels(() => db.sync().then(() => require("./fixtures")(models)))
  )
  .catch(err => console.error(`[DB]: Connection failed:\n${err}`));

module.exports = { db, models };
