'use strict'

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let background = null;
let playerImg = null;

let scrollHoritzontal = 0;
let scrollVertical = 0;

const frameWidth = 18;
const frameHeight = 18;

function getKeys(){
    let keys = {};
    window.onkeydown = function(e) {
        keys[e.key] = true;
    }
    window.onkeyup = function(e) {
        keys[e.key] = false;
    }
    return keys;
}

let keys = getKeys();

function loadImage(url){

    let img = new Image();
    img.src = url;

    return new Promise(function (resolve, reject) {
        img.onload = function(){
            resolve(img)
        }
    })
}

let player = {
    posX: 10,
    posY: 30,
    widthPlayer: 40,
    heightPlayer: 50,

}

const animaciones = {
    default: [0],
    caminarDerecha: [1],
    caminarIzquierda: [2],
}

function update(){

    // Movimiento Mario
    if(keys['ArrowLeft']){
        player.posX -= 5
    }
    if(keys['ArrowRight']){
        player.posX += 5
    }
    if(keys['ArrowUp']){
        player.posY -= 5
    }
    if(keys['ArrowDown']){
        player.posY += 5
    }

    // Scroll Pantalla Horitzontal
    if(keys['a']){
        scrollHoritzontal -= 5;
    }
    if(keys['d']){
        scrollHoritzontal += 5;
    }

    // Scroll Pantalla Vertical
    if(keys['w']){
        scrollVertical -= 5;
    }
    if(keys['s']){
        scrollVertical += 5;
    }

}

function draw(){

    ctx.drawImage(
        background, 
        scrollHoritzontal, scrollVertical, 
        256, 240, 
        0,0,
        256, 240
    )

    // Dibuixar Personatje
    ctx.drawImage(
        playerImg, 
        55, 89, 
        18, 18,
        player.posX, player.posY,
        18, 18
    )

    /* ctx.beginPath();
    ctx.rect(player.posX, player.posY, player.widthPlayer, player.heightPlayer);
    ctx.fill(); */

}

function mainLoop(){

    // Actualizar el mon ( entitats, controls, ...)
    update();
    // Dibuixar els elements del joc a la pantalla
    ctx.save();
    ctx.scale(2.5, 2.5);
    draw();
    ctx.restore();

    requestAnimationFrame(mainLoop);

}

async function main() {
    // iniciatlizar
    background = await loadImage('./imgs/bg-1-1.png');
    playerImg = await loadImage('./imgs/mario.png');
    // Executar el bucle principal ( 60 fps )
    mainLoop();

}

main();
