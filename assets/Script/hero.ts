import game from "./game";
import { RoundUtids } from "./RoundUtilds";
import ResourceManager from "./ResourceManager";



// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class hero extends cc.Component {


    public moveX: number = 0;
    public moveY: number = 0;
  

    public res:ResourceManager = null;

    public att: number = 30;
    public Lv: number = 1;
    public exp: number = 1;

    public isLvUp() {
        switch (this.Lv) {
            case 1:
                if (this.exp > 30) {
                    this.lvUp();
                }

                break
            case 2:
                if (this.exp > 200) {
                    this.lvUp();
                }
                break
            case 3:
                if (this.exp > 400) {
                    this.lvUp();
                }
                break
            case 4:
                if (this.exp > 800) {
                    this.lvUp();
                }
                break
            case 5:
                if (this.exp > 1600) {
                    this.lvUp();
                }
                break
            case 6:
                if (this.exp > 3200) {
                    this.lvUp();
                }
                break
            case 7:
                if (this.exp > 6400) {
                    this.lvUp();
                }
                break
            case 8:
                if (this.exp > 12800) {
                    this.lvUp();
                }
                break
            case 9:
                if (this.exp > 51200) {
                    this.lvUp();
                }
                break
            case 10:
                if (this.exp > 102400) {
                    this.lvUp();
                }
                break





        }
    }

    public addExp(exp: number) {
        this.exp += exp;
        this.isLvUp();
    }

    //升级
    public lvUp() {
        console.log("升级了...");
        this.att += 35
        this.Lv += 1;
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
        this.res.gameOver();
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this)
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this)
        console.log("game over");
    }


    update(dt: number) {

    }
}
