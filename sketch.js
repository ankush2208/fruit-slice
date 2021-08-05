//Game States
var PLAY=1;
var END=0;
var gameState=1;

var knife,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit, position2,
position;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage, 
swooshSound , GMsound;

function preload(){
  
  knifeImage = loadImage("knife.png");
  monsterImage = loadAnimation("alien1.png","alien2.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png");
  swooshSound = loadSound("knifeSwoosh.mp3");
  GMsound = loadSound("gameover.mp3")
}



function setup() {
  createCanvas(windowWidth,windowHeight);
  
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  // Score variables and Groups
  score=0;
  fruitGroup=createGroup();
  monsterGroup=createGroup();
  
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    //Call fruits and Monster function
    fruits();
    Monster();
    
    // Move sword with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
    
   
    // Increase score if sword touching fruit
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      score = score +2
      swooshSound.play();
    }
    else
    {
      // Go to end state if sword touching enemy
      if(monsterGroup.isTouching(knife)){
        gameState=END;
        GMsound.play();
        
       fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        
        // Change the animation of sword to gameover and reset its position
        knife.addImage(gameOverImage);
        knife.scale=2;
        knife.x=600;
        knife.y=300;
      }
    }
  }
   drawSprites();
  //Display score
  textSize(40);
  text("Score : "+ score,250,50);
}


function Monster(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    position2 =Math.round(random(1,2));
    monster.y=Math.round(random(100,550));
    monster.setLifetime=50;
    monsterGroup.add(monster); 
    if(position2===1){
      monster.x=0
  // to increase monsterGroup speed by 10
    monster.velocityX = (8 + score/10);
    }
    if(position2===2){
    monster.x=windowWidth;
 // to increase monsterGroup speed by 10
    monster.velocityX = -(8 + score/10);

    }
  }
}

function fruits(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
    fruit=createSprite(400,200,20,20);
    
     //using random variable change the position of fruit, to make it more challenging
    
    if(position === 1)
    {
    fruit.x=windowWidth;
    //to  increase fruitGroup speed by 4
    fruit.velocityX = -(7 + score/4);
    }
    else
    {
      if(position === 2){
      fruit.x=0;
    //to increase fruitGroup speed by 4
     fruit.velocityX = (7 + score/4);
      }
    }
    
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
   switch(r){
    case 1:fruit.addImage(fruit1);
           break;
    case 2:fruit.addImage(fruit2);
           break;
    case 3:fruit.addImage(fruit3);
           break;
    case 4:fruit.addImage(fruit4);
           break;
  }
    fruit.y=Math.round(random(50,550));
    fruit.setLifetime=100;
    fruitGroup.add(fruit);
  }
}