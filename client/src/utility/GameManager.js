class GameManager {
  constructor() {
    console.log("game manager");
  }

  debugPropertyNames = () => ({
    1: "Old Kent Road",
    2: "Whitechapel Road",
    3: "Kingscross Station",
    4: "The Angel Islington",
    5: "Euston Road",
    6: "Pentonville Road",
    7: "Pall Mall",
    8: "Electric Company",
    9: "Whitehall",
    10: "Northumerberland Avenue",
    11: "Marlybone Station",
    12: "Bow Street",
    13: "Marlborough Street",
    14: "Vine Street",
    15: "The Strand",
    16: "Fleet Street",
    17: "Trafalgar Square",
    18: "Fenchurch Station",
    19: "Leicester Square",
    20: "Conventry Street",
    21: "Water works",
    22: "Piccadilly",
    23: "Regent Street",
    24: "Oxford Street",
    25: "Bond Street",
    26: "Liverpool Street Station",
    27: "Park Lane",
    28: "Mayfair"
  });

  getPropertyName = (id) => {
    let propNames = this.debugPropertyNames();
    return Object.keys(propNames).includes(id) ? propNames[id] : "Unknown";
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
