var canvas = document.createElement('canvas');
canvas.width = document.body.clientWidth
canvas.height = document.body.clientHeight
document.body.appendChild(canvas);
var ctx = canvas.getContext("2d");

var img1 = new Image();
img1.height = 100
img1.width = 100
img1.src = '/static/perso.png';

var img2 = new Image();
img2.src = '/static/perso2.png'
img2.height = 100


var height_sword = 50


var perso1X = (canvas.width)/3;
var perso1Y = canvas.height-(canvas.height*0.3)-img1.height;
var x_sword1 = perso1X+img1.width
var y_sword1 = perso1Y-img1.height/2




var perso2X = ((canvas.width)/3)*2;
var perso2Y = canvas.height-(canvas.height*0.3)-img1.height;


var x_plat = canvas.width-(canvas.width*0.8)
var y_plat = canvas.height-(canvas.height*0.3)


var rightPressed1 = false;
var leftPressed1 = false;
var upPressed1 = false;

var rightPressed2 = false;
var leftPressed2 = false;
var upPressed2 = false;

var saut = false;
var is_fall1 = false;
var gravite = 0;

var saut2 = false;
var is_fall2 = false;
var gravite2 = 0;



document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  // perso1
    if(e.keyCode == 39) {
        rightPressed1 = true;
    }
    else if(e.keyCode == 37) {
        leftPressed1 = true;
    }
    if(e.keyCode == 38) {
        upPressed1 = true
    }
// perso2
    if(e.keyCode == 68) {
        rightPressed2 = true;
    }
    else if(e.keyCode == 65) {
        leftPressed2 = true;
    }
    if(e.keyCode == 87) {
        upPressed2 = true
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed1 = false;
    }
    else if(e.keyCode == 37) {
        leftPressed1 = false;
    }
    if(e.keyCode == 38) {
        upPressed1 = false
    }

  // perso2
      if(e.keyCode == 68) {
          rightPressed2 = false;
      }
      else if(e.keyCode == 65) {
          leftPressed2 = false;
      }
      if(e.keyCode == 87) {
          upPressed2 = false
      }
}



function draw_image(position = null,valeur=null){
  if (position == null){
    ctx.clearRect(perso1X,perso1Y,img1.width,img1.height);
    ctx.drawImage(img1,perso1X,perso1Y);
  }
  else if (position = "x") {
    ctx.clearRect(perso1X+valeur,perso1Y,img1.width,img1.height);
    ctx.drawImage(img1,perso1X,perso1Y);

  }  else if (position = "y") {
      ctx.clearRect(perso1X,perso1Y+valeur,img1.width,img1.height);
      ctx.drawImage(img1,perso1X,perso1Y);
    }

}
function draw_image2(position = null,valeur=null){
  if (position == null){
  ctx.clearRect(perso2X,perso2Y,img2.width,img2.height);
  ctx.drawImage(img2,perso2X,perso2Y);
  }
  else if (position = "x") {
    ctx.clearRect(perso2X+valeur,perso2Y,img2.width,img2.height);
    ctx.drawImage(img2,perso2X,perso2Y);
  }  else if (position = "y") {
    ctx.clearRect(perso2X,perso2Y+valeur,img2.width,img2.height);
    ctx.drawImage(img2,perso2X,perso2Y);
  }
}

function draw_platform(){

  ctx.beginPath();
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(x_plat, y_plat,canvas.width*0.6, 100);
  ctx.stroke();
}

function draw_sword1(){
  ctx.clearRect(x_sword1,y_sword1,50,100);
  ctx.beginPath();
  ctx.fillStyle = "FFFFFF";
  ctx.rect(x_sword1,y_sword1,50,100);
  ctx.stroke();
}

function jump(){
  if (saut){
    // ctx.clearRect(perso1X,perso1Y,img1.width,img1.height)
    perso1Y = perso1Y-(20-gravite)
    y_sword1 = y_sword1-(20-gravite)
    draw_image("y",(20-gravite))
    gravite+=0.65
    if ((perso1Y > canvas.height*0.7-100) && (perso1Y < canvas.height*0.7-80)  && (perso1X<canvas.width*0.8) && (perso1X>(canvas.width*0.2-(img1.width-5)))){
        perso1Y = canvas.height-(canvas.height*0.3)-img1.height;
        y_sword1 = perso1Y-img1.height/2
        gravite=0
        saut = false
      }
    else if ((perso1Y-img1.height > canvas.height*0.7-10) && (perso1Y-img1.height < canvas.height*0.7)  && (perso1X<canvas.width*0.8) && (perso1X>(canvas.width*0.2-(img1.width-5)))){
        gravite=21
        setTimeout(jump,5);
      }
    else {
      setTimeout(jump,5);
      }
    }
}

function jump2(){
  if (saut2){
    perso2Y = perso2Y-(20-gravite2)
    gravite2+=0.65
    draw_image2("y",(20-gravite))
    if ((perso2Y > canvas.height*0.7-100) && (perso2Y < canvas.height*0.7-80)  && (perso2X<canvas.width*0.8) && (perso2X>(canvas.width*0.2-(img2.width-5)))){
        perso2Y = canvas.height-(canvas.height*0.3)-img2.height;
        gravite2=0
        saut2 = false
      }
    else if ((perso2Y-img2.height > canvas.height*0.7-10) && (perso2Y-img2.height < canvas.height*0.7)  && (perso2X<canvas.width*0.8) && (perso2X>(canvas.width*0.2-(img2.width-5)))){
        gravite2=21
        setTimeout(jump2,5);
      }
    else {
      setTimeout(jump2,5);
      }
    }
}

function fall1(){
  if (is_fall1 && !saut){
    ctx.clearRect(perso1X,perso1Y,img1.width,img1.height)
    perso1Y = perso1Y+gravite
    y_sword1 = y_sword1+gravite
    if ((perso1X<canvas.width*0.8) && (perso1X>(canvas.width*0.2-(img1.width-5))) && perso1Y <canvas.height*0.7) {
     gravite=0
     is_fall1 = false

   }
    else if (perso1Y > canvas.height){
      gravite=0
      is_fall1 = false
    }
    else{
      gravite+=0.3
      setTimeout(fall1,10);
    }
  }
}

function fall2(){
  if (is_fall2 && !saut2){
    ctx.clearRect(perso2X,perso2Y,img2.width,img2.height)
    perso2Y = perso2Y+gravite2
    if ((perso2X<canvas.width*0.8) && (perso2X>(canvas.width*0.2-(img2.width-5))) && perso2Y <canvas.height*0.7) {
     gravite2=0
     is_fall2 = false

   }
    else if (perso2Y > canvas.height){
      gravite2=0
      is_fall2 = false
    }
    else{
      gravite2+=0.3
      setTimeout(fall2,10);
    }
  }
}

function draw() {
  draw_image()
  draw_sword1()
  draw_image2()


  if (rightPressed1 && perso1X < canvas.width-img1.width) {
    if (!(perso1X+img1.width<canvas.width*0.2 && perso1X+img1.width>canvas.width*0.2-7 && perso1Y>y_plat-100 && perso1Y-100<y_plat )){;
      perso1X += 7;
      x_sword1 += 7;
      draw_image("x",-7)

    }
    if (perso1X>canvas.width*0.8 && !is_fall1){
        is_fall1 = true
        fall1()
      }
  }
  else if(leftPressed1 && perso1X > 0) {
    if (!(perso1X>canvas.width*0.8 && perso1X<canvas.width*0.8+10 && perso1Y>y_plat-100 && perso1Y-100<y_plat )){
      ctx.clearRect(perso1X,perso1Y,img1.width,img1.height);
      perso1X -= 7;
      x_sword1 -= 7;
      draw_image("x",7)
    }
    if (perso1X<(canvas.width*0.2-(img1.width-5))&& !is_fall1){
        is_fall1 = true
        fall1()
      }
  }
  if(upPressed1){
    if (saut == false){
      saut = true;
      gravite=0;
      is_fall1 = false;
      jump()
      // console.log(" DRAW Y",perso1Y)
    }
  }

  if (rightPressed2 && perso2X < canvas.width-img2.width) {
    if (!(perso2X+img2.width<canvas.width*0.2 && perso2X+img2.width>canvas.width*0.2-7 && perso2Y>y_plat-100 && perso2Y-100<y_plat )){
      perso2X += 7;
      draw_image2("x",-7)
    }
    if (perso2X>canvas.width*0.8 && !is_fall2){
        is_fall2 = true
        fall2()
      }
  }
  else if(leftPressed2 && perso2X > 0) {
    if (!(perso2X>canvas.width*0.8 && perso2X<canvas.width*0.8+10 && perso2Y>y_plat-100 && perso2Y-100<y_plat )){
      ctx.clearRect(perso2X,perso2Y,img2.width,img2.height);
      perso2X -= 7;
      draw_image2("x",7)
    }
    if (perso2X<(canvas.width*0.2-(img2.width-5))&& !is_fall2){
        is_fall2 = true
        fall2()
      }
  }
  if(upPressed2){
    if (saut2 == false){
      saut2 = true;
      gravite2=0;
      is_fall2 = false;
      jump2()
      // console.log(" DRAW Y",perso1Y)
      }
    }
}

draw_platform()

setInterval(draw, 5);
