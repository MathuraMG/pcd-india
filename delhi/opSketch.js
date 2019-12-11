var particles_a = [];
var particles_b = [];
var particles_c = [];
var nums =150;
var noiseScale = 800;
var itsday = true;

function setup(){
	let cnv = createCanvas(windowWidth, windowHeight);

	updateTime();
	if(itsday == false){
		background(21, 8, 50);
		cnv.canvas.style.filter = "blur(2px)";
		let title = document.getElementById("_title");
		title.classList.toggle('itsday_title');
		let logo_image = document.getElementById("_logo_image");
		logo_image.classList.toggle('itsday_title');
		let logo_text = document.getElementById("_logo_text");
		logo_text.style.filter= "invert(1)";
	}
	else{
		background(255);
		let title = document.getElementById("_title");
		title.style.filter= "none";
	}
	for(var i = 0; i < nums; i++){
		particles_a[i] = new Particle(random(0, width),random(0,height));
		particles_b[i] = new Particle(random(0, width),random(0,height));
		particles_c[i] = new Particle(random(0, width),random(0,height));
	}
}

function draw(){
	noStroke();
	smooth();
	for(var i = 0; i < nums; i++){
		var radius = map(i,0,nums,1,2);

		var alpha;
		if(itsday == false)	alpha = map(i,0,nums,0,250);
		else 	alpha = map(i,0,nums,0,50);

		if(itsday == false)	fill(69,33,124,alpha);
		else 	fill(248,231,28,alpha);
		particles_a[i].move();
		particles_a[i].display(radius);
		particles_a[i].checkEdge();

		if(itsday == false)	fill(7,153,242,alpha);
		else 	fill(225,71,71,alpha);
		particles_b[i].move();
		particles_b[i].display(radius);
		particles_b[i].checkEdge();

		if(itsday == false)	fill(255,255,255,alpha);
		else 	fill(115,193,232,alpha);
		particles_c[i].move();
		particles_c[i].display(radius);
		particles_c[i].checkEdge();
	}
}

function Particle(x, y){
	this.dir = createVector(0, 0);
	this.vel = createVector(0, 0);
	this.pos = createVector(x, y);
	this.speed = 0.4;

	this.move = function(){
		var angle = noise(this.pos.x/noiseScale, this.pos.y/noiseScale)*TWO_PI*noiseScale;
		this.dir.x = cos(angle);
		this.dir.y = sin(angle);
		this.vel = this.dir.copy();
		this.vel.mult(this.speed);
		this.pos.add(this.vel);
	}

	this.checkEdge = function(){
		if(this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0){
			this.pos.x = random(50, width);
			this.pos.y = random(50, height);
		}
	}

	this.display = function(r){
		ellipse(this.pos.x, this.pos.y, r, r);
	}
}

function updateTime(){
	var today = new Date()
	var curHr = today.getHours()

	if (curHr < 18) {
	  itsday = true;
	} else {
	  itsday = false;
	}
}

