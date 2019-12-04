var canvas = document.createElement('canvas');
canvas.width = document.body.clientWidth
canvas.height = document.body.clientHeight
document.body.appendChild(canvas);
var ctx = canvas.getContext("2d");

var img1 = new Image();
img1.height = 100;
img1.width = 100;
img1.src = '/static/perso.png';
// img1.src = 'perso.png';

var img2 = new Image();
img2.src = '/static/perso2.png';
 // img2.src = 'perso2.png'

img2.height = 100;
img2.width = 100;

var img3 = new Image();
img3.src = '/static/epee.png';


var height_sword = 100;
var weight_sword = 50;


var perso1X = (canvas.width)/3;
var perso1Y = canvas.height-(canvas.height*0.3)-img1.height;
var x_sword1 = perso1X+img1.width
var y_sword1 = perso1Y+(img1.height/2)




var perso2X = ((canvas.width)/3)*2;
var perso2Y = canvas.height-(canvas.height*0.3)-img1.height;
var x_sword2 = perso2X
var y_sword2 = perso2Y+(img2.height/2)


var x_plat = canvas.width-(canvas.width*0.8)
var y_plat = canvas.height-(canvas.height*0.3)

var nbHitPlayer1 = 0
var nbHitPlayer2 = 0

var debut = new Date;


var rightPressed1 = false;
var leftPressed1 = false;
var upPressed1 = false;
var hitPressed1 = false

var rightPressed2 = false;
var leftPressed2 = false;
var upPressed2 = false;
var hitPressed2 = false

var saut = false;
var is_fall1 = false;
var hit1 = false;
var gravite = 0;

var saut2 = false;
var is_fall2 = false;
var gravite2 = 0;
var hit2 = false;

var life_perso1 = 3
var life_perso2 = 3



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
    if(e.keyCode == 96){
        hitPressed1 = true
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
    if(e.keyCode == 32){
        hitPressed2 = true
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
    if(e.keyCode == 96){
      hitPressed1 = false
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
      if(e.keyCode == 32){
        hitPressed2 = false
      }
}



function draw_image(position = null,valeur=null){
  if (position == null){
    ctx.clearRect(perso1X,perso1Y,img1.width,img1.height);
    ctx.drawImage(img1,perso1X,perso1Y);
  }
  else if (position == "x") {
    ctx.clearRect(perso1X+valeur,perso1Y,img1.width,img1.height);
    ctx.drawImage(img1,perso1X,perso1Y);

  }  else if (position == "y") {
      ctx.clearRect(perso1X,perso1Y+valeur,img1.width,img1.height);
      ctx.drawImage(img1,perso1X,perso1Y);
    }

}
function draw_image2(position = null,valeur=null){
  if (position == null){
  ctx.clearRect(perso2X,perso2Y,img2.width,img2.height);
  ctx.drawImage(img2,perso2X,perso2Y);
  }
  else if (position == "x") {
    ctx.clearRect(perso2X+valeur,perso2Y,img2.width,img2.height);
    ctx.drawImage(img2,perso2X,perso2Y);
  }  else if (position == "y") {
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
  ctx.clearRect(0,0,0,-100);
  // ctx.beginPath();
  // ctx.fillStyle = "FFFFFF";
  // ctx.rect(0,0,50,-100);
  // ctx.stroke();
  ctx.drawImage(img3,0,-100);
  if (perso2X < perso1X+img1.width+100 && perso2X > perso1X+img1.width){
    perso2X = perso2X+15
    x_sword2= x_sword2+15
    nbHitPlayer1 += 1
    if (perso2X>canvas.width*0.8 && !is_fall2){
        is_fall2 = true
        fall2()
      }
    return true
  }else{
    return false
  }

}

function draw_sword2(){

  ctx.clearRect(0,0,-50,-100);
  // ctx.beginPath();
  // ctx.fillStyle = "FFFFFF";
  // ctx.rect(0,0,-50,-100);
  // ctx.stroke();
  ctx.drawImage(img3,-50,-100);
  if (perso1X+img1.width > perso2X-100 && perso1X+img1.width < perso2X){
    perso1X = perso1X-15
    x_sword1= x_sword1-15
    nbHitPlayer2 += 1
    if (perso1X<(canvas.width*0.2-(img1.width-5))&& !is_fall1){
        is_fall1 = true
        fall1()
      }
    return true
  }else{
    return false
  }
}

async function jump(){
  if (saut){
    // ctx.clearRect(perso1X,perso1Y,img1.width,img1.height)
    perso1Y = perso1Y-(20-gravite)
    y_sword1 = y_sword1-(20-gravite)
    draw_image("y",(20-gravite))
    gravite+=0.65
    if ((perso1Y > canvas.height*0.7-100) && (perso1Y < canvas.height*0.7-80)  && (perso1X<canvas.width*0.8) && (perso1X>(canvas.width*0.2-(img1.width-5)))){
        perso1Y = canvas.height-(canvas.height*0.3)-img1.height;
        y_sword1 = perso1Y+(img1.height/2)
        gravite=0
        saut = false
      }
    else if ((perso1Y-img1.height > canvas.height*0.7-10) && (perso1Y-img1.height < canvas.height*0.7)  && (perso1X<canvas.width*0.8) && (perso1X>(canvas.width*0.2-(img1.width-5)))){
        gravite=21
        setTimeout(jump,5);
      }
    else if (perso1Y > canvas.height){
      gravite=0
      saut = false
      life_perso1 -=1
      if (life_perso1 == 0){
        var data = new FormData();
        data.append("Player1Win",false)
        data.append("Player2Win",true)
        data.append("NbHitPlayer1",nbHitPlayer1)
        data.append("NbHitPlayer2",nbHitPlayer2)
        var end = new Date
        var time =end.getTime()- debut.getTime()
        data.append("Time",time)
        var req = new XMLHttpRequest();
        req.open("POST","/game/endgame")
        req.send(data)
        await sleep(500);
        window.location.href="/play/endgame"
      }else{
          perso1X = (canvas.width)/3;
          perso1Y = canvas.height-(canvas.height*0.3)-img1.height;
          draw_image()
        }
    }else {
      setTimeout(jump,5);
      }
    }
}

async function jump2(){
  if (saut2){
    perso2Y = perso2Y-(20-gravite2)
    y_sword2 = y_sword2-(20-gravite2)
    draw_image2("y",(20-gravite2))
    gravite2+=0.65
    if ((perso2Y > canvas.height*0.7-100) && (perso2Y < canvas.height*0.7-80)  && (perso2X<canvas.width*0.8) && (perso2X>(canvas.width*0.2-(img2.width-5)))){
        perso2Y = canvas.height-(canvas.height*0.3)-img2.height;
        y_sword2 = perso2Y+(img2.height/2)
        gravite2=0
        saut2 = false
      }
    else if ((perso2Y-img2.height > canvas.height*0.7-10) && (perso2Y-img2.height < canvas.height*0.7)  && (perso2X<canvas.width*0.8) && (perso2X>(canvas.width*0.2-(img2.width-5)))){
        gravite2=21
        setTimeout(jump2,5);
      }
    else if (perso2Y > canvas.height){
      gravite2=0
      life_perso2 -=1
      saut2 = false
      if (life_perso2 == 0){
        var data = new FormData();
        data.append("Player1Win",true)
        data.append("Player2Win",false)
        data.append("NbHitPlayer1",nbHitPlayer1)
        data.append("NbHitPlayer2",nbHitPlayer2)
        var end = new Date
        var time =end.getTime()- debut.getTime()
        data.append("Time",time)
        var req = new XMLHttpRequest();
        req.open("POST","/game/endgame")
        req.send(data)
        await sleep(500);
        window.location.href="/play/endgame"

      }else {

        perso2X = ((canvas.width)/3)*2;
        perso2Y = canvas.height-(canvas.height*0.3)-img1.height;
        draw_image2()}
    }else {
      setTimeout(jump2,5);
      }
    }
}

async function fall1(){
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
      life_perso1 -=1
      if (life_perso1 == 0){
        var data = new FormData();
        data.append("Player1Win",false)
        data.append("Player2Win",true)
        data.append("NbHitPlayer1",nbHitPlayer1)
        data.append("NbHitPlayer2",nbHitPlayer2)
        var end = new Date
        var time =end.getTime()- debut.getTime()
        data.append("Time",time)
        var req = new XMLHttpRequest();
        req.open("POST","/game/endgame")
        req.send(data)
        await sleep(500);
        window.location.href="/play/endgame"

      }else{
        perso1X = (canvas.width)/3;
        perso1Y = canvas.height-(canvas.height*0.3)-img1.height;
        x_sword1 = perso1X+img1.width
        y_sword1 = perso1Y+(img1.height/2)
        draw_image()
      }
    }
    else{
      gravite+=0.3
      setTimeout(fall1,10);
    }
  }
}

async function fall2(){
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
      life_perso2 -=1
      if (life_perso2 == 0){
        var data = new FormData();
        data.append("Player1Win",true)
        data.append("Player2Win",false)
        data.append("NbHitPlayer1",nbHitPlayer1)
        data.append("NbHitPlayer2",nbHitPlayer2)
        var end = new Date
        var time =end.getTime()- debut.getTime()
        data.append("Time",time)
        var req = new XMLHttpRequest();
        req.open("POST","/play/endgame");
        req.send(data);
        await sleep(500);
        window.location.href="/play/endgame"
      }else {

        perso2X = ((canvas.width)/3)*2;
        perso2Y = canvas.height-(canvas.height*0.3)-img1.height;
        x_sword2 = perso2X
        y_sword2 = perso2Y+(img2.height/2)
        draw_image2()
      }
    }
    else{
      gravite2+=0.3
      setTimeout(fall2,10);
    }
  }
}


function fct_hit1() {
  // draw_sword1()

  if (aller) {
    if (hit1 == true && rotate < 90){

        ctx.save();
        ctx.translate(x_sword1,y_sword1)
        ctx.rotate(rotate * (Math.PI / 180));
        var touche = draw_sword1()
        ctx.stroke();
        ctx.restore();
        rotate+=5
        if (touche){
          draw_image2()
        }
      }else{
        aller = false
      }
      setTimeout(fct_hit1,10);
  }else {
    if (hit1 == true && rotate > 0){

      ctx.save();
      ctx.translate(x_sword1,y_sword1)
      ctx.rotate(rotate * (Math.PI / 180));
      draw_sword1()
      ctx.stroke();
      ctx.restore();
      rotate-=5
      setTimeout(fct_hit1,10);
    }else {
      hit1 = false
      rotate = 0
    }
  }
}

function fct_hit2() {
  // draw_sword1()

  if (aller2) {
    if (hit2 == true && rotate2 < 90){
        ctx.save();
        ctx.translate(x_sword2,y_sword2)
        ctx.rotate(-rotate2 * (Math.PI / 180));
        var toucher = draw_sword2()
        ctx.stroke();
        ctx.restore();
        if (toucher){
          draw_image()
        }
        rotate2+=5
      }else{
        aller2 = false
      }
      setTimeout(fct_hit2,10);
  }else {
    if (hit2 == true && rotate2 > 0){
      ctx.save();
      ctx.translate(x_sword2,y_sword2)
      ctx.rotate(-rotate2 * (Math.PI / 180));
      draw_sword2()
      ctx.stroke();
      ctx.restore();
      rotate2-=5
      setTimeout(fct_hit2,10);
    }else {
      hit2 = false
      rotate2 = 0
    }
  }
}

function draw() {
  draw_image()
  // draw_sword1()
  draw_image2()


  if (rightPressed1 && perso1X < canvas.width-img1.width) {
    if (!(perso1X+img1.width<canvas.width*0.2 && perso1X+img1.width>canvas.width*0.2-7 && perso1Y>y_plat-100 && perso1Y-100<y_plat )){
      perso1X += 7;
      x_sword1 += 7;
      if (perso1X+img1.width > perso2X && perso1X < perso2X+img2.width && perso1Y+img1.height >= perso2Y && perso1Y+img1.height <= perso2Y+img2.height){
        perso1X -= 7;
        x_sword1 -= 7;
      }else{
        draw_image("x",-7)
      }
    }
    if (perso1X>canvas.width*0.8 && !is_fall1){
        is_fall1 = true
        fall1()
      }
  }
  else if(leftPressed1 && perso1X > 0) {
    if (!(perso1X>canvas.width*0.8 && perso1X<canvas.width*0.8+10 && perso1Y>y_plat-100 && perso1Y-100<y_plat )){
      // ctx.clearRect(perso1X,perso1Y,img1.width,img1.height);
      perso1X -= 7;
      x_sword1 -= 7;
      if (perso1X > perso2X && perso1X < perso2X+img2.width && perso1Y+img1.height >= perso2Y && perso1Y+img1.height <= perso2Y+img2.height){
        perso1X += 7;
        x_sword1 += 7;
      }else{
        draw_image("x",7)
      }
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

  if (hitPressed1){
    if (hit1 == false){
      hit1 = true
      aller = true
      rotate = 0
      fct_hit1()
    }
  }


  if (rightPressed2 && perso2X < canvas.width-img2.width) {
    if (!(perso2X+img2.width<canvas.width*0.2 && perso2X+img2.width>canvas.width*0.2-7 && perso2Y>y_plat-100 && perso2Y-100<y_plat )){
      perso2X += 7;
      x_sword2 += 7;
      if (perso2X+img2.width > perso1X && perso2X < perso1X+img1.width && perso2Y+img2.height >= perso1Y && perso2Y+img2.height <= perso1Y+img1.height){
        perso2X -= 7;
        x_sword2 -= 7;
      }else{
        draw_image2("x",-7)
      }

    }
    if (perso2X>canvas.width*0.8 && !is_fall2){
        is_fall2 = true
        fall2()
      }
  }
  else if(leftPressed2 && perso2X > 0) {
    if (!(perso2X>canvas.width*0.8 && perso2X<canvas.width*0.8+10 && perso2Y>y_plat-100 && perso2Y-100<y_plat )){
      // ctx.clearRect(perso2X,perso2Y,img2.width,img2.height);
      perso2X -= 7;
      x_sword2 -= 7;
      if (perso2X > perso1X && perso2X < perso1X+img1.width && perso2Y+img1.height >= perso1Y && perso2Y+img2.height <= perso1Y+img1.height){
        perso2X += 7;
        x_sword2 += 7;
      }else{
        draw_image2("x",7)
      }
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
  if (hitPressed2){
    if (hit2 == false){
      hit2 = true
      aller2 = true
      rotate2 = 0
      fct_hit2()
    }
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

draw_platform()

setInterval(draw, 5);
