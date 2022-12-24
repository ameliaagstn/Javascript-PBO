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

function draw () {
  // kalo pencet enter maka mode === 1
  if (keyCode === ENTER ){
        mode = 1;
    }
  if (mode === 0){
    fill ("#85586f");
    textAlign (CENTER);
    textSize (38);
    text ("Tekan ENTER untuk", 300, 275);
    text ("memulai permainan", 300, 325);

  }
  if (mode === 1){
    background ("WHITE"); //untuk warna jalan
    bordL.draw ();
    bordR.draw ();
    moveLines ();
    pemain.draw ();
    moveCars ();

    //tampilan atas
    fill(10);
    rect(0, 0, 600, 40);
    noStroke();
    
    //Menampilkan score 
    fill("RED");
    textSize(15);
    text(`SCORE : ${score}`, 45, 25);
    
    //Menampilkan nama 
    fill("YELLOW");
    textSize(10);
    text('Made by :', 570, 15);
    fill("CYAN");
    textSize(12);
    text('Kartika & Amelia', 545, 28)
  }
  
}

//garis tengah jalan 1
let _line = {
    x: 300,
    y:0,
    x2: 300,
    y2: 50,
    sp: 5,
    draw: function (){
        strokeWeight (4);
        stroke ("BLACK");
        line (this.x, this.y, this.x2, this.y2);
  },
  //garis jalan
  move: function (){
    this.y += this.sp;
    this.y2 += this.sp;
    if (this.y > height){
      this.y = -50;
      this.y2 = 100;
    }
  }
}

//garis tengah jalan 2
let _line1 = {
  x: 300,
  y: 300,
  x2: 300,
  y2: 350,
  sp: 5,
  draw: function (){
      strokeWeight (4);
      stroke ("BLACK");
      line (this.x, this.y, this.x2, this.y2);
  },
  //garis jalan
  move: function (){
    this.y += this.sp;
    this.y2 += this.sp;
    if(this.y > height){
      this.y = -50;
      this.y2 = 100;
    }
  }
}

//untuk menjalankan garis
function moveLines(){
  _line.draw();
  _line.move();
  _line1.draw();
  _line1.move();
}


//pemain
let pemain = {
  x: 400,
  sp: 10,
  y: 500,
  width: 40,
  height: 55,
  draw: function (){
    noStroke ();
    fill ("BLUE");
    rect (this.x, this.y, this.width, this.height);
    fill ("#e5b9d6");
    rect (this.x+5, this.y+10, this.width-10, this.height-20);
    textSize (10);
    fill(0);
    text ('YOU', this.x, this.y+23, this.width, this.height);
  },
  
  //untuk menggerakkan pemain
  move: function move(){
      //panah kanan ke kanan (di dalam jalan)
    if ((keyIsPressed) && (keyCode === RIGHT_ARROW) && (this.x + this.width !== width -150)){
      this.x += this.sp;
    }
    //panah kiri gerak ke kiri (di dalam jalan)
    if ((keyIsPressed) && (keyCode === LEFT_ARROW) && (this.x !== 150)){
      this.x -= this.sp;
    }
  }
}

//musuh1
let musuh1 = {
  x: 170,
  sp: 8,
  y: -50,
  width: 40,
  height: 55, 
  col: [19, 4, 255],
  draw: function (){
    fill (this.col[0], this.col[1], this.col[2]);
    rect (this.x, this.y, this.width, this.height);
  }, 
  move: function (){
      this.y += this.sp;
    //jika musuh1 sampai tepi bawah maka ngulang dari atas
  if (this.y > height){
    this.y = 0;
    }
  }
}

//musuh2
let musuh2 = {
  x: 330,
  sp: 8,
  y: -250,
  width: 40,
  height : 55,
  col: [255, 79, 80],
  draw: function (){
    fill (this.col[0], this.col[1], this.col[2]);
    rect (this.x, this.y, this.width, this.height);
  },
  move: function(){
    //menggerakkan musuh2
      this.y += this.sp;
    //jika musuh2 sampai tepi bawah maka ngulang dari atas
  if(this.y > height){
    this.y = 0;
    }
  }
}

//menggerakkan musuh
function moveRect (){
    //spawn random
  if (musuh1.y <= 0){
    musuh1.sp = random (5, 15)
    musuh1.x = random (155,410);
    //warna random
    musuh1.col[1] = random (255);
    musuh1.col[2] = random (255);

  }
  if (musuh2.y <= 0){
    musuh2.sp = random (5, 15)
    musuh2.x = random (155,410);
    musuh2.col[1] = random (255);
    musuh2.col[2] = random (255);

  }
  
  if (musuh1.y === 0 || musuh2.y === 0 ){
      score++;
  } 

  //untuk menjalankan & menampilkan player
  pemain.move();
  musuh1.draw();
  musuh1.move();
  musuh2.draw();
  musuh2.move();

  //tabrakan
  let collide = collideCar (pemain.x, pemain.y, pemain.width, pemain.height, musuh1.x, musuh1.y, musuh1.width, musuh1.height);
  //jika tabrakan akan mengembalikan fungsi stop
  if (collide){
    stop();
  }
  
  let collide2 = collideCar (pemain.x, pemain.y, pemain.width, pemain.height, musuh2.x, musuh2.y, musuh2.width, musuh2.height);
  if (collide2){
    stop ();
  }
}

function collideCar (x, y, width, height, x2, y2, width2, height2) {
  //kondisi collide
  //sisi berhadapan ketemu = game over
  if (x + width >= x2 &&    
      x <= x2 + width2 &&    
      y + height >= y2 &&   
      y <= y2 + height2) {    
      return true;
    }
}

//game over
function stop (){
  background("BLACK")
    fill ("WHITE");
    noStroke ();
    textSize (38);
    text ("GAME OVER!!!", 300, 300);
    textSize (24);
    noStroke ();
    text (`${"score kamu : "}${score}`, 300, 350);
    noLoop ();
}
