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
