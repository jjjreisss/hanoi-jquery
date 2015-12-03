var Hanoi = window.Hanoi = {};
var View = Hanoi.View = require("./hanoi-view.js");//...require appropriate file
var Game = Hanoi.Game = require("../../hanoi-core-solution/src/game.js");//.

$(function () {
  var rootEl = $('.hanoi');
  var game = new Hanoi.Game();
  var view = new View(game, rootEl);
});
