var canvas = document.getElementById('background');
var ctx = canvas.getContext('2d');
var gamecontinue;
canvas.width = 1600;
canvas.height = 500;
var canvasr = document.getElementById('object');
var ctxr = canvasr.getContext('2d');

var groundHeight = 350;

var speed_ground = 2;

const bgImage = new Image();
bgImage.src = 'images/background.jpg';


const bg = {
    x1: 0, 
    x2: 6400, 
    y: 0, 
    width: 6400, 
    height: 500, 
    speed: 2 
}

var runner = 0;
var run_h = 300;
var FPS = 40;
var dzyy_stand = new Image();
dzyy_stand.src = "images/dyy_stand.png"
var dzyy_zip = new Image();
dzyy_zip.src = "images/dyy_zip.png"
var xuebaopic = new Image();
xuebaopic.src = "images/xuebao.png"
var yingpic = new Image();
yingpic.src = "images/ying.png"
var winwinpic = new Image();
winwinpic.src="images/winwin.png"
var ruikepic = new Image();
ruikepic.src = "images/ruike.png"

function init(){
    initcondition();
    document.addEventListener('keydown',function(tecla){     
        if(tecla.code == 'Space' && runner <= 0){
            yi_sound.play();
            runner = 1;
        }
    
        if(tecla.code == 'KeyS' && runner == 0){
          wu_sound.play();
            runner = -1;
        }
    });
    document.addEventListener('keyup',function(event){     
        if(event.code == 'KeyS' && runner == -1){
            runner = 0;
        }
    });

    setInterval(function(){
      gameLoop();
    },1000/FPS);
}
function initcondition(){
    generateanimal();
    initruike();
    runner = 0;
    gamecontinue = 0;
}
var an_x = [];
var an_y = [];
var an_value = [];
var an_speed = [];
var xuebao = 1;
var ying = 2;

function generateanimal() { // generate 500 animals;
  for (var i = 0; i < 500; i++) {
          var tmp_type = Math.random();
          var tmp_posX = Math.random();
          var tmp_posY = Math.random();
          var type = 0;
          if (tmp_type > 0.7) {
            an_value.push(ying); 
            type = ying;
          }// Depending on the value of tmp, we generate
          else {
            an_value.push(xuebao);
            type = xuebao;
          }
          switch (type){
            case 1:
              an_speed.push(10);
              an_y.push(0);
              break;
            case 2:
              an_speed.push(15);
              an_y.push(150+tmp_posY*350);
              break;
          }
          an_x.push(1600+((i * 500) + (tmp_posX * 200))); // Generate negative height values. Then, only the ones inside the canvas will be represented.
      }
}

function jump_path(x){
  x = 2*x;
  return (1/6)*(x-30)*(x-30)+200;
}
function run(){
  if (runner>0 && runner <= 15){
    ctx.drawImage(dzyy_stand, 300, jump_path(runner), 90, 150);
    run_h=jump_path(runner);
  }
  else if (runner > 0 && runner > 15){
    ctx.drawImage(dzyy_stand, 300, jump_path(runner), 90, 150);
    run_h=jump_path(runner);
  }
  else if (runner == -1){
    ctx.drawImage(dzyy_zip, 300, 425, 90, 75);
    run_h=425;}
  else if (runner == 0){
    ctx.drawImage(dzyy_stand, 300, 350, 90, 150);
    run_h=350;}
  if (runner>0)
    runner=runner+1;
  if (runner == 30)
    runner = 0;
  if (ruike>=320 && ruike<=400){
    ctx.drawImage(winwinpic, 305, run_h, 70, 70);
  }
}
function animalsmove(){
    for (var i=0; i<500; i++){
        an_x[i]=an_x[i]-an_speed[i];
    }
}
function drawanimals(){
    for (var i=0; i<500; i++){
        if (an_x[i]>0 && an_x[i]<1650){
            switch (an_value[i]){
                case 1:
                  ctx.drawImage(xuebaopic, an_x[i], 435-an_y[i], 150, 75);
                  break;
                case 2:
                  ctx.drawImage(yingpic, an_x[i], 450-an_y[i], 180, 80);
                  break;

            }
        }
    }
}
function checkcollision(a1,a2,a3,a4,b1,b2,b3,b4){
    if (a1<=b1 && a2>=b1 && a3<=b3 && a4>=b3)
    gamecontinue=1;
    if (a1<=b2 && a2>=b2 && a3<=b4 && a4>=b4)
    gamecontinue=1;
    if (a1<=b1 && a2>=b2 && a3<=b4 && a4>=b4)
    gamecontinue=1;
    if (a1<=b2 && a2>=b2 && a3<=b3 && a4>=b3)
    gamecontinue=1;
    if (ruike>=320 && ruike<=400){
    gamecontinue=0;
    }
}
function checkanimals(){
    var heighty=0;
    if (runner == -1)
        heighty=run_h+75;
    else heighty=run_h+150;
    for (var i=0; i<500; i++){
        if (an_x[i]>0 && an_x[i]<1650){
            switch (an_value[i]){
                case 1:
                  checkcollision(300,370,run_h+10,heighty,an_x[i],an_x[i]+100,450,500)
                  break;
                case 2:
                    checkcollision(300,420,run_h+10,heighty,an_x[i],an_x[i]+150,450-an_y[i],500-an_y[i])
                  break;

            }
        }
    }
}
function updateBackground() {
    bg.x1 -= bg.speed;
    bg.x2 -= bg.speed;


    if (bg.x1 < -bg.width) {
        bg.x1 = bg.width-5;
    }
    if (bg.x2 < -bg.width) {
        bg.x2 = bg.width-5;
    }
}

function drawBackground() {
    ctx.drawImage(bgImage, bg.x1, bg.y, bg.width, bg.height);
    ctx.drawImage(bgImage, bg.x2, bg.y, bg.width, bg.height);
}
var groundLine = {
  x: 0,
  y: groundHeight,
  width: canvas.width,
  height: 5
};

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (gamecontinue == 0){
  updateBackground();
  drawBackground();
  run();
  updateruike();
  animalsmove();
  drawanimals();
  checkanimals();
  console.log(ruike);
  }
}


var p_sound= document.getElementById('zsxb');
var yi_sound= document.getElementById('yi');
var wu_sound= document.getElementById('wu');
window.onload = function() {
document.body.onkeydown = function(e){
  if(e.key === 'p' || e.key === 'P'){
      p_sound.play();
  }
}
};




init();

var ruike = 0;

function initruike(){
  ruike = 0;
  document.addEventListener('keydown',function(chou){     
    if(chou.code == 'KeyP' && ruike == 0){
        ruike = 400;
    }
  });
}

function updateruike(){
  ctxr.clearRect(0,0,300,300);
  if (ruike>0)
    ruike=ruike-1;
  if (ruike == 0)
    ctxr.drawImage(ruikepic, 100, 40, 100, 250);
}

var audio = document.getElementById("bgm");

