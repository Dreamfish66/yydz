var runner = 0;
var FPS = 30;

function init(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
  
  
    setInterval(function(){
      main();
    },1000/FPS);
  }