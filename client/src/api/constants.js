const env = process.env;

// Get the current environment URL
const getDomainEnv = function () {
  switch (env.REACT_APP_ENV) {
    case "local":
      return "//127.0.0.1";

    default:
    case "live":
      return "//opoly.cc";
  }
};

// Get the WebSocket URL to the Public API
const webSocketURL = `ws:${getDomainEnv()}:5000`;

module.exports = {
  api: getDomainEnv(),
  ws: webSocketURL
};