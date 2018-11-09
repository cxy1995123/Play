import enemy from "./enemy";
import bullet from "./bullet";
import hero from "./hero";
import GameOver from "./GameOver";
import ResourceManager from "./ResourceManager";



const { ccclass, property } = cc._decorator;

@ccclass
export default class game extends cc.Component {

    @property(cc.Node)
    bg1: cc.Node = null;

    @property(cc.Node)
    bg2: cc.Node = null;


    @property(cc.Label)
    lb: cc.Label = null;


    /** 得分*/
    private fun: number = 0;

    @property(hero)
    hero: hero = null;
    // 飞机的ts 文件
    private heroTs: hero;

    private ResManager: ResourceManager = null;

    onLoad() {
        //开启碰撞检测|开启绘制区域
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        this.initComponent();

    }

    public initComponent() {
        this.ResManager = this.getComponent("ResourceManager");
        this.heroTs = this.hero.getComponent("hero");
    }

    start() {

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
        // this.bulletPool.put(bullet.node);
        this.ResManager.gcBullet(bullet)
    }

    /**回收敌机资源 */
    public gcEnemy(em: enemy) {
        this.ResManager.gcEnemy(em);
    }




    update(dt) {
        //背景循环滚动 60帧 每帧 2 px
        this.bg1.y = this.bg1.y - dt * 120;
        this.bg2.y = this.bg2.y - dt * 120;
        if (this.bg1.y <= -960) {
            this.bg1.y = 0;
            this.bg2.y = 960;
        }
    }
}
