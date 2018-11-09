import game from "./game";
import { RoundUtids } from "./Utils/RoundUtilds";
import ResourceManager from "./ResourceManager";
import enemy from "./enemy";
import { LvUtils } from "./Utils/LvUtils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class hero extends cc.Component {

    public moveX: number = 0;
    public moveY: number = 0;
    public res: ResourceManager = null;
    public att: number = 50;
    public Lv: number = 1;
    public exp: number = 1;
 
    public addExp(exp: number) {
        this.exp += exp;
        if (LvUtils.isLvUp(this.Lv, this.exp)) {
            this.lvUp();
        }
    }

    //升级
    public lvUp() {
        this.Lv += 1;
        this.att = LvUtils.addAtt(this.Lv)
        console.log("升级了...att:" + this.att + ",lv:" + this.Lv);
    }

    public setResourceManager(res: ResourceManager) {
        this.res = res;
    }

    onLoad() {
        let Animation: cc.Animation = this.node.getComponent(cc.Animation);
        Animation.play("anim1")
    }


    start() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this)
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this)
    }

    public onTouchMove(event: cc.Event.EventTouch) {

        let x = event.getLocationX() - 320 - this.moveX;
        let y = event.getLocationY() - 480 - this.moveY;
        this.node.x = RoundUtids.BoundaryDetection(x, 320, -320);
        this.node.y = RoundUtids.BoundaryDetection(y, 480, -480);
    }

    public onTouchStart(event: cc.Event.EventTouch) {
        this.moveX = event.getLocationX() - this.node.x - 320;
        this.moveY = event.getLocationY() - this.node.y - 480;
    }

    onDestroy() {

        if (this.node.hasEventListener(cc.Node.EventType.TOUCH_START)) {
            this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this)
            this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this)
        }

    }

    /**
 * 当碰撞产生的时候调用
* @param  {Collider} other 产生碰撞的另一个碰撞组件
 * @param  {Collider} self  产生碰撞的自身的碰撞组件
 */
    public onCollisionEnter(other, self) {

        let enemy: enemy = other.getComponent("enemy");

        if (!enemy.is_destory) {
            this.res.gameOver();
            this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this)
            this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this)
        }


    }


    update(dt: number) {

    }
}
