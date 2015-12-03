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
