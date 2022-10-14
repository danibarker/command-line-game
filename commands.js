const { gameState } = require("./gameState");
const {
  GAME_INFO,
  EMPTY_RIGHT_HAND,
  EMPTY_LEFT_HAND,
  CANT_GO_THAT_WAY,
  CANT_DROP_ITEM,
  CANT_DROP_WEAPON,
  NOTHING_TO_PICK_UP,
} = require("./constants");
const { locations } = require("./locations");

const startGame = () => {
  gameState.resetGame();
  return GAME_INFO;
};
exports.startGame = startGame;

const selectButton = () => {
  return GAME_INFO;
};
exports.selectButton = selectButton;
// X button does location action
const aButton = () => {
  return gameState.locations[gameState.location[0]][
    gameState.location[1]
  ].action();
};
exports.aButton = aButton;

// B button does special power
const bButton = () => {
  return gameState.rightHand
    ? gameState.rightHand.bButton(gameState)
    : EMPTY_RIGHT_HAND;
};
exports.bButton = bButton;

// X button does attack
const xButton = () => {
  let location =
    gameState.locations[gameState.location[0]][gameState.location[1]];
  let message = "";
  if (location.enemy) {
    if (gameState.leftHand) {
      message += gameState.leftHand.xButton(location.enemy);
      location.enemy.life -= gameState.leftHand.damage;
      if (location.enemy.life > 0) {
        gameState.life -= location.enemy.damage;
        message += `The ${location.enemy.name} attacks you back.  
        You take ${location.enemy.damage} damage.  
        You have ${gameState.life} life left.`;
      }
    } else {
      message +=
        "You don't have anything to attack with.  Better get out of here\n";
    }
    if (gameState.life <= 0) {
      message += "You died.  Game over.  Try again\n\n";
      gameState.resetGame();
    } else if (location.enemy.life <= 0) {
      message += `\nYou killed the ${location.enemy.name}!\n`;
      gameState.points += location.enemy.xp;
      if (location.enemy.name === "King") {
        message += `You win!  Congratulations!

        
        You have ${gameState.points} points.`;
      }
      location.enemy = null;
    }
  } else {
    message += "There is nothing to attack here.\n";
  }
  return message;
};
exports.xButton = xButton;
// Y button does weapon action
const yButton = () => {
  return gameState.leftHand
    ? gameState.leftHand.yButton(gameState)
    : EMPTY_LEFT_HAND;
};
exports.yButton = yButton;
// forward button moves forward
const forward = () => {
  if (gameState.location[1] < 2) {
    gameState.location[1]++;
    return gameState.locations[gameState.location[0]][gameState.location[1]]
      .description;
  } else {
    return CANT_GO_THAT_WAY;
  }
};
exports.forward = forward;
// backward button moves backward
const backward = () => {
  if (gameState.location[1] > 0) {
    gameState.location[1]--;
    return gameState.locations[gameState.location[0]][gameState.location[1]]
      .description;
  } else {
    return CANT_GO_THAT_WAY;
  }
};
exports.backward = backward;
// left button moves left
const left = () => {
  if (gameState.location[0] > 0) {
    gameState.location[0]--;
    return gameState.locations[gameState.location[0]][gameState.location[1]]
      .description;
  } else {
    return CANT_GO_THAT_WAY;
  }
};
exports.left = left;
// right button moves right
const right = () => {
  if (gameState.location[0] < 2) {
    gameState.location[0]++;
    return gameState.locations[gameState.location[0]][gameState.location[1]]
      .description;
  } else {
    return CANT_GO_THAT_WAY;
  }
};
exports.right = right;

// start button starts game
const startButton = () => {
  console.log(gameState.locations);
  let location =
    gameState.locations[gameState.location[0]][gameState.location[1]];
  let message = location.description;
  if (location.weapon) {
    message += `You see a ${location.weapon.name} on the ground.`;
  }
  if (location.item) {
    message += `There is a ${location.item.name} in the corner.`;
  }

  if (gameState.leftHand) {
    message += `\nYou have a ${gameState.leftHand.name} in your left hand.`;
  } else {
    message += "\nYou have nothing in your left hand.";
  }
  if (gameState.rightHand) {
    message += `\nYou have a ${gameState.rightHand.name} in your right hand.`;
  } else {
    message += "\nYou have nothing in your right hand.";
  }

  if (location.enemy) {
    message += `\nYou see a ${location.enemy.name} in the distance.`;
  }

  message += "\nYou have " + gameState.life + " life left.";
  return message + "\n";
};
exports.startButton = startButton;

// lb button picks up weapon
const lbButton = () => {
  let location =
    gameState.locations[gameState.location[0]][gameState.location[1]];
  if (location.weapon && gameState.leftHand) {
    return CANT_DROP_WEAPON;
  }
  if (!location.weapon && !gameState.leftHand) {
    return NOTHING_TO_PICK_UP;
  }
  if (location.weapon) {
    gameState.leftHand = location.weapon;

    let message = `You picked up a ${gameState.leftHand.name} in your left hand.\n`;

    location.weapon = null;

    return message;
  } else if (gameState.leftHand) {
    location.weapon = gameState.leftHand;

    gameState.leftHand = null;

    return `You dropped the ${location.weapon.name}.\n`;
  }
};
exports.lbButton = lbButton;

// rb button picks up item
const rbButton = () => {
  let location =
    gameState.locations[gameState.location[0]][gameState.location[1]];
  if (location.item && gameState.rightHand) {
    return CANT_DROP_ITEM;
  }
  if (!location.item && !gameState.rightHand) {
    return NOTHING_TO_PICK_UP;
  }
  if (location.item) {
    gameState.rightHand = location.item;
    let message = "You picked up the " + gameState.rightHand.name;
    location.item = null;
    return message + "\n";
  } else if (gameState.rightHand) {
    location.item = gameState.rightHand;
    gameState.rightHand = null;
    return `You dropped the ${location.item.name}.\n`;
  }
};
exports.rbButton = rbButton;
