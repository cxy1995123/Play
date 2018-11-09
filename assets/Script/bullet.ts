import game from "./game";
import enemy from "./enemy";




const { ccclass, property } = cc._decorator;

@ccclass
export default class bullet extends cc.Component {


    private game: game = null;

    private att: number = 0;

    private speed: number = 700;

    public setAtt(att: number) {
        this.att = att;
    }


    public getAtt(): number {
        return this.att;
    }


    public setGame(game: game) {
        this.game = game;
    }

    start() {

    }

    /**
     * 当碰撞产生的时候调用
    * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    public onCollisionEnter(other, self) {

        let enemy: enemy = other.getComponent("enemy");
        let bullet: this = self.getComponent("bullet");
        let hp3 = enemy.getHp() - bullet.getAtt()
        if (hp3 <= bullet.getAtt()) {
            enemy.changeHp(bullet.getAtt());
            this.game.addFraction(enemy);
        } else {
            if (enemy.changeHp(bullet.getAtt())) {
                this.game.addFraction(enemy);
            }

            self.node.removeFromParent();
        }
    }


    update(dt) {

        this.node.y = this.node.y + this.speed * dt;

        if (this.node.y > 500) {
            // this.game.gcBullet(this)
            this.node.removeFromParent();
        }

    }
}
