/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Hanoi = window.Hanoi = {};
	var View = Hanoi.View = __webpack_require__(3);//...require appropriate file
	var Game = Hanoi.Game = __webpack_require__(2);//.
	
	$(function () {
	  var rootEl = $('.hanoi');
	  var game = new Hanoi.Game();
	  var view = new View(game, rootEl);
	});


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	function Game () {
	  this.towers = [[3, 2, 1], [], []];
	};
	
	Game.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
	  var startTower = this.towers[startTowerIdx];
	  var endTower = this.towers[endTowerIdx];
	
	  if (startTower.length === 0) {
	    return false;
	  } else if (endTower.length == 0) {
	    return true;
	  } else {
	    var topStartDisc = startTower[startTower.length - 1];
	    var topEndDisc = endTower[endTower.length - 1];
	    return topStartDisc < topEndDisc;
	  }
	};
	
	Game.prototype.isWon = function () {
	  // move all the discs to the last or second tower
	  return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	};
	
	Game.prototype.move = function (startTowerIdx, endTowerIdx) {
	  if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	    this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	    return true;
	  } else {
	    return false;
	  }
	};
	
	Game.prototype.print = function () {
	  console.log(JSON.stringify(this.towers));
	};
	
	Game.prototype.promptMove = function (reader, callback) {
	  this.print();
	  reader.question("Enter a starting tower: ", function (start) {
	    var startTowerIdx = parseInt(start);
	    reader.question("Enter an ending tower: ", function (end) {
	      var endTowerIdx = parseInt(end);
	      callback(startTowerIdx, endTowerIdx)
	    });
	  });
	};
	
	Game.prototype.run = function (reader, gameCompletionCallback) {
	  this.promptMove(reader, (function (startTowerIdx, endTowerIdx) {
	    if (!this.move(startTowerIdx, endTowerIdx)) {
	      console.log("Invalid move!");
	    }
	
	    if (!this.isWon()) {
	      // Continue to play!
	      this.run(reader, gameCompletionCallback);
	    } else {
	      this.print();
	      console.log("You win!");
	      gameCompletionCallback();
	    }
	  }).bind(this));
	};
	
	module.exports = Game;


/***/ },
/* 3 */
/***/ function(module, exports) {

	var View = function(game, $el) {
	  this.game = game;
	  this.$el = $el;
	  this.setupTowers();
	  this.render();
	  this.clicks = [];
	  this.clickTower();
	};
	
	View.prototype.setupTowers = function () {
	  var $stack1 = $("<ul>");
	  $stack1.data("id", 1);
	  $stack1.append($("<li>"), $("<li>"), $("<li>"));
	  var $stack2 = $("<ul>");
	  $stack2.data("id", 2);
	  $stack2.append($("<li>"), $("<li>"), $("<li>"));
	  var $stack3 = $("<ul>");
	  $stack3.data("id", 3);
	  $stack3.append($("<li>"), $("<li>"), $("<li>"));
	  this.$el.append($stack1, [$stack2, $stack3]);
	};
	
	View.prototype.render = function () {
	  console.log("in the render");
	  $("li").removeClass();
	  for (var i = 0; i < this.game.towers.length; i++) {
	    var tower = this.game.towers[i];
	    tower.forEach(function(disk, diskIdx) {
	      var $ul = $("ul");
	      $ul.eq(i).children().eq(($ul.children.length - diskIdx)).addClass("disk-" + disk);
	    });
	  }
	};
	
	View.prototype.clickTower = function(){
	  var that = this;
	  that.$el.children().on("click", function(event){
	    that.clicks.push($(event.currentTarget).data("id"));
	    if (that.clicks.length === 2) {
	      that.makeMove();
	      that.endMove();
	    }
	    else {
	      $(event.currentTarget).addClass("selected");
	    }
	    that.render();
	    if (that.game.isWon()) {
	      alert("You won!");
	    }
	  });
	};
	
	View.prototype.endMove = function () {
	  $("ul").eq(this.clicks[0]-1).removeClass("selected");
	  this.clicks = [];
	};
	
	View.prototype.makeMove = function () {
	  if (this.game.isValidMove) {
	    var startTower = this.clicks[0]-1;
	    var finishTower = this.clicks[1]-1;
	    this.game.move(startTower, finishTower);
	  }
	};
	
	module.exports = View;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map