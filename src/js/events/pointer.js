export class Pointer {
    constructor() {
        this._instance = null;

        this.onPointerMove = this.onPointerMove.bind(this);
        console.log('event!');
        // this.onPointerUp = this.onPointerUp.bind(this);
        // this.onPointerDown = this.onPointerDown.bind(this);

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.x = this.y = this.nx = this.ny = 0;

        this.connect();
    }

    static get instance() {
        if (!this._instance) {
            this._instance = new Pointer();
        }

        return this._instance;
    }

    static get x() {
        return Pointer.instance().x;
    }

    static get y() {
        return Pointer.instance().y;
    }

    static get nx() {
        return Pointer.instance().nx;
    }

    static get ny() {
        return Pointer.instance().ny;
    }

    connect() {
        window.addEventListener('pointermove', this.onPointerMove, { passive: true });
        // document.body.addEventListener('pointerdown', this.onPointerDown, { passive: true });
        // document.body.addEventListener('pointerleave', this.onPointerUp, { passive: true });
        // document.body.addEventListener('pointerup', this.onPointerUp, { passive: true });
    }

    disconnect() {
        window.removeEventListener('pointermove', this.onPointerMove);
        // document.body.removeEventListener('pointerdown', this.onPointerDown);
        // document.body.removeEventListener('pointerleave', this.onPointerUp);
        // document.body.removeEventListener('pointerup', this.onPointerUp);
    }

    getPointerPosition(event) {
        const px = Math.max(0, Math.min(this.width, event.x - document.body.offsetLeft));
        const py = Math.max(0, Math.min(this.height, event.y - document.body.offsetTop));

        this.x = px;
        this.y = py;
        this.nx = (px / this.width) * 2 - 1;
        this.ny = -(py / this.height) * 2 + 1;
    }

    onPointerMove(event) {
        this.getPointerPosition(event);
    }
}
