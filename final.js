function setUpCanvas(){
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	x = canvas.width/2;
	y = canvas.height-80;
}

var paddleHeight=10;
var paddleWidth=75;
var paddleX=(canvas.width-paddleWidth)/2;

var rightPressed=false;
var leftPressed=false;

var ballRadius=12;
var brickRowCount=13;
var brickColumnCount=6;
var count = brickRowCount*brickColumnCount;
var rem = count;

var score = 0;
var lives = 10;

var brickWidth=70;
var brickHeight=20;
var brickPadding=5;
var brickOffsetTop=30;
var brickOffsetLeft=25;

var bricks=[];
for(c=0;c<brickColumnCount;++c){
  bricks[c]=[];
  for(r=0;r<brickRowCount;++r){
    bricks[c][r]={x:0,y:0,status:1};
  }
}

var dx=5;
var dy=-5;

function drawBall(){

  ctx.beginPath();
  ctx.arc(x,y,ballRadius,0,Math.PI*2);
  ctx.fillStyle="#fff";
  ctx.fillStroke="#fff";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle(){

  ctx.beginPath();
  ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
  ctx.fillStyle="#37F5FC";
  ctx.fill();
  ctx.closePath();
}

function drawBricks(){

  for(c=0;c<brickColumnCount;++c){
    for(r=0;r<brickRowCount;++r){
       if(bricks[c][r].status==1){
         var brickX=(c*(brickWidth+brickPadding))+brickOffsetLeft;
         var brickY=(r*(brickHeight+brickPadding))+brickOffsetTop;
         bricks[c][r].x=brickX;
         bricks[c][r].y=brickY;
         ctx.beginPath();
         ctx.rect(brickX,brickY,brickWidth,brickHeight);
         ctx.fillStyle="#fff";
         ctx.fill();
         ctx.closePath();
      }
    }
  }
}
function collisionDetection(){

  for(c=0;c<brickColumnCount;++c){
    for(r=0;r<brickRowCount;++r){
       var b=bricks[c][r];
       if(b.status==1){
          if(x>b.x && x<b.x+brickWidth && y>b.y && y<b.y+brickHeight){
             dy=-dy;
             b.status=0;
             score++;
             count--;
             ctx.fill();
             ctx.closePath();
                  if(count<=0){
                     alert("Winner Winner Chicken Dinner!");
                  }
          }
      }
    }
  }
}

function drawScore(){

   ctx.fillStyle="#37F5FC";
   ctx.fillText("SCORE "+score,40,20);
}

function drawTitle() {

    ctx.fillStyle = "#37F5FC";
    ctx.fillText("Final Game" , 220, 20);
}

function drawLives() {

    ctx.fillStyle = "#37F5FC";
    ctx.fillText("LIVES "+lives, 410, 20);
}

function draw(){

    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
		drawTitle();
    drawLives();
    collisionDetection();

    if(y+dy<ballRadius)
      dy=-dy;
    else if(y+dy>canvas.height-ballRadius){
       if(x>=paddleX && x<=paddleX+paddleWidth){
          dy=-dy;
       }
       else{
          lives--;
          if(!lives) {
            alert("Sorry no chicken dinner for you ;(");
          }
          else{
            x=canvas.width/2;
            y = canvas.height-30;
            paddleWidth=80;
            rem=count;
            paddleX=(canvas.width-paddleWidth)/2;
           }
      }
    }
    else
      y+=dy;
    if(x+dx<ballRadius || x+dx>canvas.width-ballRadius)
       dx=-dx;
    else
       x+=dx;
    if(rightPressed && paddleX<canvas.width-paddleWidth)
       paddleX+=7;
    else if(leftPressed && paddleX>0)
       paddleX-=7;
}

function keyDownHandler(e){

  if(e.keyCode==39)
    rightPressed=true;
  else if(e.keyCode==37)
    leftPressed=true;
}

function keyUpHandler(e){

   if(e.keyCode==39)
    rightPressed=false;
   if(e.keyCode==37)
     leftPressed=false;
}

document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);

setInterval(draw,20);
