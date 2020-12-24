
var monkey, monkeyRunning;
var banana, bananaImage, rock, rockImage;
var ground, invisGround;
var foodGroup, rockGroup;
var score = 0;

function preload() {
  monkeyRunning = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  rockImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  monkey = createSprite(60, 450, 20, 20);
  monkey.addAnimation("monkey", monkeyRunning);
  monkey.scale = 0.15;
  //monkey.velocityY = 6;
  invisGround = createSprite(300, 570, 599, 10);
  monkey.velocityY = 0;
  
  rockGroup = new Group();
  foodGroup = new Group();
  
}

function draw() {
  background("white");
  
  monkey.collide(invisGround);
  invisGround.visible = false;
  
  // jump
  if(keyDown("space") && monkey.y >= 518.9) {
    monkey.velocityY = -15;
  }
  
  // gravity
  monkey.velocityY = monkey.velocityY + 0.8;
  
  score = score + Math.round(getFrameRate()/60);
  
  if(frameCount % 103 == 0) {
    Rocks();
  }
  if(frameCount % 80 == 0) {
    spawnFood();
  }
  
  drawSprites();
  
  text("Score: " + score, 255, 20)
}

function Rocks() {
  rock = createSprite(width, 545, 20, 20);
  rock.velocityX = -(10 + score / 100); 
  rock.scale = 0.15;
  rock.lifetime = width/rock.velocityX;
  rock.addImage("rock", rockImage);
  rockGroup.add(rock);
}

function spawnFood() {
  var r = Math.round(random(300, 500))
  banana = createSprite(width, r, 20, 20);
  banana.velocityX = -(10 + score / 100);
  banana.scale = 0.15;
  banana.lifetime = width/banana.velocityX;
  banana.addImage("banana", bananaImage);
  foodGroup.add(banana);
  
}
