// Entity.js uses inheritance to provide the stats and qualities of each of
// the entities in the game which includes the Actor, Entity, Enemy, Midterm,
// Player, Assignment, Projectile, Upgrade and Final classes.

// Each class has its own unique behaviour for drawing and generating that can be
// conditionional on the screen state.

// Each of the main entity classes are also organized in upon creation and
// removed from the list upon destruction. The main classes also contain an
// Entitiy.clear function. This removes all elementes in the list.

let player;

// Entity class
Entity=function(type,id,x,y,w,h,img){
	let self={
		type:type,
		id:id,
		x:x,
		y:y,
		w:w,
		h:h,
		img:img,
	};
	self.update=function(){
		self.updatePosition();
		self.draw();
	}

	self.draw=function(){
		if(screen=='game'){
			ctx.save();
			let x = self.x - player.x;
			let y = self.y - player.y;
			x += W/2;
			y += H/2;
			x -= self.w/2;
			y -= self.h/2;
			ctx.drawImage(self.img,x,y,self.w,self.h);
			ctx.restore();
		}
		else if(screen=='le'){
			ctxLE.save();
			let x = self.x;
			let y = self.y;
			x+=mousePos.xoff*64;
			y+=mousePos.yoff*64;
			ctxLE.drawImage(self.img,x,y,self.w,self.h);
			ctxLE.restore();
		}
            else if (screen=='overworld'){
                  ctx.save();
                  let x = self.x;
                  let y = self.y;
                  ctx.drawImage(self.img, x, y, self.w, self.h);
                  ctx.restore();
            }
	}

	self.getDistance=function(entity2){
		let delx=self.x-entity2.x;
		let dely=self.y-entity2.y;
		return Math.sqrt(delx*delx+dely*dely);
	}

	self.testCollision=function(entity2){
		let rect1={
			x:self.x-self.w/2,
			y:self.y-self.h/2,
			width:self.w,
			height:self.h,
		}
		let rect2={
			x:entity2.x-entity2.w/2,
			y:entity2.y-entity2.h/2,
			width:entity2.w,
			height:entity2.h,
		}
		return testCollisionRects(rect1,rect2);
	}

	self.testCollisionBB=function(rect,entity){
		let rect2={
			x:entity.x-entity.w/2,
			y:entity.y-entity.h/2,
			width:entity.w,
			height:entity.h,
		}
		return testCollisionRects(rect,rect2);
	}

	self.updatePosition=function(){}

      // adds entity to list
	Entity.list[id]=self;

	return self;
}
// clears the list of entiies
Entity.clear=function(){
	for(let key96 in Entity.list){
		let e=Entity.list[key96];
		if(e.type!='Player'){
			e.remove=true;
		}
	}
      for (let key12 in Upgrade.list) {
            let e = Upgrade.list[key12];
            e.remove = true;
      }
}

Entity.list={};

Actor=function(type,id,x,y,w,h,img,hp,atkSpd,dmg,code){
	let self=Entity(type,id,x,y,w,h,img);
	self.hp=hp;
	self.hpTot=hp;
	self.atkSpd=atkSpd;
	self.aimAngle=0;
	self.spriteCnt=0;
	self.downPress=false;
	self.upPress=false;
	self.leftPress=false;
	self.rightPress=false;
	self.maxSpd=2;
	self.dmg=dmg;
	self.code=code;
	self.atkCnt=0;
	self.weap=1;
	self.xSpd=0;
	self.ySpd=0;
	self.KB=false;
	self.KBCnt=0;
	self.KBDir=0;
	self.invinc=false;
	self.jumped=false;

	self.updatePosition=function() {
		let move=true;
		let moveG=true;
		if(screen=='le' || screen == 'menu'){
			self.downPress=false;
			self.upPress=false;
			self.leftPress=false;
			self.rightPress=false;
			moveG=false;
		}
            if (screen == 'overworld'){
                  moveG = false;

            }
		if(self.KB){
			self.KBCnt++;
			if(self.KBCnt==20){
				self.KB=false;
				self.KBCnt=0;
				self.invinc=false;
			}
			self.y-=7;
			if(self.KBDir==0){
				self.x+=4;
			}
			else{
				self.x-=4;
			}
		}
            // collision handling
		let leftBump={x:self.x-32,y:self.y,width:10,height:10};
		let rightBump={x:self.x+32,y:self.y,width:10,height:10};
		let upBump={x:self.x,y:self.y-32,width:10,height:10};
		let downBump={x:self.x,y:self.y+32,width:10,height:10};
		for(let key11 in Platform.list){
			if(self.testCollisionBB(downBump,Platform.list[key11])){
				moveG=false;
				self.ySpd=0;
				self.jumped=false;
			}
		}
		if(moveG){
			self.ySpd-=0.75;
			self.y-=self.ySpd;
		}
		if(self.ySpd<-15){
			self.ySpd=-15;
		}
		if(self.rightPress){
			for(let key11 in Platform.list){
				if(self.testCollisionBB(rightBump,Platform.list[key11])){
					move=false;
				}
			}
			if(move){
				self.x+=self.maxSpd;
			}
			else{
				self.x-=self.maxSpd;
			}
		}
		if(self.leftPress){
			for(let key11 in Platform.list){
				if(self.testCollisionBB(leftBump,Platform.list[key11])){
					move=false;
				}
			}
			if(move){
				self.x-=self.maxSpd;
			}
			else{
				self.x+=self.maxSpd;
			}
		}
		if(screen=='game'){
			if(self.upPress&&self.jumped==false){
				for(let key11 in Platform.list){
					if(self.testCollisionBB(upBump,Platform.list[key11])){
						move=false;
					}
					if(self.ySpd!==0){
							move=false;
					}
					else{
						self.jumped=true;
					}
				}
				if(move){
					self.ySpd=3*self.maxSpd;
					self.y-=self.maxSpd;
					self.y-=self.ySpd;
				}
				else{

				}
			}
		}
		if(screen=='overworld'){
			if(self.upPress){
				for(let key11 in Platform.list){
					if(self.testCollisionBB(upBump,Platform.list[key11])){
						move=false;
					}
				}
				if(move){
					self.y-=self.maxSpd;
				}
				else{
					self.y+=self.maxSpd;
				}
			}
			if(self.downPress){
				for(let key11 in Platform.list){
					if(self.testCollisionBB(downBump,Platform.list[key11])){
						move=false;
					}
				}
				if(move){
					self.y+=self.maxSpd;
				}
				else{
					self.y-=self.maxSpd;
				}
			}
		}
	}


	let super_update=self.update;
	self.update=function(){
		super_update();
		self.atkCnt+=self.atkSpd;
		if(self.hp<=0){
			self.onDeath();
		}
	}

	self.onDeath=function(){}

	self.performAttack=function(){
		if(screen=='game'){
			if(self.atkCnt>25){
				self.atkCnt=0;
				Projectile.generate(self);
			}
		}
	}

	self.dmgKB=function(){


	}

	return self;

}

Enemy=function(id,x,y,w,h,img,hp,atkSpd,dmg,code){
	let self=Actor('Enemy',id,x,y,w,h,img,hp,atkSpd,dmg,code);
	Enemy.list[id]=self;
	self.remove=false;

	let super_update=self.update;
	self.update=function(){
		super_update();
		self.updateAim();
		self.updateKey();
		self.performAttack();
	}

	self.updateAim=function(){
		var diffX = player.x - self.x;
		var diffY = player.y - self.y;

		self.aimAngle = Math.atan2(diffY,diffX) / Math.PI * 180
	}

	self.updateKey=function(){
		var diffX = player.x - self.x;
		var diffY = player.y - self.y;

		self.rightPress = diffX > 3;
		self.leftPress = diffX < -3;
		if(self.code=='m'||self.code=='l'){
			self.downPress = diffY > 3;
			self.upPress = diffY < -3;
		}
	}
	self.onDeath=function(){
		self.remove=true;
	}

	return self;

}

Enemy.list={};

Enemy.update=function(){
	for(let key in Enemy.list){
		Enemy.list[key].update();
	}
	for(let key in Enemy.list){
		if(Enemy.list[key].remove){
			let rand=(Math.random())*10
			if(screen=='game'){
				if(rand>=5){
					Upgrade.generate(Enemy.list[key])
				}
			}
			delete Enemy.list[key];
		}
	}
}

Enemy.generate=function(x,y){
	let h=64;
	let w=64;
	let id=Math.random();
	let hp=5;
	let atkSpd=0;
	let dmg=1;
	if(FAC=="phil"){
		let img1=Img.philEnemy;
		Enemy(id,x,y,w,h,img1,hp,atkSpd,dmg,'e');
	}
	else if(FAC=="phys"){
		let img2=Img.phyEnemy;
		Enemy(id,x,y,w,h,img2,hp,atkSpd,dmg,'e');
	}
	else if(FAC=="math"){
		let img3=Img.mathEnemy;
		Enemy(id,x,y,w,h,img3,hp,atkSpd,dmg,'e');
	}
	else if(FAC=="comp"){
		let img4=Img.csEnemy;
		Enemy(id,x,y,w,h,img4,hp,atkSpd,dmg,'e');
	}
}

Enemy.facChange=function(){
	for(let key33 in Enemy.list){
		let e=Enemy.list[key33];
		let ex=e.x;
		let ey=e.y;
		e.remove=true;
		Enemy.generate(ex,ey);
	}
}

Assignment=function(id,x,y,w,h,img,hp,atkSpd,dmg){
	let self=Enemy(id,x,y,w,h,img,hp,atkSpd,dmg,'a');
	Assignment.list[id]=self;
	self.remove=false;
}

Assignment.update=function(){
	for(let key7 in Assignment.List){
		Assignment.list[key7].update();
	}
	for(let key7 in Assignment.list){
		if(Assignment.list[key7].remove){
			player.assScore++;
			delete Assignment.list[key7];
		}
	}
}

Assignment.list={};

Assignment.generate=function(x,y){
	let h=64;
	let w=64;
	let id=Math.random();
	let hp=9;
	let atkSpd=0.2;
	let dmg=3;
	let img=Img.ass;
	Assignment(id,x,y,w,h,img,hp,atkSpd,dmg);
}

async function deadMidterm(){
	if(fromLe==false){
		let courses = getCourses();
		for(let x=0; x<courses.length;x++){
			if(courses[x] != null){
				if(campaignLevelName == courses[x].Levelname){
					let levelCode = saveLevel(username, courses[x].Levelname, 0, courses[x].Width, courses[x].Height);
					courses[x].Level = levelCode.Level;
					courses[x].midterm = true;
					courses[x].midtermTime = cTime;
					courses[x].grade = 100;
					saveCurrentCampaignGame(courses, getInventory());
				}
			}
		}
	}




}


Midterm=function(id,x,y,w,h,img,hp,atkSpd,dmg){
	let self=Enemy(id,x,y,w,h,img,hp,atkSpd,dmg,'m');
	Midterm.list[id]=self;
      self.remove=false;
      self.onDeath=function(){
            self.remove=true;
			deadMidterm();
      }

}



Midterm.update=function(){
	for(let key8 in Midterm.List){
		Midterm.list[key8].update();
	}
	for(let key8 in Midterm.list){
		if(Midterm.list[key8].remove){
			player.mid=true;
			delete Midterm.list[key8];
		}
	}
}

Midterm.list={};

Midterm.generate=function(x,y){
	let h=64;
	let w=64;
	let id=Math.random();
	let hp=13;
	let atkSpd=0.5;
	let dmg=5;
	let img=Img.midterm;
	Midterm(id,x,y,w,h,img,hp,atkSpd,dmg);
}

Final=function(id,x,y,w,h,img,hp,atkSpd,dmg){
	let self=Enemy(id,x,y,w,h,img,hp,atkSpd,dmg,'l');
	Final.list[id]=self;

	self.onDeath=function(){
		self.remove=true;
		levelCompleted();
	}
}

Final.update=function(){
	for(let key9 in Final.List){
		Final.list[key9].update();
	}
	for(let key9 in Final.list){
		if(Final.list[key9].remove){
			delete Final.list[key9];
		}
	}
}
Final.list={};

Final.generate=function(x,y){
	let h=64;
	let w=64;
	let id=Math.random();
	let hp=20;
	let atkSpd=1;
	let dmg=7;
	let img=Img.final;
	Final(id,x,y,w,h,img,hp,atkSpd,dmg);
}

Player=function(x,y){
	let img=Img.playerLevel;
	let self=Actor('Player','myId',x,y,64,64,img,30,3,5,'p');
	self.maxSpd=5;
	self.lMouseClick=false;
	self.rMouseClick=false;
	self.assScore=0;
	self.mid=false;
	self.grapplePress=false;
	self.weap=1;
	self.meleeCnt=0;
	self.melee=false;
	self.usePU=false;
	self.useWPU=false;

	let super_update=self.update;
	self.update=function(){
		super_update();
		if(screen=='game'){
			if(self.rightPress||self.leftPress){
				self.spriteCnt+=0.2;
			}
			if(self.lMouseClick){
				self.performAttack();
			}
			if(self.y>(deathY+1)*64){
				if(deathScreenControl == 1){
					self.onDeath();
					deathScreenControl = 0;
				}

			}
			if(self.melee){
				self.performAttack();
			}
			if(self.KB){
				self.invinc=true;
			}
			else{
				self.invinc=false;
			}
			self.dmgCollision();
			if(self.usePU){

			}
			if(self.useWPU){

			}
		}
		if(screen=='overworld'){
			if(self.rightPress||self.leftPress||self.upPress||self.downPress){
				self.spriteCnt+=0.2;
			}
		}
	}

	self.draw=function(){
		if(screen=='game'||screen=='overworld'){
			ctx.save();
		}
		else if(screen=='le'){
			ctxLE.save();
		}
		let x=self.x;
		let y=self.y;
		if(screen=='game'){
			x=x-player.x;
			y=y-player.y;
			x+=W/2;
			y+=H/2;
			x-=self.w/2;
			y-=self.h/2;
		}
		else if(screen=='le'){
			x+=mousePos.xoff*64;
			y+=mousePos.yoff*64;
		}
		let framew=self.img.width/4;
		let frameh=self.img.height/28;
		let aim=self.aimAngle;
		if(aim<0){
			aim=aim+360;;
		}
		let dir=0;
		if(aim>=90&&aim<270){
			dir=1;
		}
		let cnt=Math.floor(self.spriteCnt)%4;
		if(self.weap==0){
			if(dir==0){
				dir=6;
			}
			else{
				dir=13;
			}
		}
		else{
			if(dir==0){
				dir=20;
			}
			else{
				dir=27;
			}
		}
		if(screen=='game' || screen == 'overworld'){
			if(self.melee){
				let mlCnt=Math.floor(self.meleeCnt)%4;
				if (dir==6){
					dir=0;
				}
				else{
					dir=7;
				}
				ctx.drawImage(self.img,mlCnt*framew,dir*frameh,framew,frameh,x,y,self.w,self.h);
				ctx.restore();
			}
			else{
				ctx.drawImage(self.img,cnt*framew,dir*frameh,framew,frameh,x,y,self.w,self.h);
				ctx.restore();
			}
		}
		else if(screen=='le'){
			ctxLE.drawImage(self.img,cnt*framew,dir*frameh,framew,frameh,x,y,self.w,self.h);
			ctxLE.restore();
		}
	}

	let super_performAttack=self.performAttack;
	self.performAttack=function(){
				if(self.weap==1){
					super_performAttack();
				}
				else{
					self.melee=true;
					self.meleeCnt+=0.2;
					console.log(self.meleeCnt);
					if(self.meleeCnt>=4.0){
						self.melee=false;
						self.meleeCnt=0;
					}

				}


	}
	self.dmgCollision=function(){
		for(let key4770 in Enemy.list){
			let e=Enemy.list[key4770];

			if(self.testCollision(e)){
				if(self.melee){
					if(e.invinc==false){
						if(self.x-e.x<0){
							e.KBDir=0;
						}
						else{
							e.KBDir=1;
						}
						e.hp-=self.dmg;
						e.KB=true;
					}
				}
				else{
					if(self.invinc==false){
						if(self.x-e.x<0){
							self.KBDir=1;
						}
						else{
							self.KBDir=0;
						}
						self.hp-=e.dmg;
						self.KB=true;
					}
				}
			}
		}
	}
	self.onDeath=function(){
		if(screen=='game'){
			levelFailed();
			self.hp=30;
		}
	}

	return self;
}

Player.generate=function(x,y){
	Player(x,y);
}

Projectile=function(id,x,y,spdX,spdY,w,h,img,hostile,dmg){
	let self=Entity('projectile',id,x,y,w,h,img);
	self.timer=0;
	self.hostile=hostile;
	self.spdX=spdX;
	self.spdY=spdY;
	self.remove=false;
	self.dmg=dmg;

	let super_update=self.update;
	self.update=function(){
		super_update();
		self.timer++;
		self.remove=false;
		if(self.timer>80)
			self.remove=true;
		if(self.hostile==false){
			for(let key2 in Enemy.list){
				if(self.testCollision(Enemy.list[key2])){
					self.remove=true;
					Enemy.list[key2].hp-=self.dmg;
				}
			}
		}
		else if(self.hostile==true){
			if(self.testCollision(player)){
				self.remove=true;
				player.hp-=self.dmg;
			}
		}
		for(let key3 in Platform.list){
			if(self.testCollision(Platform.list[key3])){
				if(Platform.list[key3].imp==false){
					self.remove=true
					if(Platform.list[key3].smash){
						Platform.list[key3].hp--;
					}
				}
			}
		}
	}

	self.updatePosition=function(){
		self.x+=self.spdX;
		self.y+=self.spdY;
	}

	Projectile.list[id]=self;
}

Projectile.list={};

Projectile.update=function(){
	for(let key4 in Projectile.list){
		let p = Projectile.list[key4];
		p.update();
		if(p.remove || screen != "game"){
			delete Projectile.list[key4];
		}
	}
}

Projectile.generate = function(actor){
	let x=actor.x;
	let y=actor.y;
	let h=5;
	let w=32;
	let id=Math.random();
	let hostile=true;
	let aim=actor.aimAngle;
	let dmg=actor.dmg;
	if(aim<0){
		aim=aim+360;;
	}
	let dir=0;
	if(aim>=90&&aim<270){
		dir=1;
	}
	let img1=Img.penLeft;
	let img2=Img.penRight;
	if(dir==1){
		img=Img.penLeft;
	}
	if(actor.type=='Player'){
		hostile=false;
	}
	//console.log("Angle: "+angle);
	let spdX=Math.cos(aim/180*Math.PI)*7;
	let spdY=Math.sin(aim/180*Math.PI)*7;
	if(dir==1){
		Projectile(id,x,y,spdX,spdY,w,h,img1,hostile,dmg);
	}
	else{
		Projectile(id,x,y,spdX,spdY,w,h,img2,hostile,dmg);
	}
}

Upgrade=function(id,x,y,w,h,cat,img){
		let self=Entity('upgrade',id,x,y,w,h,img);
            self.remove = false;
		self.cat=cat;
		Upgrade.list[id]=self;
}

Upgrade.list={}

Upgrade.update=function(){
	for(let key5 in Upgrade.list){
		let u=Upgrade.list[key5];
		u.update();
		let collision=player.testCollision(u);
		if(collision){

			u.remove = true;
		}
            if (u.remove) {
                  delete Upgrade.list[key5];
            }
	}
}

Upgrade.generate=function(enemy){
    //console.log("Upgrade.generate");
	let x=enemy.x;
	let y=enemy.y;
	let h=32;
	let w=32;
	let id=Math.random();
	let randy=Math.random();
	let cat;
	let img=Img.upgrade;
	let img1=Img.gUpgrade;
	let img2=Img.bUpgrade;
	if (randy<0.3){
		cat='gun';
		Upgrade(id,x,y,w,h,cat,img1);
	}
	else if(randy>0.7){
		cat='book';
		Upgrade(id,x,y,w,h,cat,img2);
	}
	else{
		cat='gen';
		Upgrade(id,x,y,w,h,cat,img);
	}
	//console.log(cat);


}

Platform=function(type,id,x,y,img,code,smash,imp, hp){
	let self=Entity(type,id,x,y,64,64,img);
	self.code=code;
	self.smash=smash;
	self.imp=imp;
	self.remove=false;
	self.hp=hp;
	Platform.list[id]=self;

}

Platform.list={};

Platform.update=function(){
	for(let key4 in Platform.list){
		let p = Platform.list[key4];
		p.update();
		if(p.smash){
			//console.log(p.hp);
			for(let key69 in Projectile.list){
				if(p.testCollision(Projectile.list[key69])){
					p.hp--;
				}
			}
			if(p.hp<=0){
				p.remove=true;
			}
		}
		if(p.remove){
			//console.log('should remove platform');
			delete Platform.list[key4];
		}
	}
}

Platform.generate=function(x,y,code){
	imp=false;
	smash=false;
	id=Math.random();
	type='plat';
	//player img as placeholder
	img1=Img.platform;
	img2=Img.breakable;
	if(code=='b'){
		smash=true;
		Platform(type,id,x,y,img2,code,smash,imp,3);
	}
	else{
		Platform(type,id,x,y,img1,code,smash,imp,-1);
	}
}
