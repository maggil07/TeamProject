Item=function(id,name,action){
	let self={
		id:id,
		name:name,
		action:action,
	}
	return self;
}

Inventory=function(items){
	let self={
		items:[],
	}
	
	self.addItem=function(id, amount){
		for(let i=0;i<self.items.length;i++){
			if(self.items[i].id==id){
				self.items[i].amount+=amount;
				return;
			}
		}
		self.items.push({id:id,amount:amount})
	}
	
	self.removeItem=function(id,amount){
		for(let i=0;i<self.items.length;i++){
			if(self.items[i].id==id){
				self.items[i].amount-=amount;
				if(self.items[i].amount<=0)
					self.items.splice(i,1);
				return;
			}
		}
	}
	
	self.hasItem=function(id){
		for(let i=0;i<self.items.length;i++){
			if(self.items[i].id==id){
				return true;
			}
		}
		return false;
	}
}