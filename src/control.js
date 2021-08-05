// Aucune touches appuyées au début du jeu.
let keyRight = false;
let keyLeft = false;
let keyUp = false;
let keyDown = false;
let keySpace = false;

// Défini les evenements touche enfoncé et relaché.
document.addEventListener("keydown", checkKeyDown, false);
document.addEventListener("keyup", checkKeyUp, false);

function checkKeyDown(key) {
    if(key.code == "ArrowRight") {
        keyRight = true;
    }
    else if(key.code == "ArrowLeft") {
        keyLeft = true;
    }
    else if(key.code == "ArrowUp") {
        keyUp = true;
    }
    else if(key.code == "ArrowDown") {
        keyDown = true;
    }
    else if(key.code == "Space") {
        keySpace = true;
    }

}

function checkKeyUp(key) {
    if(key.code == "ArrowRight") {
        keyRight = false;
    }
    else if(key.code == "ArrowLeft") {
        keyLeft = false;
    }
    else if(key.code == "ArrowUp") {
        keyUp = false;
    }
    else if(key.code == "ArrowDown") {
        keyDown = false;
    }
    else if(key.code == "Space") {
        keySpace = false;
    }
}