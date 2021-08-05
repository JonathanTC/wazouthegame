class Entity extends Sprite
{
    gravity = false;
    velocity = 0;
    level = null;
    jumpState = "progress";
    jumps = "";

    sensorTopLeft = null;
    sensorTopRight = null;
    sensorDownLeft = null;
    sensorDownRight = null;
    sensorLeftTop = null;
    sensorLeftDown = null;
    sensorRightTop = null;
    sensorRightDown = null;

    prevCollision = false;
    currCollision = false;

    constructor(src, x, y){
        super(src, x, y);
    }

    getJumpState() {
        return this.isJumping;
    }

    setCollision(pLevel) {
        this.level = pLevel;
    }

    setGravity(gravity) {
        this.gravity = gravity;
    }

    moveRight(speed) {
        this.x += speed;
        var collision = this.checkCollision([this.sensorRightDown, this.sensorRightTop], ["Block"]);
        if(collision == true) {
            this.x -= speed;
        }
    }

    moveLeft(speed) {
        this.x -= speed;
        var collision = this.checkCollision([this.sensorLeftDown, this.sensorLeftTop], ["Block"]);
        if(collision == true) {
            this.x += speed;
        }
    }

    jump(strong) {
        if(this.jumpState == "wait") {
            this.y--;
            this.velocity -= strong;
            this.jumpState = "progress";
        }
    }

    checkCollision(sensorTable, typeTable) {
        var collision = false;
        sensorTable.every(sensor => {
            var tile = {
                'x' : Math.floor(sensor.x / 16), 
                'y' : Math.floor(sensor.y / 16)
            }
            var type = this.level.getTileType(tile.x, tile.y);
            typeTable.every(element => {
                if(element == type) {
                    collision = true;
                    return false;
                }
                return true;
            });
            return true;
        });
        return collision;
    }

    update() {
        super.update();

        if(this.gravity == true) 
        {
            if(this.velocity < 0) {
                this.jumps = "monte";
            }
            else {
                this.jumps = "descend";
            }

            //
            // Mise à jour des capteurs de collision
            //
            var tileWidth = this.currentAnimation[this.frameId][2];
            var tileHeight = this.currentAnimation[this.frameId][3];

            this.sensorTopLeft = {
                'x' : this.x + 3,
                'y' : this.y
            };

            this.sensorTopRight = {
                'x' : this.x + tileWidth - 3,
                'y' : this.y
            };

            this.sensorDownLeft = {
                'x' : this.x + 3,
                'y' : this.y + tileHeight
            };

            this.sensorDownRight = {
                'x' : this.x + tileWidth - 3,
                'y' : this.y + tileHeight
            };

            this.sensorLeftTop = {
                'x' : this.x,
                'y' : this.y + 3
            };

            this.sensorLeftDown = {
                'x' : this.x,
                'y' : this.y + tileHeight - 3
            };

            this.sensorRightTop = {
                'x' : this.x + tileWidth,
                'y' : this.y + 3
            };

            this.sensorRightDown = {
                'x' : this.x + tileWidth,
                'y' : this.y + tileHeight - 3
            };

            if(this.jumpState == "progress") {
                if(this.jumps == "descend") {
                    var collision = this.checkCollision( [this.sensorDownLeft, this.sensorDownRight] , ["Block", "Ground"] );
                    if(collision == true && this.prevCollision == false) {
                        this.jumpState = "stop";
                    }
                    this.prevCollision = collision;
                }
                if(this.jumps == "monte") {
                    var collision = this.checkCollision( [this.sensorTopLeft, this.sensorTopRight], ["Block"] );
                    if(collision == true) {
                        this.velocity = 0;
                    }
                }
            }

            if(this.jumpState == "wait") {
                var collision = this.checkCollision( [this.sensorDownLeft, this.sensorDownRight] , ["Block", "Ground"] );
                if(collision == false) {
                    this.jumpState = "progress";
                }
                this.prevCollision = collision;
            }          

            if(this.jumpState == "stop") {
                this.velocity = 0;
                // calcule combien de pixel le sprite est enterer dans le sol
                var offset = this.sensorDownLeft.y - Math.floor(this.sensorDownLeft.y / 16) * 16;
                // repositione le personnage au niveau du sol
                this.y -= offset;
                this.jumpState = "wait";
            }
            
            if(this.jumpState == "progress") {
                this.velocity += 0.8; 
                this.y += this.velocity;
            }
        }
    }
    
    draw(pCtx) {
        super.draw(pCtx);
        
        var table = [
            this.sensorDownLeft,
            this.sensorDownRight,
            this.sensorLeftDown,
            this.sensorLeftTop,
            this.sensorRightDown,
            this.sensorRightTop,
            this.sensorTopLeft,
            this.sensorTopRight
        ];

        table.forEach(element => {
            pCtx.beginPath();
            pCtx.arc(element.x, element.y, 1, 0, 2 * Math.PI);
            pCtx.stroke();
        });
    }
}