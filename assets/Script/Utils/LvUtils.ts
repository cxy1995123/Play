

export class LvUtils {

    public static lvExp: Array<number> = [30, 80, 200, 350, 600, 800, 1300, 1600, 2000, 2500, 3200, 4000];

    public static att: Array<number> = [50, 60, 100, 150, 300, 400, 600, 800, 1000, 1200, 1500, 2000];

    public static isLvUp(lv: number, exp: number): boolean {
        return exp > this.lvExp[lv-1];
    }

    public static addAtt(lv: number): number {
        return this.att[lv-1];
    }

} 