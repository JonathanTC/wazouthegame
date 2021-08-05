let time = 0;
//let mario = new Sprite("charsets/mario.png", 0, 0);
let mario = new Player("assets/charset/mario.png", 0, 0);
let level = new Level();
// chargement des item
let coin = new Coin("assets/tileset/nature-paltformer-tileset-16x16.png", 0, 0);

function load() {
    // charge les animations
    mario.addAnimation("Idle", [[24, 48, 16, 24]]);
    mario.addAnimation("Walk", [[180, 48, 16, 24], [232, 48, 16, 24], [284, 48, 16, 24]]);
    mario.addAnimation("Jump", [[76, 112, 16, 24]]);
    // défini la direction d'origine par rapport au charset
    mario.setDirection("Left");
    mario.setGravity(true);
    mario.setCollision(level);

    // chargement du niveau
    level.load(level_1);

    //lire XML
    var xhr = new XMLHttpRequest(); 
    xhr.open('GET', 'https://jonathantc.github.io/wazouthegame/level_1.tmx');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            console.log(xhr.responseText);
        }
    };
    xhr.send();
}

function update(dt) {
    time += dt;
    if(time >= 0.0167) {
        time = 0;

        // Gestion du clavier
        if(keyRight) {
            mario.setDirection("Right");
            mario.moveRight(3);  
            if(keySpace) {
                mario.jump(10);
            }
            // joue l'animation
            if(mario.getJumpState() == true) {
                mario.playAnimation("Jump");
            }
            else {
                mario.playAnimation("Walk");
            }
        }
        else if(keyLeft) {
            mario.setDirection("Left");
            mario.moveLeft(3);
            if(keySpace) {
                mario.jump(10);
            }
            // joue l'animation
            if(mario.getJumpState() == true) {
                mario.playAnimation("Jump");
            }
            else {
                mario.playAnimation("Walk");
            }

        }
        else if(keySpace) {
            mario.jump(10);
        }
        else {
            if(mario.getJumpState() == true) {
                mario.playAnimation("Jump");
            }
            else {
                mario.playAnimation("Idle");
            }
        }
        // Mise à jour des composants
        level.update();
        mario.update();
        coin.update();
    }   
}

function draw(pCtx) {
    level.draw(pCtx);
    mario.draw(pCtx);
    coin.draw(pCtx);
}