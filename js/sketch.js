let bounce = [];
let numberBounce =1000;

function setup() {
	// console.log(window.innerWidth)
	if(window.innerWidth >768) {
		createCanvas(window.innerWidth, window.innerHeight*0.4 );
	} else {
		createCanvas(window.innerWidth, window.innerHeight*0.6 );
	}
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

function touchMoved(){
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