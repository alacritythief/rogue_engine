```
   ▄████████  ▄██████▄     ▄██████▄  ███    █▄     ▄████████
  ███    ███ ███    ███   ███    ███ ███    ███   ███    ███
  ███    ███ ███    ███   ███    █▀  ███    ███   ███    █▀
 ▄███▄▄▄▄██▀ ███    ███  ▄███        ███    ███  ▄███▄▄▄
▀▀███▀▀▀▀▀   ███    ███ ▀▀███ ████▄  ███    ███ ▀▀███▀▀▀
▀███████████ ███    ███   ███    ███ ███    ███   ███    █▄
  ███    ███ ███    ███   ███    ███ ███    ███   ███    ███
  ███    ███  ▀██████▀    ████████▀  ████████▀    ██████████
  ███    ███
  ▄████████ ███▄▄▄▄      ▄██████▄   ▄█  ███▄▄▄▄      ▄████████
  ███    ███ ███▀▀▀██▄   ███    ███ ███  ███▀▀▀██▄   ███    ███
  ███    █▀  ███   ███   ███    █▀  ███▌ ███   ███   ███    █▀
 ▄███▄▄▄     ███   ███  ▄███        ███▌ ███   ███  ▄███▄▄▄
▀▀███▀▀▀     ███   ███ ▀▀███ ████▄  ███▌ ███   ███ ▀▀███▀▀▀
  ███    █▄  ███   ███   ███    ███ ███  ███   ███   ███    █▄
  ███    ███ ███   ███   ███    ███ ███  ███   ███   ███    ███
  ██████████  ▀█   █▀    ████████▀  █▀    ▀█   █▀    ██████████
```

ROGUE Engine v0.1
=================
By Andy Wong

WORK IN PROGRESS

A helpful javascript plugin for creating the base functions needed for a
rougelike game, to be used with RPG Maker MV projects.

Outline:
--------
**Tick 0:**
* Seeds the `$gameMap.eventQueue` with combatant events. This checks for any
events with `isCombatant === true` and `._erased === false`.
* If there are no combatant events, the player and all map events can move freely.

**Tick 1:**
* The player's turn to move or take an action.
* The turn is consumed if the player attacks, moves, or skips the turn.
* Player turning does not consume the turn.

**Tick 2:**
* Combatants take action according to their place in the event queue.
* After a combatant takes action, they are popped from the queue.
* When the queue is empty, the tick moves to 0 to recheck and seed the event
queue.

TODO:
-----
**Refine Event Queue**

On Tick 2, all events should fire off in the event queue, one at a time,
until there are none left. When there are no more combatant events,
the Tick is set to 0.

**Adjust Tick 0**

Have Tick 0 check for combatants and fill the queue.
