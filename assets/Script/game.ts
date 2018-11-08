import enemy from "./enemy";
import bullet from "./bullet";
import hero from "./hero";
import GameOver from "./GameOver";



const { ccclass, property } = cc._decorator;

@ccclass
export default class game extends cc.Component {

    @property(cc.Node)
    bg1: cc.Node = null;

    @property(cc.Node)
    bg2: cc.Node = null;


    @property(cc.Label)
    lb: cc.Label = null;

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
    /** 得分*/
    private fun: number = 0;

    @property(hero)
    hero: hero = null;
    // 飞机的ts 文件
    private heroTs: hero;

    @property(cc.Prefab)
    gameOverPop: GameOver = null;

    over: GameOver = null;

    onLoad() {
        //开启碰撞检测|开启绘制区域
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;

        this.over = cc.instantiate(this.gameOverPop).getComponent("GameOver");

        this.createEnemyPool();

        if (cc.director.isPaused()) {
            cc.director.resume();
        }

    }

    private time = 0;
    start() {

        this.heroTs = this.hero.getComponent("hero");
        this.heroTs.setGame(this)
        this.schedule(this.createEnemy, 1)
        this.schedule(this.createBullet, 0.3)
        this.schedule(this.addTime, 1);
    }


    private addTime() {
        this.time++;
    }

    public gameOver() {
        cc.sys.localStorage.setItem('fun', this.fun + "");
        cc.director.pause();
        this.node.addChild(this.over.node);
        this.over.node.setPosition(cc.v2(-240, -240));
    };

    /**
     初始化敌机和子弹对象池
    */
    public createEnemyPool() {
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
        em.setGame(this);

        let hp = 100 + Math.random() * this.time;
        em.setMaxHp(hp)
        em.setHp(hp);
        em.setspeed((30 + Math.random() * 25) * 10);
        this.node.addChild(enemy)

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
        bullet.setGame(this);
        bullet.setAtt(35);
        this.node.addChild(enemy)
        enemy.setPosition(cc.v2(this.hero.node.x, this.hero.node.y + 30))
    }



    /**增加得分 */
    public addFraction(em: enemy) {
        let exp = Math.floor(em.getMaxHp() / 100);
        this.heroTs.addExp(exp);
        this.fun += exp;
        this.lb.string = "得分：" + this.fun
        this.gcEnemy(em)
    }

    /**回收子弹资源 */
    public gcBullet(bullet: bullet) {
        this.bulletPool.put(bullet.node);
    }

    /**回收敌机资源 */
    public gcEnemy(em: enemy) {
        this.enemyPool.put(em.node);
    }




    update(dt) {

      
        
        


        this.bg1.y = this.bg1.y - dt*120;
        this.bg2.y = this.bg2.y - dt*120;
        if (this.bg1.y <= -960) {
            this.bg1.y = 0;
            this.bg2.y = 960;
        }

    }
}
