var dog,dogImage,happydogImage;
var database;
var foodS,foodStock;

function preload()
{
	dogImage = loadImage("images/dogImg.png")
  happydogImage = loadImage("images/dogImg1.png")
}

function setup() {
	database = firebase.database();
  foodStock = database.ref("food");
  foodStock.on("value",readStock,showError);

  createCanvas(500, 500);
  
  dog = createSprite(250,300);
  dog.addImage(dogImage);
  dog.scale = 0.2;
}


function draw() {  
  background("yellow");
  
  if(keyDown ("space")){
    writeStock(foodS);
    dog.addImage(happydogImage);

  }

  drawSprites();
  //add styles here
  
  textSize(30);
  text("Press space to feed dog",50,130);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x <= 0){
    x = 0;
  } else {
    x = x-1;
  }

  database.ref("/").update({
    food : x
  })
}

function showError(){
  console.log("error");
}