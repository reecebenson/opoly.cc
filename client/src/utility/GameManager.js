import { ws as WsURL } from '../api/constants';

class GameManager {
  constructor() {
    this.webSocket = null;
    this.setupWebSocket();
  }

  setupWebSocket = () => {

  };

  closeWebSocket = () => {
    // Gracefully close the Web Socket
    this.webSocket.onclose = undefined;
    this.webSocket.close();
  };

  debugProperties = () => ({
    1: {
      name: "Old Kent Road",
      colour: "dark-brown"
    },
    2: {
      name: "Whitechapel Road",
      colour: "dark-brown"
    },
    3: {
      name: "Kingscross Station",
      colour: "invisible"
    },
    4: {
      name: "The Angel Islington",
      colour: "light-blue"
    },
    5: {
      name: "Euston Road",
      colour: "light-blue"
    },
    6: {
      name: "Pentonville Road",
      colour: "light-blue"
    },
    7: {
      name: "Pall Mall",
      colour: "bright-pink"
    },
    8: {
      name: "Electric Company",
      colour: "invisible"
    },
    9: {
      name: "Whitehall",
      colour: "bright-pink"
    },
    10: {
      name: "Northumer-berland Avenue",
      colour: "bright-pink"
    },
    11: {
      name: "Marlybone Station",
      colour: "invisible"
    },
    12: {
      name: "Bow Street",
      colour: "orange"
    },
    13: {
      name: "Marlborough Street",
      colour: "orange"
    },
    14: {
      name: "Vine Street",
      colour: "orange"
    },
    15: {
      name: "The Strand",
      colour: "red"
    },
    16: {
      name: "Fleet Street",
      colour: "red"
    },
    17: {
      name: "Trafalgar Square",
      colour: "red"
    },
    18: {
      name: "Fenchurch Station",
      colour: "invisible"
    },
    19: {
      name: "Leicester Square",
      colour: "yellow"
    },
    20: {
      name: "Conventry Street",
      colour: "yellow"
    },
    21: {
      name: "Water works",
      colour: "invisible"
    },
    22: {
      name: "Piccadilly",
      colour: "yellow"
    },
    23: {
      name: "Regent Street",
      colour: "green"
    },
    24: {
      name: "Oxford Street",
      colour: "green"
    },
    25: {
      name: "Bond Street",
      colour: "green"
    },
    26: {
      name: "Liverpool Street Station",
      colour: "invisible"
    },
    27: {
      name: "Park Lane",
      colour: "blue"
    },
    28: {
      name: "Mayfair",
      colour: "blue"
    },
  });

  getPropertyName = (id) => {
    let properties = this.debugProperties();
    return Object.keys(properties).includes(id) ? properties[id].name : "Unknown";
  }

  getPropertyColour = (id) => {
    let properties = this.debugProperties();
    return Object.keys(properties).includes(id) ? properties[id].colour : "invisible";
  }

  addProperty = (options = {}) => {
    /*
   {
      name: "",
      price: 0,
      category: "",
      colour: "",
      weight: "",
      ownedBy: "",
      mortgagedState: false,
      visitingPlayers: [],
      rentBrackets: {
        1: 10,
        2: 30,
        3: 50,
        4: 100,
        5: 200
      }
    }
    */
  }

}

export default GameManager;
