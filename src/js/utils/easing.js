export class Easing {
    constructor() {
        this._instance = null;
    }

    static get instance() {
        if (!this._instance) {
            this._instance = new Easing();
        }

        return this._instance;
    }

    linear(t) {
        return t;
    }

    inExpo(t) {
        if (t == 0) {
            return 0;
        } else {
            return Math.pow(2, 10 * (t - 1));
        }
    }

    outExpo(t) {
        if (t == 1) {
            return 1;
        } else {
            return -Math.pow(2, -10 * t) + 1;
        }
    }

    outSine(t) {
        return Math.sin(t * (Math.PI / 2));
    }

    outQuad(t) {
        return -t * (t - 2);
    }

    inOutQuart(t) {
        t *= 2;
        if (t < 1) return 0.5 * t * t * t * t;
        t -= 2;
        return -0.5 * (t * t * t * t - 2);
    }

    inOutCirc(t) {
        t *= 2;

        if (t < 1) return -0.5 * (Math.sqrt(1 - t * t) - 1);

        t -= 2;
        return 0.5 * (Math.sqrt(1 - t * t) + 1);
    }

    inOutCubic(t) {
        t *= 2;

        if (t < 1) return 0.5 * t * t * t;

        t -= 2;
        return 0.5 * (t * t * t + 2);
    }

    inOutSine(t) {
        return -0.5 * (Math.cos(Math.PI * t) - 1);
    }

    easeInOutBack(t) {
        const c1 = 1.70158;
        const c2 = c1 * 1.525;

        return t < 0.5
            ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
            : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
    }
}

export const easingFunctions = {
    linear: Easing.instance.linear,
    inExpo: Easing.instance.inExpo,
    outExpo: Easing.instance.outExpo,
    outSine: Easing.instance.outSine,
    outQuad: Easing.instance.outQuad,
    inOutQuart: Easing.instance.inOutQuart,
    inOutCirc: Easing.instance.inOutCirc,
    inOutCubic: Easing.instance.inOutCubic,
    inOutSine: Easing.instance.inOutSine,
    easeInOutBack: Easing.instance.easeInOutBack,
};
