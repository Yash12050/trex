var trex,trex_dead,trex_running,gamestate,ground,groundimage,cloud,cloudimage,r,cloudgroup,obstaclegroup,obstacle,o1,o2,o3,o4,o5,o6,t,gameover,gameOver,reset,Reset,resetgroup,gameovergroup,score,checkpointsound,deathsound,jumpsound;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_dead = loadAnimation("trex_collided.png")
  groundimage = loadImage("ground2.png")
  cloudimage = loadImage("cloud.png")
  o1 = loadImage("obstacle1.png");
  o2 = loadImage("obstacle2.png");
  o3 = loadImage("obstacle3.png");
  o4 = loadImage("obstacle4.png");
  o5 = loadImage("obstacle5.png");
  o6 = loadImage("obstacle6.png");
  gameover = loadImage("gameOver.png");
  Reset = loadImage("restart.png");
  checkpointsound = loadSound("checkPoint (1).mp3");
  deathsound = loadSound("die (1).mp3");
  jumpsound = loadSound("jump (1).mp3");
}
                                                
function setup() {
  createCanvas(600,300);
  trex = createSprite(50,273);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("dead",trex_dead);
  trex.scale = 0.5;
  gamestate  = "start";
  ground = createSprite(300,291)
  ground.addImage(groundimage);
  ground.setCollider("rectangle",-600,10,1600,15);
  trex.setCollider("circle",0,0,40);
    cloudgroup = new Group();
  obstaclegroup = new Group();
  resetgroup = new Group();
  gameovergroup = new Group();
  score = 0;
}

function draw() {
  background(180);
  if (gamestate === "start"){
    score = score +1;
    if (score %100 ===0 && score> 0){
      checkpointsound.play();
    }
    textSize(15);
    text("score:"+score,490,25);
    gameovergroup.setVisibleEach(false);
    resetgroup.setVisibleEach(false);
    trex.velocityY = trex.velocityY+1
    trex.collide(ground);
    ground.velocityX = -5;
    if (ground.x < 100){
      ground.x = ground.width/2;
    }
    if (keyDown("space") && trex.y >268){
      trex.velocityY = -12; 
      jumpsound.play();
    }
  spawnClouds();
  spawnObstacles();
    obstaclegroup.setLifetimeEach(100);
    cloudgroup.setLifetimeEach(100);
    if(trex.isTouching(obstaclegroup)){
      gamestate = "end";
      deathsound.play();
    }
  }
  else
  if (gamestate === "end"){
    trex.velocityY = 0;
    ground.velocityX = 0;
    obstaclegroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);
    cloudgroup.setLifetimeEach();
    obstaclegroup.setLifetimeEach();
    trex.changeAnimation("dead", trex_dead);
    gameOver = createSprite(300,75);
    gameOver.addImage(gameover);
    gameovergroup.add(gameOver);
    gameovergroup.setVisibleEach(true);
    reset = createSprite(300,140);
    reset.addImage(Reset);
    resetgroup.add(reset);
    resetgroup.setVisibleEach(true);
    score = score;
    textSize(15)
    text("score:"+score,490,25);
    if (mousePressedOver(reset)){
      gamestate = "start";
      cloudgroup.destroyEach();
      obstaclegroup.destroyEach();
      trex.changeAnimation("running", trex_running);
      score = 0;
    }
    
  }
  drawSprites();
}

function spawnClouds(){
  r = random(10,200);
  if (World.frameCount % 80 ===0){
  cloud = createSprite(600,r);
  cloud.addImage(cloudimage);
  cloud.velocityX = ground.velocityX;
    cloudgroup.add(cloud);
  } 
}

function spawnObstacles(){
  if (World.frameCount % 70 ===0){
    t = Math.round(random(1,6));
    obstacle = createSprite(600,280);
    switch(t){
       case 1: obstacle.addImage(o1);
        break;
        case 2 : obstacle.addImage(o2);
        break;
        case 3 : obstacle.addImage(o3);
        break;
        case 4 : obstacle.addImage(o4);
        break;
        case 5 : obstacle.addImage (o5);
        break;
        case 6 : obstacle.addImage (o6);
    }
    obstacle.velocityX = -5;
    obstacle.scale = 0.4;
    obstaclegroup.add(obstacle);
  }
}