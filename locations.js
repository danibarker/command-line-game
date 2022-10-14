const _ = require("lodash");

const locations = [
  [
    {
      name: "Home Area",
      weapon: {
        name: "Sword[weapon]",
        damage: 10,
        yButton: () => {
          return "You swing your sword at the air. You feel like a badass\n";
        },
        xButton: (enemy) => {
          return `You swing your sword at the ${enemy.name}.  You do 10 damage.\n`;
        },
      },
      item: null,
      enemy: null,
      description: `You are in your home area.\n`,
      action: () => {
        return "There isn't anything to do here. You don't like it\n";
      },
    },
    {
      name: "Old House",
      weapon: null,
      item: {
        name: "Potion[item]",
        bButton: (gameState) => {
          gameState.life += 100;
          gameState.rightHand = null;
          return "You drink the potion. You feel better.\n";
        },
      },
      enemy: null,
      description: "You are in an old house.\n",
      action: () => {
        return "You look around the house and hear spooky noises.  You don't like noises\n";
      },
    },
    {
      name: "Swamp",
      weapon: null,
      item: null,
      enemy: {
        name: "Ogre",
        life: 60,
        damage: 5,
        xp: 3,
      },
      description: "You are in a swamp.\n",
      action: () => {
        return "It's moist.  You don't like it.\n";
      },
    },
  ],
  [
    {
      name: "Forest",
      weapon: null,
      item: null,
      enemy: {
        name: "Goblin",
        life: 200,
        damage: 10,
        xp: 20,
      },
      description: "You are in a forest.\n",
      action: () => {
        return "You look around and see a bunch of trees.  You don't like trees.\n";
      },
    },
    {
      name: "Cave",
      weapon: {
        name: "Amulet[weapon]",
        damage: 300,
        yButton: () => {
          return "You wave your amulet around.  You feel powerful.  Might be useful later\n";
        },

        xButton: (enemy) => {
          if (enemy.name === "King") {
            return `You hold the amulet up at the ${enemy.name}.  You do 300 damage.\n`;
          } else {
            return `You hold the amulet up at the ${enemy.name}.  It has no effect.\n`;
          }
        },
      },
      item: {
        name: "Poison[item]",
        bButton: (gameState) => {
          gameState.life = 0;
          gameState.resetGame();
          return "You drink the poison. That wasn't a great idea. You're dead.\n";
        },
      },
      enemy: null,
      description: "You are in a cave.\n",
      action: () => {
        return "You look around and see a bunch of rocks.  You don't like rocks.\n";
      },
    },
    {
      name: "Castle",
      weapon: null,
      item: null,
      enemy: {
        name: "King",
        life: 1000,
        damage: 60,
        xp: 600,
      },
      description: "You are in a castle.\n",
      action: () => {
        return "You look around the castle.  This must be the final boss.  You better be ready before you attack.\n";
      },
    },
  ],
  [
    {
      name: "Desert",
      weapon: null,
      item: null,
      enemy: {
        name: "Sand Worm",
        life: 100,
        damage: 20,
        xp: 50,
      },
      description: "You are in a desert.\n",
      action: () => {
        return "You look at all the sand.  You don't like sand. It's coarse and rough and irritating and it gets everywhere.\n";
      },
    },
    {
      name: "Mountain",
      weapon: null,
      item: {
        name: "Rocks[item]",
        bButton: (gameState) => {
          gameState.rightHand = null;
          return "You throw the rocks at the ground.  You feel better.\n";
        },
      },
      enemy: {
        name: "Giant",
        life: 100,
        damage: 45,
        xp: 45,
      },
      description: "You are in a mountain.\n",
      action: () => {
        return "You look up into the mountains and yell.  There is an echo. You feel better.\n";
      },
    },
    {
      name: "Volcano",
      weapon: {
        name: "Fire[weapon]",
        damage: 20,
        yButton: (gameState) => {
          gameState.life -= 20;
          let message =
            "You throw fire at the air.  You feel like a badass.  But it lands on your head and you take 20 damage.\n";
          if (gameState.life <= 0) {
            message += " You're dead.\n";
            gameState.resetGame();
          }
          return message;
        },
        xButton: (enemy) => {
          return `You throw fire at the ${enemy.name}.  You do 20 damage.\n`;
        },
      },
      item: {
        name: "tiny little friend[item]",
        bButton: (gameState) => {
          gameState.life += 200;
          gameState.rightHand = null;
          return "You pet your tiny little friend.  She's so cute.  She smiles at you and dies.  You gain 200 life.  Congratulations.\n";
        },
      },
      enemy: null,
      description: "You are in a volcano.\n",
      action: () => {
        return "You look around in the volcano.  Not sure why the lava doesn't kill you.  The warmth makes you feel good.\n";
      },
    },
  ],
];

const getLocations = () => {
  // returns a new copy of the original locations
  return _.cloneDeep(locations);
};

exports.getLocations = getLocations;
