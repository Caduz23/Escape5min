const map = new Image();
map.src = 'images/Phases/Fase1.png';
const hero = new Image();
hero.src = 'images/Heroes/knight_idle_spritesheet.png';
const heroStopEsq = new Image();
heroStopEsq.src = 'images/Heroes/knight_idle_spritesheetEsq.png';
const heroDir = new Image();
heroDir.src = 'images/Heroes/knight_run_spritesheet.png';
const heroEsq = new Image();
heroEsq.src = 'images/Heroes/knight_run_spritesheetEsq.png';


const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let frames = 0;

let warrior = {
    x: 20,
    y: 20,
    directionX: 0,
    directionY: 0,
    paradaX: 0,
    paradaY: 0,
    speed: 3,
    frame: 0,
    sprite: 0,
    heroSprites: [
        {spriteX: 0, spriteY: 0,},
        {spriteX: 17, spriteY: 0,},
        {spriteX: 33, spriteY: 0,},
        {spriteX: 49, spriteY: 0,},
        {spriteX: 65, spriteY: 0,},
        {spriteX: 81, spriteY: 0,},
    ],
    frametAtual: 0,
    attFrameAtual(){
        const intervalo = 10;
        const passouIntervalo = frames % intervalo === 0;
        if(passouIntervalo){
        const baseDoIncremento = 1;
        const incremento = baseDoIncremento + warrior.frametAtual;
        const baseRepeticao = warrior.heroSprites.length;
        warrior.frametAtual = incremento % baseRepeticao;
        }
    },
    desenha(){  
        warrior.attFrameAtual();
        console.log('sprite',warrior.sprite);
        console.log('directionY',this.directionY);
        const {spriteX, spriteY} = warrior.heroSprites[warrior.frametAtual]
        if(this.directionX == -1 && this.directionY == 1){ //quando for para baixo e esquerda
            ctx.drawImage(heroEsq,spriteX,spriteY,16,16,warrior.x,warrior.y,16*4,16*4); 
        }
        else if(this.directionY == -1 && this.sprite == 1){ //quando parou por ultimo para a direita e quer andar para cima
            ctx.drawImage(heroDir,spriteX,spriteY,16,16,warrior.x,warrior.y,16*4,16*4); 
        }
        else if (this.directionY == 1 && this.sprite == -1) { //quando parou por ultimo para a esquerda e quer descer
            console.log('teste');
            ctx.drawImage(heroEsq,spriteX,spriteY,16,16,warrior.x,warrior.y,16*4,16*4);
        }
        else if(this.directionX == 1 || this.directionY == 1){ // quando for para direita ou baixo
            ctx.drawImage(heroDir,spriteX,spriteY,16,16,warrior.x,warrior.y,16*4,16*4);
        }
        else if(this.directionX == -1 || this.directionY == -1){ // quando for para esquerda ou cima
            ctx.drawImage(heroEsq,spriteX,spriteY,16,16,warrior.x,warrior.y,16*4,16*4);
        }else if(warrior.sprite == -1 && this.directionX == 0 && this.directionY == 0){ // personagem andou por ultimo para a esquerda
            ctx.drawImage(heroStopEsq,spriteX,spriteY,16,16,warrior.x,warrior.y,16*4,16*4);
        }else if(warrior.sprite == 1 && this.directionX == 0 && this.directionY == 0){ // personagem andou por ultimo para a direita
            ctx.drawImage(hero,spriteX,spriteY,16,16,warrior.x,warrior.y,16*4,16*4);
        }else   // inicio do estado parado
            ctx.drawImage(hero,spriteX,spriteY,16,16,warrior.x,warrior.y,16*4,16*4);
    }
}

document.addEventListener('keydown', function(event) {
    let tecla = event.code;

    if(warrior.directionY == 1 && tecla == 'KeyW'){
        warrior.paradaY = 1;     
        if(warrior.paradaY == 1){
            warrior.directionY = 0;
        }
    }
    else if(warrior.directionY == -1 && tecla == 'KeyS'){
        warrior.paradaY = 2;     
        if(warrior.paradaY == 2){
            warrior.directionY = 0;
        }
    }
    else if(warrior.directionX == 1 && tecla == 'KeyA'){
        warrior.paradaX = 1;     
        if(warrior.paradaX == 1){
            warrior.directionX = 0;
        }
    }
    else if(warrior.directionX == -1 && tecla == 'KeyD'){
        warrior.paradaX = 2;     
        if(warrior.paradaX == 2){
            warrior.directionX = 0;
        }
    }
    
    if(tecla == 'KeyW' && warrior.paradaY == 0){
        warrior.directionY = -1;
    }
    else if(tecla == 'KeyA' && warrior.paradaX == 0){
        warrior.directionX = -1;
        warrior.sprite = -1;
    }
    else if(tecla == 'KeyS' && warrior.paradaY == 0){
        warrior.directionY = 1;
    }
    else if(tecla == 'KeyD' && warrior.paradaX == 0){
       warrior.directionX = 1;
       warrior.sprite = 1;
    }
});

document.addEventListener('keyup', function(event) {
    let tecla = event.code;
    console.log(warrior.paradaX);

    if(tecla == 'KeyW' && warrior.paradaY == 1){
        warrior.directionY = 1;
    }
    else if(tecla == 'KeyS' && warrior.paradaY == 2){
        warrior.directionY = -1;
    }
    else if(tecla == 'KeyA' && warrior.paradaX == 1){
        warrior.directionX = 1;
    }
    else if(tecla == 'KeyD' && warrior.paradaX == 2){
        warrior.directionX = -1;
    }

    if(tecla == 'KeyW' && warrior.paradaY != 1){
        warrior.directionY = 0;
        warrior.paradaY = 0;
    }
    else if(tecla == 'KeyS' && warrior.paradaY != 2){
        warrior.directionY = 0;
        warrior.paradaY = 0; 
    }
    else if(tecla == 'KeyA' && warrior.paradaX != 1){
        warrior.directionX = 0;
        warrior.paradaX = 0;
    }
    else if(tecla == 'KeyD' && warrior.paradaX != 2){
        warrior.directionX = 0;
        warrior.paradaX = 0;
    }
});

function loop(){
    ctx.drawImage(map,0,0);
    warrior.x += warrior.directionX * warrior.speed;
    warrior.y += warrior.directionY * warrior.speed;
    warrior.desenha();
    frames += 1;
    requestAnimationFrame(loop);
}

loop();