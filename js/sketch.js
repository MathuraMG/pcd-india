let bounce = [];
let numberBounce =1000;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight*0.4 );
}

function draw() {
	background("#24305E99");
	for(let i=0;i<bounce.length;i++) {	
		bounce[i].show();
		bounce[i].move();
    bounce[i].rebound();
    bounce[i].remove(bounce, i);
	}
}


function mouseMoved(){
	bounce.push(
		new Bounce(
			mouseX,
			mouseY,
			random(10,30),
			random(-5,5),
			random(-5,5)
		)
	);	
}