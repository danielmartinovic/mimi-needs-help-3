var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height-80;
var paddleHeight=10;
var paddleWidth=75;
var paddleX=(canvas.width-paddleWidth)/2;
var rightPressed=false;  // Whether right control button is pressed
var leftPressed=false;  // Whether left control button is pressed
var ballRadius=12;
var brickRowCount=13;
var brickColumnCount=6;

var count = brickRowCount*brickColumnCount;
var rem = count;

var score = 0;
var lives = 10;  // How many lives player has to complete the game

var brickWidth=70;
var brickHeight=20;
var brickPadding=5;
var brickOffsetTop=30;
var brickOffsetLeft=25;
var speedup1=0;

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
  ctx.stroke="10";
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
         if(c%2!=0)
           ctx.fillStyle="#fff";
         else
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
             /*** Change color of ball when it hits a brick ****/
             ctx.beginPath();
             ctx.arc(x,y,ballRadius,0,Math.PI*2);
             ctx.fillStyle="#00ffff";
             ctx.fillStroke="#00ffff";
             ctx.stroke="10";
             ctx.fill();
             ctx.closePath();
                  if(count<=0){
                     alert("Winner Winner Chicken Dinner!");
                     document.location.reload();
                  }
          }
      }
    }
  }
}

function drawScore(){

   ctx.fillStyle="#37F5FC";
   ctx.fillText("SCORE "+score,40,20);
//   console.log(parseInt(brickRowCount)*parseInt(brickColumnCount)-parseInt(count));
}

function drawLives() {

    ctx.fillStyle = "#37F5FC";
    ctx.fillText("         Final Game                                             LIVES "+lives, canvas.width-310, 20);
}

function draw(){

    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
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
            document.location.reload();
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


