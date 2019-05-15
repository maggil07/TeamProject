'use strict';

var courses = 
	[
		{
			courseName : "COMP1000",
			prerequisite : "none"
		},
		{
			courseName : "COMP2000",
			prerequisite : "COMP1000"
		},
		{
			courseName : "COMP3000",
			prerequisite : "COMP2000"
		},
		{
			courseName : "COMP4000",
			prerequisite : "COMP3000"
		},
		{
			courseName : "PHYS1000",
			prerequisite : "none"
		},
		{
			courseName : "PHYS2000",
			prerequisite : "PHYS1000"
		},
		{
			courseName : "PHYS3000",
			prerequisite : "PHYS2000"
		},
		{
			courseName : "PHYS4000",
			prerequisite : "PHYS3000"
		},
		{
			courseName : "PHIL1000",
			prerequisite : "none"
		},
		{
			courseName : "PHIL2000",
			prerequisite : "PHIL1000"
		},
		{
			courseName : "PHIL3000",
			prerequisite : "PHIL2000"
		},
		{
			courseName : "PHIL4000",
			prerequisite : "PHIL3000"
		},
		{
			courseName : "MATH1000",
			prerequisite : "none"
		},
		{
			courseName : "MATH2000",
			prerequisite : "MATH1000"
		},
		{
			courseName : "MATH3000",
			prerequisite : "MATH2000"
		},
		{
			courseName : "MATH4000",
			prerequisite : "MATH3000"
		}
		
		
	];


module.exports.hasPrerequisite = function(courseName, callback){
	var courseStatus = {
		hasPrerequisite : false,
		prerequisite : ""
	};
	for (var counter = 0; counter < courses.length; counter++){
		if(courses[counter]["courseName"] == courseName){
			if(courses[counter]["prerequisite"] != "none"){
				courseStatus.hasPrerequisite = true;
			}
			courseStatus.prerequisite = courses[counter]["prerequisite"];
			return callback(courseStatus);
		}
		
	}
};

