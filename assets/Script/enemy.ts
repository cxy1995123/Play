import game from "./game";

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
export default class enemy extends cc.Component {


    private hp: number = 0;
    //像素/秒
    private speed: number = 0;

    private maxHp: number = 0;

    @property(cc.ProgressBar)
    hpPrg: cc.ProgressBar = null;

    game: game = null;

    @property(cc.Sprite)
    boom: cc.Sprite = null;

    private anim: cc.Animation = null;

    public is_destory: boolean = false;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        if (this.anim != null) {
            this.anim.stop();
        }
        this.is_destory = false;
    }



    public init(game, hp, speed) {
        this.setGame(game);
        this.setHp(hp)
        this.setMaxHp(hp);
        this.setspeed(speed)
        if (this.anim != null) {
            this.anim.stop();
        }
        this.hpPrg.node.opacity = 255;
        this.boom.node.opacity = 0;
        this.is_destory = false;
    }



    public setGame(game: game) {
        this.game = game;
    }

    public setHp(hp: number) {
        this.hp = hp;
        // this.hpPrg.totalLength = 100;
        this.hpPrg.progress = 1;

    }



    public setMaxHp(hp: number) {
        this.maxHp = hp;
    }

    public getMaxHp(): number {
        return this.maxHp;
    }


    public getHp(): number {
        return this.hp;
    }

    public startAnim(callbacks: any) {
        this.boom.node.opacity = 255;
        this.is_destory = true;
        this.anim = this.boom.getComponent(cc.Animation);
        this.anim.once(cc.Animation.EventType.STOP, callbacks, this)
        this.anim.play("boom");
    }


    public changeHp(att: number): boolean {
        if (att >= this.hp) {
            this.hpPrg.progress = 0;
            this.setHp(0);
            this.hpPrg.node.opacity = 0;
            this.is_destory = true;
            return true;
        } else {
            this.setHp(this.hp - att);
            this.hpPrg.progress = (this.hp - att) / this.maxHp;
            return false;
        }
    }


    public setspeed(speed: number) {
        this.speed = speed;
    }



    update(dt: number) {

        if (this.is_destory) {
            return;
        }

        this.node.y = this.node.y - this.speed * dt;
        if (this.node.y < - 520) {
            // this.game.gcEnemys(this);
            this.node.removeFromParent();
        }



    }
}
