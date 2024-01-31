var runner = 0;
var FPS = 30;
var canvasr = document.getElementById('character');
var ctxr = canvas.getContext('2d');
var dzyy_stand = new Image();
dzyy_stand.src = "images/dyy_stand.png"
var dzyy_zip = new Image();
dzyy_zip.src = "images/dyy_zip.png"



function init(){
    initcondition();
    ctxr.drawImage(dzyy_stand, 300, 400, 60, 100);
    setInterval(function(){
      run();
    },1000/FPS);
    ctxr.drawImage(dzyy_stand, 300, 400, 60, 100);
}
function initcondition(){
    generateanimal();
    ctxr.clearRect(0, 0, 1600, 500);
    ctxr.drawImage(dzyy_stand, 300, 400, 60, 100);
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
          // speed: 20~200
          switch (type){
            case 1:
              an_speed.push(6);
              an_y.push(0);
              break;
            case 2:
              an_speed.push(10);
              an_y.push(50+tmp_posY*400);
              break;
          }
          an_x.push(((i * 150) + (tmp_posX * 50))); // Generate negative height values. Then, only the ones inside the canvas will be represented.
      }
}


function run(){
  ctxr.clearRect(0, 0, 1600, 500);
  ctxr.drawImage(dzyy_stand, 300, 400, 60, 100);
}

init();