class Bounce {
	
	constructor(x,y,r,xspeed,yspeed) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.xspeed = xspeed;
		this.yspeed = yspeed;
		this.lifetime =0;
	}
	
	show(){
		this.lifetime+=2.5;
		if(this.r>0) {
			// this.r = this.r - 1;
		}
		noStroke();	
		fill(55,71,133,255-this.lifetime);
		ellipse(this.x, this.y, this.r, this.r);
	}

	remove(bounceArray, index) {
		if(this.lifetime>255) {
			bounceArray.splice(index, 1);
		}
	}
	
	move() {
		this.x=this.x+this.xspeed;
		this.y=this.y+this.yspeed;
	}
	
	rebound() {
		if(this.x<0) {
			this.xspeed = random(5,10);
		} else if(this.x>width) {
			this.xspeed = random(-5,-10);
		} else if(this.y<0) {
			this.yspeed = random(5,10);
		} else if(this.y>height) {
			this.yspeed = random(-5,-10);
		}
	}

}
