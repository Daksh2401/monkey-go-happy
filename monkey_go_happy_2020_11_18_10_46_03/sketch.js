var PLAY=1
var END=0
var gameState=PLAY;
var ground,invisibleground;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,200);
  
  monkey= createSprite(60,140,400,20);
  monkey.scale=0.1;
  monkey.addAnimation("yellowboibig",monkey_running);
  
  ground = createSprite(300,180,1200,20);
  ground.x = ground.width /2;
  
  obstacleGroup= new Group();
  FoodGroup= new Group();
  
  var score=0;
}


function draw() {
  background("peachpuff")
  if(gameState === PLAY)
  {   
    ground.velocityX =-4
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    if (ground.x < 0)
    {
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 157)
    {
        monkey.velocityY = -12;
     
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8

  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstacleGroup.isTouching(monkey)){
        gameState = END;
    }
  }
   else if (gameState === END) 
   {
     // gameOver.visible = true;
      //restart.visible = true;
  
      ground.velocityX = 0;
      monkey.velocityY = 0;
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    
     obstacleGroup.setVelocityXEach(0);
     
     
    

   }
  monkey.collide(ground);
   drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -6;          
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }
}






