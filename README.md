# Memory Game

Create a simple memory game of match pairs 
(https://en.wikipedia.org/wiki/Concentration_(game))

The board should be a 6x6 Grid (36 tiles in total).

When the game begins all tiles are blank.
When a user clicks on the first tile it should show an image behind it. When the user clicks on the second tile, there are 2 cases:
1) If tiles match - after a second both of the images should be replaced with an image that signifies that a match was made, and those tiles should no longer be clickable.
2) If tiles don't match - after a second of showing images behind tiles, they should hide, and the game continues.

After all, tiles are matched - the board should hide and display a "Congratulations" message to the user, and the game should restart in a couple of seconds.

Note: only 2 tiles should be clickable at the same time.

### Bonus task
Implement radio button selection of game difficulty level - the higher the level - the quicker the tiles hide when tiles do not match.
  
  
### Project setup
This small task should cover a basic understanding of Javascript, HTML, CSS and handling logical problems. As this is not a standard app, we're not expecting a bug-free result. 