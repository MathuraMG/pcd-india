//
let bgcolor;
//
let gridFactor = 70.0;
let cols, rows;
let offCols = 4;

//
let posArray = [];
let twoo = [];
//
let font;
let name = '';

function setup() {
	var canvas = createCanvas(500, 500);
  //
  canvas.style('padding-left', '0');
  canvas.style('padding-right', '0');
  canvas.style('margin-left', 'auto');
  canvas.style('margin-right', 'auto');
  canvas.style('display', 'block');
  //
  canvas.parent('sketch-holder');

  document.getElementById('defaultCanvas0').style.position = 'static';

  //
	smooth(8);
  //
  bgcolor = color(240);
  background(bgcolor);
	//
  //
  cols = 5;//int(windowWidth/(gridFactor))- offCols;
  rows = 5;//int(windowHeight/(gridFactor)) - offCols;
  //
  setupGrid(cols, rows, gridFactor);
	textAlign(CENTER);
  //
	font = loadFont('./fonts/SourceCodePro-Light.ttf');
	textFont(font);
}


/**/
function setupGrid(cols, rows, unitLength){
  //posArray = new PVector[cols][rows];
  //twoo = new TWOO[cols][rows];
  //
  for(let x=0; x<cols ; x++){
    posArray[x] = [];
		twoo[x] = [];
		for(let y=0; y<rows ; y++){
			//
      posArray[x][y] = createVector(x*unitLength + (unitLength/2), y*unitLength + (unitLength/2));
      //
			let index = createVector(x,y);
      twoo[x][y] = new TWOO();
			twoo[x][y].create(index, posArray[x][y], gridFactor);
      twoo[x][y].clearSelection(0);
    }
  }
}

function keyPressed() {
	let isUpperCase = false;
	if(key == key.toUpperCase())
		isUpperCase = true;

	if(isUpperCase)
		key = key.toLowerCase();

	if (key >= 'a' && key < 'z') {
    name += key;
		let loc = (key.charCodeAt(0) - 'a'.charCodeAt(0));
		let x = int(loc/cols);
		let y = loc - cols*x;
		//
		//twoo[y][x].flipSelection();
		twoo[y][x].rotateHalfCycle();
		//
  }

	if(key == ' '){
		name += key;

  }

	if(keyCode == DELETE || keyCode == BACKSPACE){
		if(name != ''){
			let keyTobeReset = name.substring( name.length - 1, name.length);
			if(keyTobeReset != ' '){
				let loc = (keyTobeReset.charCodeAt(0) - 'a'.charCodeAt(0));
				let x = int(loc/cols);
				let y = loc - cols*x;
				//
				//twoo[y][x].flipSelection();
				twoo[y][x].rotateHalfCycle();
				//
			}
			name = name.substring(0, name.length - 1);
		}
	}
}

/*===========================*/


function displayTitle() {
  fill(80);
  textAlign(CENTER);
  //
  textSize(30);
  text("PCD@DELHI 2019", width/2.0, height/2.0 - rows*gridFactor/2.0 - 25);
	textSize(18);
  if(name == '')
  	text("TYPE YOUR NAME", width/2.0, height/2.0 + rows*gridFactor/2.0 + 45);
	else
		text(name.toUpperCase(), width/2.0, height/2.0 + rows*gridFactor/2.0 + 45);
  //
  let txt = "";
  text(txt, width/2.0, 565);
}


function draw() {
	background(bgcolor);
  //
  push();
  translate(width/2.0 - cols*gridFactor/2.0, height/2.0 - rows*gridFactor/2.0);
  for(let x=0; x<cols ; x++)
    for(let y=0; y<rows ; y++)
      twoo[x][y].draw();
  pop();
  //
	displayTitle();
	//
	noFill();
	stroke(0);
	rect(5, 5, 490, 490);
}

function mousePressed(){
  setTimeout(function(){

    /* ROTATE ANIMATE */
    for(let x=0; x<cols ; x++){
      for(let y=0; y<rows ; y++){
        twoo[x][y].rotateHalfCycle();
      }
    }

  }, 200);

}

function TWOO(){
  //
  //
  let center;
  //
  let XYindex;
  let position;
  let scale;
  //
  let slash, prev_slash;
  let anim_time = 0;
  let rotateCount = 0;
  //

	this.create = function(grid_index, pos, scl){
		XYindex = grid_index;
		let unit_vector = createVector(1,1);
    XYindex.add(unit_vector);
    position = pos;
    center = createVector(position.x,position.y);
    scale = scl;
	}


  this.clearSelection = function(clearVal){
    anim_time = 1;
    rotateCount = 1;
    slash = clearVal;//int(random(2));
  }

  this.randomSelection = function(){
    //
    prev_slash = slash;
    slash = int(random(2));
  }

	this.flipSelection = function(){
    //
    prev_slash = slash;
		if(slash == 0)
			slash = 1;
		else
			slash = 0;
  }

  this.rotateHalfCycle = function(){
    rotateCount++;
  }

  this.draw = function(){
    //
    anim_time += 0.01;
    if(anim_time > rotateCount)  anim_time = rotateCount;
    let anim_direction = -1;
    if(int(XYindex.x)%2 == 0)
      anim_direction = 1;
    if(int(XYindex.y)%2 == 0)
      anim_direction = 1;
    //
    this.drawCell(slash, center, anim_time, anim_direction);
  }

  this.drawCell = function(id, pos, animScale, _anim_direction){
   //
   //
   let x = pos.x;
   let y = pos.y;
   let radius = scale/2;
   push();
   translate(x, y);
   strokeWeight(1.5);
   strokeCap(ROUND);
   //
   rotate(_anim_direction*animScale*PI/2);
   if(id == 0 )
       rotate(0);
     else
       rotate(PI/2);
   //
   let nearest_count = int(animScale);
   let minLineLength = (radius/sqrt(2.0));
   let maxLineLength = radius;
   let value = (1-sin((animScale-nearest_count)*PI));
   let mappedLineLength = map(value, 0, 1, minLineLength, maxLineLength);
   //
   line(
     -mappedLineLength,
     -mappedLineLength,
      mappedLineLength,
      mappedLineLength
   );
   //
   pop();
  }

}