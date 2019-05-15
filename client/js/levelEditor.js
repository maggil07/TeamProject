// levelEditor provides index with the level editor functionality. It provides
// the codes needed to recognize which entiry to draw to each coodinate block.
// also provides faculty codes and enables scroling to make large levels.


let mousePos;
let currentLevel;
let moveScreen;
// calculates mouse position and adjusts based on 64px grid
MousePos = function(x,y,xoff,yoff,code) {
    let self ={x:x,
		y:y,
		xoff:xoff,
		yoff:yoff,
		code:code,
	};
	self.xmax=0;
	self.ymax=0;



	self.draw=function(){
		let x=self.x-(self.xoff*64);
		let y=self.y-(self.yoff*64);
		x=(Math.floor(x/64))*64;
		y=(Math.floor(y/64))*64;
		if((x/64)>self.xmax){
			self.xmax=x/64;
		}
		if((y/64)>self.ymax){
			self.ymax=y/64;
		}
		deathY=self.ymax;
		console.log(deathY);

		console.log(self.xmax+", "+self.ymax);
		for(let key1 in Entity.list){
			let e=Entity.list[key1];
			if(e.x==x&e.y==y){
				e.remove=true;
			}
		}

		if(self.code=='p'){
			player.x=x;
			player.y=y;
			player.update();

		}
		else if(self.code=='e'){
			Enemy.generate(x,y);
			Enemy.update();
		}
		else if(self.code=='f'||self.code=='b'){
			Platform.generate(x,y,self.code);
			Platform.update();
		}
		else if(self.code=='a'){
			Assignment.generate(x,y);
			Assignment.update();
		}
		else if(self.code=='l'){
			Final.generate(x,y);
			Final.update();
		}
		else if(self.code=='m'){
			Midterm.generate(x,y);
			Midterm.update();
		}
		else if(self.code=='d'){
			for(let key in Entity.list){
				let e=Entity.list[key];
				if(e.x==x&&e.y==y){
					e.remove=true;
				}
			}
		}
	}

	return self;
}

CurrentLevel=function(){
	let self={
		w:20,
		h:11,
		fac:'cs',
	};
	self.save=function(){

	}

}

MoveScreen=function(right,down){
	let self={
		right:right,
		down:down,
	};

	return self;
}
