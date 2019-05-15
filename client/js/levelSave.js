// saveLevel.js contains two functions, saveLevel and saveLevelLE. saveLevel
//  is used during the main campaign while saveLevelLE is used within the level
// editor. while each take different paramaters, the main functionality is the
// same for each. They both take a level block by block and assign a code to each.

saveLevel=function(username,levelname,difficulty,w,h){
	level="";
	let x=0;
	let y=0;
	let fac=FAC;
	for(let i=0;i<(w+1)*(h+1);i++){
		let code="0";
		for(let key in Entity.list){
			if(Entity.list[key].x==x&&Entity.list[key].y==y){
				code=Entity.list[key].code;
			}
		}
		level+=code;
		if(x<w*64){
			x+=64;
		}
		else{
			x=0;
			y+=64;
		}
	}

	if(fac == 'math'){
		level += 'w';
	}
	else if(fac == 'phil'){
		level += 'x';
	}
	else if(fac == 'phys'){
		level += 'y';
	}
	else if(fac == 'comp'){
		level += 'z';
	}

	let levelData={Username: username , Levelname : levelname , Difficulty : difficulty, W:w,H:h, Level : level

		      };

	return levelData;
}

saveLevelLE=function(w,h){
	level="";
	let x=0;
	let y=0;
	let fac=FAC;
	for(let i=0;i<(w+1)*(h+1);i++){
		let code="0";
		for(let key in Entity.list){
			if(Entity.list[key].x==x&&Entity.list[key].y==y){
				code=Entity.list[key].code;
			}
		}
		level+=code;
		if(x<w*64){
			x+=64;
		}
		else{
			x=0;
			y+=64;
		}
	}

	if(fac == 'math'){
		level += 'w';
	}
	else if(fac == 'phil'){
		level += 'x';
	}
	else if(fac == 'phys'){
		level += 'y';
	}
	else if(fac == 'comp'){
		level += 'z';
	}

	levelSTR=level;
	levelW=w;
}
