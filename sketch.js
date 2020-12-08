var database;
var foodS,foodStock;
var dog,dogImage,dogHappyImage;

function preload() {
  dogImage = loadImage("Dog.png");
  dogHappyImage = loadImage("happydog.png");
}

function setup() {

  

  database = firebase.database();
	createCanvas(800, 700);
  dog = createSprite(400,450,50,50);
  dog.addImage(dogImage);
  dog.scale = 0.3;
  foodStock = database.ref('Food'); 
  foodStock.on("value",readStock)

  database.ref('/').update({Food:30})
}


function draw() {  
  background(46, 139, 87);

  if(keyDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(dogHappyImage);
  }

  drawSprites();
  textSize(30);
  stroke("black");
  fill("red");
  text("food remaining : " + foodS,280,100);
  text("NOTE : press up arrow to feed the pet",150,50)
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if(x<=0) {
    x = 0;
  }
  else {
    x = x - 1;
  }

  database.ref('/').update({Food:x})
}