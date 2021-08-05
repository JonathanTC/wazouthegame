class Coin extends Item 
{
    constructor(src, x, y) {
        super(src, x, y);
        super.addAnimation("Idle", [[80, 112, 16, 16]]);
        super.playAnimation("Idle");
    }

    update() {
        super.update();
    }

    draw(pCtx) {
        super.draw(pCtx);
    }
}