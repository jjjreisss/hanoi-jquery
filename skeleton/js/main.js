var HanoiView = require("./hanoiView.js");//...require appropriate file
var HanoiGame = require("../../hanoi-core-solution/src/game.js");//.

$(function () {
  var rootEl = $('.hanoi');
  var game = new HanoiGame();
  new HanoiView(game,rootEl);
});
