//=============================================================================
// Alacrity Studios ROGUE Engine v0.1
// by alacritythief / Andy Wong
// alacritystudios.com
// Date: 12/28/15
//=============================================================================

/*:
 * @plugindesc v0.1 - Plugin for creating Roguelike games, with helpful functions.
 * @author alacritythief
 *
 * @param Default Game Tick
 * @desc Determines default game tick state for each map.
 * @default 0
 * @param Default Player Tick
 * @desc Sets which tick (0,1,2) is when the player is able to take action.
 * @default 1
 * @param Default Event Tick
 * @desc Sets which tick (0,1,2) is when a event is able to take action.
 * @default 2
*/

(function() {

  var parameters = PluginManager.parameters('RogueEngine');

  Game_Map.prototype.getTick = Number(parameters['Default Game Tick'] || 0) // Sets default game loop state
  Game_Map.prototype.nextTick = function() {
    if (this.getTick === 0) {
      this.getTick = 1;
    } else if (this.getTick === 1) {
      this.getTick = 2;
    } else if (this.getTick === 2) {
      this.getTick = 1;
    }
    return this.getTick;
  }
  Game_Map.prototype.resetTick = function() {
    this.getTick = 0;
    return this.getTick;
  }
  Game_CharacterBase.prototype.tickTrigger = Number(parameters['Default Player Tick'] || 1)
  Game_Event.prototype.tickTrigger = Number(parameters['Default Event Tick'] || 2)
  Game_Event.prototype.isNextToThePlayer = function() {
      var sx = Math.abs(this.deltaXFrom($gamePlayer.x));
      var sy = Math.abs(this.deltaYFrom($gamePlayer.y));
      return sx + sy <= 1;
  }
  Game_Event.prototype.isAttackableByPlayer = function () {
    if (this.isNextToThePlayer) {
      if ((Math.abs(this._x - $gamePlayer._x) === 0) && (this._y - $gamePlayer._y === -1) && $gamePlayer.direction() === 8) {
        return true;
      } else if ((Math.abs(this._x - $gamePlayer._x) === 0) && (this._y - $gamePlayer._y === 1) && $gamePlayer.direction() === 2) {
        return true;
      } else if ((Math.abs(this._y - $gamePlayer._y) === 0) && (this._x - $gamePlayer._x === -1) && $gamePlayer.direction() === 4) {
        return true;
      } else if ((Math.abs(this._y - $gamePlayer._y) === 0) && (this._x - $gamePlayer._x === 1) && $gamePlayer.direction() === 6) {
        return true;
      } else {
        return false;
      }
    }
  }
  Game_Event.prototype.canAttackPlayer = function () {
    if (this.isNextToThePlayer) {
      if ((Math.abs($gamePlayer._x - this._x) === 0) && ($gamePlayer._y - this._y === -1) && this.direction() === 8) {
        return true;
      } else if ((Math.abs($gamePlayer._x - this._x) === 0) && ($gamePlayer._y - this._y === 1) && this.direction() === 2) {
        return true;
      } else if ((Math.abs($gamePlayer._y - this._y) === 0) && ($gamePlayer._x - this._x === -1) && this.direction() === 4) {
        return true;
      } else if ((Math.abs($gamePlayer._y - this._y) === 0) && ($gamePlayer._x - this._x === 1) && this.direction() === 6) {
        return true;
      } else {
        return false;
      }
    }
  }

})();
