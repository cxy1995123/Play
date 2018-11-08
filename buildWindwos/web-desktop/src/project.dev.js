window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  GameOver: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a1fe0XcQYFLBYtFIhwCrHp8", "GameOver");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GameOver = function(_super) {
      __extends(GameOver, _super);
      function GameOver() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.replay = null;
        return _this;
      }
      GameOver.prototype.onLoad = function() {
        this.replay.node.once(cc.Node.EventType.TOUCH_START, this.onTouch, this);
      };
      GameOver.prototype.start = function() {};
      GameOver.prototype.onTouch = function(event) {
        cc.director.loadScene("Secend");
      };
      GameOver.prototype.onDestroy = function() {};
      __decorate([ property(cc.Button) ], GameOver.prototype, "replay", void 0);
      GameOver = __decorate([ ccclass ], GameOver);
      return GameOver;
    }(cc.Component);
    exports.default = GameOver;
    cc._RF.pop();
  }, {} ],
  Main: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3ceaffcSYlBm6eaDaSfIrD1", "Main");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Main = function(_super) {
      __extends(Main, _super);
      function Main() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.startBtn = null;
        _this.progressBar = null;
        _this.progressStr = null;
        _this.loadStatus = null;
        _this.loadingCallBack = function(completedCount, totalCount, item) {
          _this.progressBar.progress = completedCount / totalCount;
          _this.progressStr.string = completedCount + "/" + totalCount;
          _this.loadStatus.string = "\u6b63\u5728\u52a0\u8f7d";
        };
        _this.loadedCallBack = function(error) {
          _this.startBtn.node.opacity = 255;
          _this.loadStatus.string = "\u52a0\u8f7d\u5b8c\u6210";
          cc.director.loadScene("Secend");
        };
        return _this;
      }
      Main.prototype.onLoad = function() {
        cc.debug.setDisplayStats(true);
        cc.game.setFrameRate(60);
        this.startBtn.node.on(cc.Node.EventType.TOUCH_START, this.onToucn, this);
      };
      Main.prototype.start = function() {
        var value = cc.sys.localStorage.getItem("fun");
        console.log("\u83b7\u53d6\u5b58\u50a8\u6570\u636e:" + value);
      };
      Main.prototype.startGame = function() {
        cc.director.preloadScene("Secend", this.loadingCallBack, this.loadedCallBack);
      };
      Main.prototype.onToucn = function(event) {
        this.startGame();
      };
      Main.prototype.onRequest = function() {
        var request = new XMLHttpRequest();
        request.onreadystatechange = this.onResponse;
        request.open("GET", "https://www.baidu.com/", true);
        request.send();
      };
      Main.prototype.onResponse = function() {
        console.log(this.readyState);
        console.log(this.responseText);
      };
      Main.prototype.onDisable = function() {
        console.log(this.startBtn.node);
        this.startBtn.node.off(cc.Node.EventType.TOUCH_START, this.onToucn, this);
      };
      Main.prototype.onDestroy = function() {
        console.log(this.startBtn.node);
      };
      __decorate([ property(cc.Button) ], Main.prototype, "startBtn", void 0);
      __decorate([ property(cc.ProgressBar) ], Main.prototype, "progressBar", void 0);
      __decorate([ property(cc.Label) ], Main.prototype, "progressStr", void 0);
      __decorate([ property(cc.Label) ], Main.prototype, "loadStatus", void 0);
      Main = __decorate([ ccclass ], Main);
      return Main;
    }(cc.Component);
    exports.default = Main;
    cc._RF.pop();
  }, {} ],
  RoundUtilds: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6adef+vx2lCApaBONCUUO6r", "RoundUtilds");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var RoundUtids = function() {
      function RoundUtids() {}
      RoundUtids.BoundaryDetection = function(num, maxNum, minNum) {
        return num > 0 ? Math.min(num, maxNum) : Math.max(num, minNum);
      };
      return RoundUtids;
    }();
    exports.RoundUtids = RoundUtids;
    cc._RF.pop();
  }, {} ],
  bullet: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ccfd7h5JBxERa+7q40WDWME", "bullet");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var bullet = function(_super) {
      __extends(bullet, _super);
      function bullet() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.game = null;
        _this.att = 0;
        _this.speed = 700;
        return _this;
      }
      bullet.prototype.setAtt = function(att) {
        this.att = att;
      };
      bullet.prototype.getAtt = function() {
        return this.att;
      };
      bullet.prototype.setGame = function(game) {
        this.game = game;
      };
      bullet.prototype.start = function() {};
      bullet.prototype.onCollisionEnter = function(other, self) {
        var enemy = other.getComponent("enemy");
        var bullet = self.getComponent("bullet");
        var hp3 = enemy.getHp() - bullet.getAtt();
        if (hp3 <= bullet.getAtt()) this.game.addFraction(enemy); else {
          enemy.changeHp(bullet.getAtt()) && this.game.addFraction(enemy);
          self.node.removeFromParent();
        }
      };
      bullet.prototype.update = function(dt) {
        this.node.y = this.node.y + this.speed * dt;
        this.node.y > 500 && this.node.removeFromParent();
      };
      bullet = __decorate([ ccclass ], bullet);
      return bullet;
    }(cc.Component);
    exports.default = bullet;
    cc._RF.pop();
  }, {} ],
  enemy: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "48a39GrXS9FubLIO6/oQszx", "enemy");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var enemy = function(_super) {
      __extends(enemy, _super);
      function enemy() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.hp = 0;
        _this.speed = 0;
        _this.maxHp = 0;
        _this.hpPrg = null;
        _this.game = null;
        return _this;
      }
      enemy.prototype.setGame = function(game) {
        this.game = game;
      };
      enemy.prototype.setHp = function(hp) {
        this.hp = hp;
        this.hpPrg.progress = 1;
      };
      enemy.prototype.setMaxHp = function(hp) {
        this.maxHp = hp;
      };
      enemy.prototype.getMaxHp = function() {
        return this.maxHp;
      };
      enemy.prototype.getHp = function() {
        return this.hp;
      };
      enemy.prototype.changeHp = function(att) {
        if (att >= this.hp) {
          this.hpPrg.progress = 0;
          this.setHp(0);
          return true;
        }
        this.setHp(this.hp - att);
        this.hpPrg.progress = (this.hp - att) / this.maxHp;
        return false;
      };
      enemy.prototype.setspeed = function(speed) {
        this.speed = speed;
      };
      enemy.prototype.update = function(dt) {
        this.node.y = this.node.y - this.speed * dt;
        this.node.y < -520 && this.node.removeFromParent();
      };
      __decorate([ property(cc.ProgressBar) ], enemy.prototype, "hpPrg", void 0);
      enemy = __decorate([ ccclass ], enemy);
      return enemy;
    }(cc.Component);
    exports.default = enemy;
    cc._RF.pop();
  }, {} ],
  game: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "28b033exdpOGLZl5TykuUYQ", "game");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var hero_1 = require("./hero");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var game = function(_super) {
      __extends(game, _super);
      function game() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bg1 = null;
        _this.bg2 = null;
        _this.lb = null;
        _this.enemyPrefab = null;
        _this.enemyPool = null;
        _this.bulletPrefab = null;
        _this.bulletPool = null;
        _this.fun = 0;
        _this.hero = null;
        _this.gameOverPop = null;
        _this.over = null;
        _this.time = 0;
        return _this;
      }
      game.prototype.onLoad = function() {
        cc.director.getCollisionManager().enabled = true;
        this.over = cc.instantiate(this.gameOverPop).getComponent("GameOver");
        this.createEnemyPool();
        cc.director.isPaused() && cc.director.resume();
      };
      game.prototype.start = function() {
        this.heroTs = this.hero.getComponent("hero");
        this.heroTs.setGame(this);
        this.schedule(this.createEnemy, 1);
        this.schedule(this.createBullet, .3);
        this.schedule(this.addTime, 1);
      };
      game.prototype.addTime = function() {
        this.time++;
      };
      game.prototype.gameOver = function() {
        cc.sys.localStorage.setItem("fun", this.fun + "");
        cc.director.pause();
        this.node.addChild(this.over.node);
        this.over.node.setPosition(cc.v2(-240, -240));
      };
      game.prototype.createEnemyPool = function() {
        this.enemyPool = new cc.NodePool();
        var initCount = 10;
        for (var i = 0; i < initCount; ++i) {
          var enemy_1 = cc.instantiate(this.enemyPrefab);
          this.enemyPool.put(enemy_1);
        }
        this.bulletPool = new cc.NodePool();
        var count2 = 20;
        for (var i2 = 0; i2 < count2; ++i2) {
          var bullet_1 = cc.instantiate(this.bulletPrefab);
          this.bulletPool.put(bullet_1);
        }
      };
      game.prototype.createEnemy = function() {
        var enemy = null;
        enemy = this.enemyPool.size() > 0 ? this.enemyPool.get() : cc.instantiate(this.enemyPrefab);
        var em = enemy.getComponent("enemy");
        em.setGame(this);
        var hp = 100 + Math.random() * this.time;
        em.setMaxHp(hp);
        em.setHp(hp);
        em.setspeed(10 * (30 + 25 * Math.random()));
        this.node.addChild(enemy);
        Math.random() > .5 ? enemy.setPosition(cc.v2(-(1 + 220 * Math.random()), 480)) : enemy.setPosition(cc.v2(1 + 220 * Math.random(), 480));
      };
      game.prototype.createBullet = function() {
        var enemy = null;
        enemy = this.bulletPool.size() > 0 ? this.bulletPool.get() : cc.instantiate(this.bulletPrefab);
        var bullet = enemy.getComponent("bullet");
        bullet.setGame(this);
        bullet.setAtt(35);
        this.node.addChild(enemy);
        enemy.setPosition(cc.v2(this.hero.node.x, this.hero.node.y + 30));
      };
      game.prototype.addFraction = function(em) {
        var exp = Math.floor(em.getMaxHp() / 100);
        this.heroTs.addExp(exp);
        this.fun += exp;
        this.lb.string = "\u5f97\u5206\uff1a" + this.fun;
        this.gcEnemy(em);
      };
      game.prototype.gcBullet = function(bullet) {
        this.bulletPool.put(bullet.node);
      };
      game.prototype.gcEnemy = function(em) {
        this.enemyPool.put(em.node);
      };
      game.prototype.update = function(dt) {
        this.bg1.y = this.bg1.y - 120 * dt;
        this.bg2.y = this.bg2.y - 120 * dt;
        if (this.bg1.y <= -960) {
          this.bg1.y = 0;
          this.bg2.y = 960;
        }
      };
      __decorate([ property(cc.Node) ], game.prototype, "bg1", void 0);
      __decorate([ property(cc.Node) ], game.prototype, "bg2", void 0);
      __decorate([ property(cc.Label) ], game.prototype, "lb", void 0);
      __decorate([ property(cc.Prefab) ], game.prototype, "enemyPrefab", void 0);
      __decorate([ property(cc.Prefab) ], game.prototype, "bulletPrefab", void 0);
      __decorate([ property(hero_1.default) ], game.prototype, "hero", void 0);
      __decorate([ property(cc.Prefab) ], game.prototype, "gameOverPop", void 0);
      game = __decorate([ ccclass ], game);
      return game;
    }(cc.Component);
    exports.default = game;
    cc._RF.pop();
  }, {
    "./hero": "hero"
  } ],
  hero: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "068d1UijRRIIpCnQf3Qm/mv", "hero");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var RoundUtilds_1 = require("./RoundUtilds");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var hero = function(_super) {
      __extends(hero, _super);
      function hero() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.moveX = 0;
        _this.moveY = 0;
        _this.game = null;
        _this.gameOver = false;
        _this.att = 30;
        _this.Lv = 1;
        _this.exp = 1;
        return _this;
      }
      hero.prototype.isLvUp = function() {
        switch (this.Lv) {
         case 1:
          this.exp > 30 && this.lvUp();
          break;

         case 2:
          this.exp > 200 && this.lvUp();
          break;

         case 3:
          this.exp > 400 && this.lvUp();
          break;

         case 4:
          this.exp > 800 && this.lvUp();
          break;

         case 5:
          this.exp > 1600 && this.lvUp();
          break;

         case 6:
          this.exp > 3200 && this.lvUp();
          break;

         case 7:
          this.exp > 6400 && this.lvUp();
          break;

         case 8:
          this.exp > 12800 && this.lvUp();
          break;

         case 9:
          this.exp > 51200 && this.lvUp();
          break;

         case 10:
          this.exp > 102400 && this.lvUp();
        }
      };
      hero.prototype.addExp = function(exp) {
        this.exp += exp;
        this.isLvUp();
      };
      hero.prototype.lvUp = function() {
        console.log("\u5347\u7ea7\u4e86...");
        this.att += 35;
        this.Lv += 1;
      };
      hero.prototype.setGame = function(game) {
        this.game = game;
      };
      hero.prototype.onLoad = function() {
        var Animation = this.node.getComponent(cc.Animation);
        Animation.play("anim1");
      };
      hero.prototype.start = function() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
      };
      hero.prototype.onTouchMove = function(event) {
        var x = event.getLocationX() - 320 - this.moveX;
        var y = event.getLocationY() - 480 - this.moveY;
        this.node.x = RoundUtilds_1.RoundUtids.BoundaryDetection(x, 320, -320);
        this.node.y = RoundUtilds_1.RoundUtids.BoundaryDetection(y, 480, -480);
      };
      hero.prototype.onTouchStart = function(event) {
        this.moveX = event.getLocationX() - this.node.x - 320;
        this.moveY = event.getLocationY() - this.node.y - 480;
      };
      hero.prototype.onDestroy = function() {
        if (this.node.hasEventListener(cc.Node.EventType.TOUCH_START)) {
          this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
          this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        }
      };
      hero.prototype.onCollisionEnter = function(other, self) {
        this.game.gameOver();
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        console.log("game over");
      };
      hero.prototype.update = function(dt) {};
      hero = __decorate([ ccclass ], hero);
      return hero;
    }(cc.Component);
    exports.default = hero;
    cc._RF.pop();
  }, {
    "./RoundUtilds": "RoundUtilds"
  } ]
}, {}, [ "GameOver", "Main", "RoundUtilds", "bullet", "enemy", "game", "hero" ]);