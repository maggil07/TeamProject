let defaultUp=87;
let defaultDown=83;
let defaultRight=68;
let defaultLeft=65;
let defaultPause=80;
let defaultGrapple=32;
let defaultweaponPowerUpsChange = 81;
let defaultpowerUpsChange = 69;
let defaultChange = 67;
let defaultApplyWeaponPUP = 88;
let defaultApplyPUP = 90;


let controls = {
	up : defaultUp,
	down: defaultDown,
	right: defaultRight,
	left: defaultLeft,
	pause: defaultPause,
	change: defaultChange,
	grapple: defaultGrapple,
	weaponPowerUpsChange: defaultweaponPowerUpsChange,
	powerUpsChange: defaultpowerUpsChange,
	applyWPUP: defaultApplyWeaponPUP,
	applyPUP: defaultApplyPUP
}

updateControls = function(control, input){
	
	let duplicateCheck = false;
	for(var value in controls){

		if(input == controls[value]){
			console.log(input);
			console.log(" value: " + controls[value]);
			duplicateCheck = true;
		}
	}

	if(!duplicateCheck){
		controls[control] = input;
	}
	
	//controls[control] = input;
}


outputControls = function(control){
	let data = String.fromCharCode(control);
	if (data == " "){
		data = "space";
	}
	else if (data == "%"){
		data = "Left Arrow";
	}
	else if (data == "("){
		data = "Down Arrow";
	}
	else if (data == "&"){
		data = "Up Arrow";
	}
	else if (data == "'"){
		data = "Right Arrow";
	}
	return data;
}


