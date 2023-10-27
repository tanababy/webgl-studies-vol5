//reference: https://github.com/nytimes/three-story-controls/blob/dev/src/Damper.ts

/**
 * Damper uses simple linear damping for a given collection of values.
 * On every call to update, the damper will approach a given set of target values.
 * @example
 * ```js
 * const damper = new Damper({
 *  values: {x: 0, y: 0},
 *  dampingFactor: 0.4
 * })
 *
 * damper.setTarget({ x: 1, y: 100 })
 * damper.update() // would generally be called in an animation loop
 * const values = damper.getCurrentValues() // values.x = 0.4; values.y = 40
 * ```
 */

export class Damper {
    constructor(props) {
        this.values = {};
        this.targetValues = {};
        this.deltaValues = {};

        Object.assign(this.values, props.values);
        Object.assign(this.targetValues, props.values);

        this.epsilon = 0.001;
        this.hasReached = true;
        this.dampingFactor = props.dampingFactor;

        for (const key in this.values) {
            this.deltaValues[key] = 0;
        }
    }

    update() {
        const deltas = {};
        let approached = true;

        for (const key in this.values) {
            deltas[key] = this.targetValues[key] - this.values[key];
            approached = approached && Math.abs(deltas[key]) < this.epsilon;
        }

        if (approached) {
            for (const key in this.values) {
                this.deltaValues[key] = deltas[key];
                this.values[key] = this.targetValues[key];
            }

            this.hasReached = true;
        } else {
            for (const key in this.values) {
                this.deltaValues[key] = this.dampingFactor * deltas[key];
                this.values[key] += this.deltaValues[key];
            }
        }
    }

    setTarget(target) {
        for (const key in target) {
            this.targetValues[key] = target[key];
        }
        this.hasReached = false;
    }

    addToTarget(key, value) {
        this.targetValues[key] += value;
        this.hasReached = false;
    }

    resetAll(value) {
        for (const key in this.values) {
            this.targetValues[key] = value;
            this.values[key] = value;
            this.deltaValues[key] = 0;
        }

        this.hasReached = true;
    }

    resetData(values) {
        for (const key in values) {
            this.targetValues[key] = values[key];
            this.values[key] = values[key];
            this.deltaValues[key] = 0;
        }
    }

    getCurrentValues() {
        return { ...this.values };
    }

    getDeltaValues() {
        return { ...this.deltaValues };
    }

    reachedTarget() {
        return this.hasReached;
    }
}
