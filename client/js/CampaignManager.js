var campaignCourseLevels = 
	[
		{
			courseName : "COMP1000",
			prerequisite : "none",
			unlocks : "COMP2000"
		},
		{
			courseName : "COMP2000",
			prerequisite : "COMP1000",
			unlocks : "COMP3000"
		},
		{
			courseName : "COMP3000",
			prerequisite : "COMP2000",
			unlocks : "COMP4000"
		},
		{
			courseName : "COMP4000",
			prerequisite : "COMP3000",
			unlocks : "none"
		},
		{
			courseName : "PHYS1000",
			prerequisite : "none",
			unlocks : "PHYS2000"
		},
		{
			courseName : "PHYS2000",
			prerequisite : "PHYS1000",
			unlocks : "PHYS3000"
		},
		{
			courseName : "PHYS3000",
			prerequisite : "PHYS2000",
			unlocks : "PHYS4000"
		},
		{
			courseName : "PHYS4000",
			prerequisite : "PHYS3000",
			unlocks : "none"
		},
		{
			courseName : "PHIL1000",
			prerequisite : "none",
			unlocks : "PHIL2000"
		},
		{
			courseName : "PHIL2000",
			prerequisite : "PHIL1000",
			unlocks : "PHIL3000"
		},
		{
			courseName : "PHIL3000",
			prerequisite : "PHIL2000",
			unlocks : "PHIL4000"
		},
		{
			courseName : "PHIL4000",
			prerequisite : "PHIL3000",
			unlocks : "none"
		},
		{
			courseName : "MATH1000",
			prerequisite : "none",
			unlocks : "MATH2000"
		},
		{
			courseName : "MATH2000",
			prerequisite : "MATH1000",
			unlocks : "MATH3000"
		},
		{
			courseName : "MATH3000",
			prerequisite : "MATH2000",
			unlocks : "MATH4000"
		},
		{
			courseName : "MATH4000",
			prerequisite : "MATH3000",
			unlocks : "none"
		}
		
		
	];
function checkCampaignPlayerNameCheat(playerName){
	cheatPlayerNames = ["Bill Gates", "Mark Zuckerberg"];
	cheat = false;
	
	for(var x = 0; x< cheatPlayerNames.length; x++){
		if(cheatPlayerNames[x] == playerName){
			cheat = true;
			return true;
		}
	}
	return cheat;
}

function getUnlockedCourseName(courseCompleted){
	
	for(var x = 0; x<campaignCourseLevels.length; x++){
		if (campaignCourseLevels[x].courseName == courseCompleted){
			return campaignCourseLevels[x].unlocks;
		}
	}
	
}