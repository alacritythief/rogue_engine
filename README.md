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

NOTES:
-----
Tick 0 - Everyone can move as long as there is no combatants
Tick 1 - The player can move, combatants cannot
Tick 2 - Combatants move, player cannot

TODO:
-----
*Refine Event Queue*

On Tick 2, all events should fire off in the event queue, one at a time,
until there are none left. When there are no more combatant events,
the Tick is set to 1.
