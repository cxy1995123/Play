import bullet from "./bullet";
import enemy from "./enemy";
import game from "./game";
import hero from "./hero";
import GameOver from "./GameOver";
const { ccclass, property } = cc._decorator;

@ccclass
export default class ResourceManager extends cc.Component {


    /** 敌机预制资源*/
    @property(cc.Prefab)
    enemyPrefab: cc.Prefab = null;
    /** 敌机对象池*/
    private enemyPool: cc.NodePool = null;

    /** 子弹资源*/
    @property(cc.Prefab)
    bulletPrefab: cc.Prefab = null;
    /** 子弹对象池*/
    private bulletPool: cc.NodePool = null;

    @property(cc.Prefab)
    gameOverPop: cc.Prefab = null;

    public game: game = null;

    private over: GameOver = null;

    private time = 0;


    @property(hero)
    heroPro: hero = null;

    private hero: hero = null;

    onLoad() {
        this.game = this.node.getComponent("game");
        this.hero = this.heroPro.getComponent("hero");
        this.createResPool();

        this.over = cc.instantiate(this.gameOverPop).getComponent("GameOver");
    }

    private addTime() {
        this.time++;
        console.log(this.time);

    }

    start() {
        //计时器
        this.schedule(this.addTime, 1);
        //飞机子弹
        this.schedule(this.createEnemy, 1)
        this.schedule(this.createBullet, 0.3)
        this.hero.setResourceManager(this)
    }




    /**
    初始化敌机和子弹对象池
   */
    public createResPool() {
        this.enemyPool = new cc.NodePool();
        let initCount = 10;
        for (let i = 0; i < initCount; ++i) {
            let enemy = cc.instantiate(this.enemyPrefab); // 创建节点
            this.enemyPool.put(enemy); // 通过 putInPool 接口放入对象池
        }

        this.bulletPool = new cc.NodePool();
        let count2 = 20

        for (let i2 = 0; i2 < count2; ++i2) {
            let bullet = cc.instantiate(this.bulletPrefab)
            this.bulletPool.put(bullet);
        }
    }


    /**
  创建敌人
  */
    public createEnemy() {
        let enemy: cc.Node = null;
        if (this.enemyPool.size() > 0) {
            enemy = this.enemyPool.get();
        } else {
            enemy = cc.instantiate(this.enemyPrefab);
        }
        let em: enemy = enemy.getComponent("enemy");
        em.setGame(this.game);

        let hp = 100 + 2 * this.time;
        em.init(this.game, hp, (30 + Math.random() * 15) * 10)
        this.node.addChild(enemy);

        if (Math.random() > 0.5) {
            enemy.setPosition(cc.v2(- (1 + Math.random() * 220), 480))
        } else {
            enemy.setPosition(cc.v2(1 + Math.random() * 220, 480))
        }
    }

    /** 
    创建子弹
    */
    public createBullet() {
        let enemy: cc.Node = null;
        if (this.bulletPool.size() > 0) {
            enemy = this.bulletPool.get();
        } else {
            enemy = cc.instantiate(this.bulletPrefab);
        }
        let bullet: bullet = enemy.getComponent("bullet");
        bullet.setGame(this.game);
        bullet.setAtt(this.hero.att);
        this.node.addChild(enemy)
        enemy.setPosition(cc.v2(this.hero.node.x, this.hero.node.y + 30))
    }

    /**回收子弹资源 */
    public gcBullet(bullet: bullet) {
        this.bulletPool.put(bullet.node);
    }

    /**回收敌机资源 */
    public gcEnemy(em: enemy) {

        this.enemyPool.put(em.node);
    }


    public gameOver() {
        this.node.addChild(this.over.node);
        this.over.node.setPosition(cc.v2(-240, -240));
        // this.node.removeFromParent();
        // this.node.removeFromParent();
        cc.director.pause();




    }

    // update (dt) {}
}
