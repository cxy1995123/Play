 

const { ccclass, property } = cc._decorator;

@ccclass
export default class Main extends cc.Component {




    @property(cc.Button)
    public startBtn: cc.Button = null;

    @property(cc.ProgressBar)
    public progressBar: cc.ProgressBar = null;

    @property(cc.Label)
    public progressStr: cc.Label = null;

    @property(cc.Label)
    public loadStatus: cc.Label = null;


    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //debug 信息
        cc.debug.setDisplayStats(true);
        //60帧
        cc.game.setFrameRate(60);
        //
        this.startBtn.node.on(cc.Node.EventType.TOUCH_START, this.onToucn, this)
    }

    start() {
        let value = cc.sys.localStorage.getItem("fun")
        console.log("获取存储数据:" + value);

    }

    //预加载中的回调
    private loadingCallBack = (completedCount: number, totalCount: number, item: any) => {
        this.progressBar.progress = completedCount / totalCount;
        this.progressStr.string = completedCount + "/" + totalCount
        this.loadStatus.string = "正在加载"
    }

    //预加载完成的回调
    private loadedCallBack = (error: Error) => {
        this.startBtn.node.opacity = 255;
        this.loadStatus.string = "加载完成"
        cc.director.loadScene("Secend");
    }
 

    public startGame() {

        cc.director.preloadScene("Secend", this.loadingCallBack, this.loadedCallBack);
    }


    onToucn(event: cc.Event.EventTouch) {
        this.startGame();
    }



    public onRequest() {
        let request = new XMLHttpRequest();
        request.onreadystatechange = this.onResponse;
        request.open("GET", "https://www.baidu.com/", true);
        request.send();
    }

    public onResponse(this: XMLHttpRequest) {
        console.log(this.readyState);
        console.log(this.responseText);
    }

    onDisable() {
        console.log(this.startBtn.node);
        this.startBtn.node.off(cc.Node.EventType.TOUCH_START, this.onToucn, this)
    }
    //父节点onDestroy 时子节点已经被制空
    onDestroy() {
        console.log(this.startBtn.node);
    }


    // update (dt) {}
}
