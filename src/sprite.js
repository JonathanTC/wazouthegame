class Sprite
{
    x = 0;
    y = 0;
    image = null;
    currentAnimation = null;
    currentAnimationName = "";
    animations = {};
    frameId = 0;
    direction = null;
    flip = false;

    constructor(src, x, y){
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = src;
    }

    setDirection(newDirection) {
        if(this.direction != null) {
            this.flip = false;
            if(newDirection != this.direction) {
                this.flip = true;
            }
        }
        else{
            this.direction = newDirection;
        } 
    }

    getDirection() {
        return this.direction;
    }

    playAnimation(name) {
        // joue l'animation si elle n'est pas déjà jouer.
        if(this.currentAnimationName != name) {
            this.currentAnimation = this.animations[name];
            this.currentAnimationName = name;
            this.frameId = 0;
        }
    }

    addAnimation(name, quads) {
        this.animations[name] = quads;
    }

    update() {
        this.frameId++;
        if(this.frameId >= this.currentAnimation.length) {
            this.frameId = 0;
        }
    }

    draw(pCtx) {
        if(this.image != null) {
            if(this.flip == false) {
                pCtx.translate(this.x, this.y);
                pCtx.scale(1, 1);
            }
            if(this.flip == true) {
                pCtx.translate(this.x + this.currentAnimation[this.frameId][2], this.y);
                pCtx.scale(-1, 1);
            }
            pCtx.drawImage(this.image, 
                this.currentAnimation[this.frameId][0],
                this.currentAnimation[this.frameId][1], 
                this.currentAnimation[this.frameId][2],
                this.currentAnimation[this.frameId][3], 
                0, 
                0, 
                this.currentAnimation[this.frameId][2],
                this.currentAnimation[this.frameId][3]);
            pCtx.setTransform(1, 0, 0, 1, 0, 0);
        }
    }
}