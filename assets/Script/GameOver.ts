

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameOver extends cc.Component {


    @property(cc.Button)
    replay: cc.Button = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        this.replay.node.once(cc.Node.EventType.TOUCH_START, this.onTouch, this)
    }

    start() {

    }

    public onTouch(event: cc.Event.EventTouch) {

        cc.director.loadScene("Secend")
    }

    onDestroy() {

    }

    // update (dt) {}
}
