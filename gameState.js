const { getLocations } = require("./locations");

const gameState = {
  location: [0, 0],
  leftHand: null,
  rightHand: null,
  life: 250,
  points: 0,
  locations: getLocations(),
  resetGame() {
    this.location = [0, 0];
    this.leftHand = null;
    this.rightHand = null;
    this.life = 250;
    this.points = 0;
    this.locations = getLocations();
  },
};
exports.gameState = gameState;
