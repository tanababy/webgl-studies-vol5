export class RAF {
    constructor() {
        this._instance = null;
        this.updateLists = [];
    }

    static get instance() {
        if (!this._instance) {
            this._instance = new RAF();
        }

        return this._instance;
    }

    add(f) {
        //function
        this.updateLists.push(f);
    }

    update(time) {
        for (const item of this.updateLists) {
            if (item !== null) item(time);
        }
    }
}
