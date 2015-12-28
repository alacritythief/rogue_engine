// Rogue.js
// Roguelike functions

/*

Needed functions:

- Collision detection, check if player is next to and facing the enemy
- Game loop / event queue, player first then enemy first
- Functions should work regardless if they are in the game or not

*/


// For the game loop, have it tick between 1 (player) and 2 (enemies).
// Have a 0 tick for special occasions where all events need to be halted.

// gameTick starts at 0, for initialization. Each map change sets the tick back
// to zero.
var gameTick = 0;

function tickTock() {
  if (gameTick === 0) {
    gameTick = 1;
  } else if (gameTick === 1) {
    gameTick = 2;
  } else if (gameTick === 2) {
    gameTick = 1;
  }
  console.log('gameTick = ' + gameTick); // For debugging
}

// Funciton to reset gameTick to 0
function resetGameLoop() {
  gameTick = 0;
  console.log('gameTick = ' + gameTick); // for debugging
}

/*
Samples for collision detection:
Facing directions: 8 - up, 2 - down, 4 - left, 6 - right

Math.abs(($gameMap.event(this._eventId).x - $gamePlayer.x)) == 0 && ($gameMap.event(this._eventId).y - $gamePlayer.y) == -1 && $gamePlayer.direction() == 8
Math.abs(($gameMap.event(this._eventId).x - $gamePlayer.x)) == 0 && ($gameMap.event(this._eventId).y - $gamePlayer.y) == 1 && $gamePlayer.direction() == 2
Math.abs(($gameMap.event(this._eventId).y - $gamePlayer.y)) == 0 && ($gameMap.event(this._eventId).x - $gamePlayer.x) == -1 && $gamePlayer.direction() == 4
Math.abs(($gameMap.event(this._eventId).y - $gamePlayer.y)) == 0 && ($gameMap.event(this._eventId).x - $gamePlayer.x) == 1 && $gamePlayer.direction() == 6
*/


// Checks if player can attack enemy
function canPlayerAttack(playerX, playerY, playerDirection, eventX, eventY) {
  if ((Math.abs(eventX - playerX) === 0) && (eventY - playerY === -1) && playerDirection === 8) {
    return true;
  } else if ((Math.abs(eventX - playerX) === 0) && (eventY - playerY === 1) && playerDirection === 2) {
    return true;
  } else if ((Math.abs(eventY - playerY) === 0) && (eventX - playerX === -1) && playerDirection === 4) {
    return true;
  } else if ((Math.abs(eventY - playerY) === 0) && (eventX - playerX === 1) && playerDirection === 6) {
    return true;
  } else {
    return false;
  }
}

// Checks if enemy can attack player
function canEnemyAttack(playerX, playerY, enemyDirection, eventX, eventY) {
  if ((Math.abs(eventX - playerX) === 0) && (eventY - playerY === -1) && enemyDirection === 8) {
    return true;
  } else if ((Math.abs(eventX - playerX) === 0) && (eventY - playerY === 1) && enemyDirection === 2) {
    return true;
  } else if ((Math.abs(eventY - playerY) === 0) && (eventX - playerX === -1) && enemyDirection === 4) {
    return true;
  } else if ((Math.abs(eventY - playerY) === 0) && (eventX - playerX === 1) && enemyDirection === 6) {
    return true;
  } else {
    return false;
  }
}
