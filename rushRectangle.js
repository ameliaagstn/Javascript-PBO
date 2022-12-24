i = 0;
score = 0; 
mode = 0;

function setup () {
  
  class Map{
  //samping kanan kiri
  constructor() {
    this.x = 0;
    this.y = 0;
    this.height = 600;
    this.width = 150;
    this.col = "ORANGE";
  }
  //pembatas samping sama jalan
  draw (){
      stroke (0);
      strokeWeight (1);
      fill (this.col);
      rect (this.x, this.y, this.width, this.height);
  }
}
 
  //tampilan awal 
  bordL = new Map();
  bordR = new Map();
  bordR.x = 450;
  createCanvas (600, 600);
  background ("#f8ede3");
}
