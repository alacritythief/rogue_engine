//=============================================================================
// Alacrity Studios ROGUE Engine v0.2
// by alacritythief / Andy Wong
// alacritystudios.com
// Date: 1/1/16
//=============================================================================

/*:
 * @plugindesc v0.2 - Helpful functions for creating a roguelike game.
 * @author alacritythief
 *
 * @param SW_ROGUE
 * @desc Switch number for turning roguelike movement on/off (0 to turn it off)
 * @default 1
 * @param SW_CHASE
 * @desc Switch number for turning event chase mode on/off (0 to turn it off)
 * @default 2
 * @param DISTANCE
 * @desc Distance for chase activation (1-10, 10 is about 640x640 pixels in screen size)
 * @default 5
 * @param HIDE_OPACITY
 * @desc Opacity of the enemy when player is not in range (0-255)
 * @default 128
 * @param BALLOON
 * @desc Pop-up Balloon type (1-10, 0 to turn it Off)
 * @default 1
 * @param CHASE_SPEED
 * @desc Enemy Speed when chasing the player (0-6)
 * @default 4
 * @param CHASE_FREQUENCY
 * @desc Enemy Move Frequency when chasing the player (0-6)
 * @default 6
 * @param DEFAULT_SPEED
 * @desc Enemy Move Speed when not chasing the player (0-6)
 * @default 4
 * @param DEFAULT_FREQUENCY
 * @desc Enemy Move Frequency when not chasing the player (0-6)
 * @default 3
*/

/*
NOTES:
-----

Interesting functions to research for additions:

$gamePlayer and events
----------------------

.isCollidedWithEvents(x,y) or none - checks collision with event
.forceMoveForward() - makes player move forward regardless of collision
.jump(x,y) - makes player jump on object, (0,0) makes the player hop in place
._direction - direction of player

Event only
----------

.isCollidedWithPlayerCharacters(x,y)

Regex
-----

event.event().name.indexOf("<enemy>") >= 0
returns true if match, false otherwise

Game Switches / Variables
-------------------------

$gameSwitces._data[1]
Gets true or false from # of switch. There is undefined always at switch 0.

*/

(function() {
  var parameters = PluginManager.parameters('ALS_rogue_engine');

  Game_Event.prototype.distanceFromPlayer = function() {
    var sx = Math.abs(this.deltaXFrom($gamePlayer.x));
    var sy = Math.abs(this.deltaYFrom($gamePlayer.y));
    return sx + sy;
  };

  Game_Event.prototype.moveTypeTowardPlayer = function() {
    if (this.event().name.indexOf('<roguelike>') >= 0 && this.distanceFromPlayer() <= Number(parameters['DISTANCE'])) {
      this.moveTowardPlayer()
    } else {
      if (this.isNearThePlayer()) {
          switch (Math.randomInt(6)) {
          case 0: case 1: case 2: case 3:
              this.moveTowardPlayer();
              break;
          case 4:
              this.moveRandom();
              break;
          case 5:
              this.moveForward();
              break;
          }
      } else {
          this.moveRandom();
      }
    }
  };

  Game_Event.prototype.updateStop = function() {
    if ($gameSwitches._data[Number(parameters['SW_ROGUE'])] && this.event().name.indexOf('<roguelike>') >= 0) {
      if ($gamePlayer.isMoving()) {
        Game_Character.prototype.updateStop.call(this);
        if (!this.isMoveRouteForcing()) {
            this.updateSelfMovement();
        }
      }
    } else {
      if (this._locked) {
          this.resetStopCount();
      }
      Game_Character.prototype.updateStop.call(this);
      if (!this.isMoveRouteForcing()) {
          this.updateSelfMovement();
      }
    }
  };

  // Prevents Balloon from looping it's animation like crazy
  Game_Event.prototype.balloonActivated = false;

  Game_Event.prototype.chasePlayer = function() {
    if (this.distanceFromPlayer() <= Number(parameters['DISTANCE'])) {
      if (!this.balloonActivated && !this._erased) {
        this._balloonId = Number(parameters['BALLOON']);
        this.balloonActivated = true;
      }
      this._opacity = 255;
      this._moveSpeed = Number(parameters['CHASE_SPEED']);
      this._moveFrequency = Number(parameters['CHASE_FREQUENCY']);
    } else {
      this.balloonActivated = false;
      this._opacity = Number(parameters['HIDE_OPACITY']);
      this._moveSpeed = Number(parameters['DEFAULT_SPEED']);
      this._moveFrequency = Number(parameters['DEFAULT_FREQUENCY']);
    }
  };

  Game_Event.prototype.update = function() {
    if (this.event().name.indexOf('<roguelike>') >= 0 && !$gameMap._interpreter.isRunning()) {
      if ($gameSwitches._data[Number(parameters['SW_CHASE'])]) {
        this.chasePlayer();
      }
      Game_Character.prototype.update.call(this);
      this.checkEventTriggerAuto();
      this.updateParallel();
    }
  };

})();
