let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let interval;
let previous = Date.now();

function run() {   
    // calcule du delta time
    let current = Date.now();
    let dt = (current - previous) / 1000;
    previous = current;

    update(dt);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw(ctx);
}

function init(){
    console.log("init");

    canvas.width = 640;
    canvas.height = 380;

    load();
    interval = setInterval(run, 1000 / 60);
}

init();