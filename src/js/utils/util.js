export class Util {
    constructor() {
        this._instance = null;
    }

    static get instance() {
        if(!this._instance) {
            this._instance = new Util();
        }

        return this._instance;
    }

    random(min, max) {
        return Math.random() * (max - min) + min;
    }

    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    randomArr(arr) {
        return arr[this.randomInt(0, arr.length - 1)];
    }

    shuffle(arr) {
        let i = arr.length;
        while (--i) {
          let j = Math.floor(Math.random() * (i + 1));
          if (i == j) continue;
          let k = arr[i];
          arr[i] = arr[j];
          arr[j] = k;
        }
    }

    clamp(val, min, max) {
        return Math.min(max, Math.max(val, min));
    }

    map(num, fromMin, fromMax, toMin, toMax) {
        if (num <= fromMin) return toMin;
        if (num >= fromMax) return toMax;

        const p = (toMax - toMin) / (fromMax - fromMin);
        return (num - fromMin) * p + toMin;
    }

    mix(x, y, n) {
        return x * (1 - n) + y * n;
    }

    radian(degree) {
        return (degree * Math.PI) / 180;
    }

    degree(radian) {
        return (radian * 180) / Math.PI;
    }
}