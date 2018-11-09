

export class RoundUtids {

    public static BoundaryDetection(num: number, maxNum: number, minNum: number): number {

        if (num > 0) {
            return Math.min(num, maxNum);
        } else {
            return Math.max(num, minNum);
        }

    }

}