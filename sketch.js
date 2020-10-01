//Create variables here
const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;



var dog,happydog,database,foodS,foodStock;
var dogimg,happyDogimg;
var addFood ,feed;
var fedTime,lastFed;
var foodObj;
function preload()
{
  //load images here
  dogimg = loadImage("images/dogImg.png");
  happyDogimg = loadImage("images/dogImg1.png");
}
function setup() {
  engine = Engine.create();
  world = engine.world;
  database=firebase.database();
  createCanvas(1000,400);
  dog = createSprite(800,250,10,10);
  dog.scale = 0.25;
  dog.addImage(dogimg);
  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
   
   
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}


function draw() {  
  Engine.update(engine)
  background(46,139,87);
  foodObj.display();
  
  fedTime=database.ref('fedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
   drawSprites();
}

function feedDog(){
  
  dog.addImage(happyDogimg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food : foodObj.getFoodStock(),
    fedTime : hour()
  })
  
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}







