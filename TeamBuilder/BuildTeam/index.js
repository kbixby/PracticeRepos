var app = angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http,$document){
	$http.get('pokemonlist.json').success(function(data){
		$scope.imageOne = "images/whosthat.png";
		$scope.imageTwo = "images/whosthat.png";
		$scope.imageThree = "images/whosthat.png";
		$scope.imageFour = "images/whosthat.png";
		$scope.imageFive = "images/whosthat.png";
		$scope.imageSix = "images/whosthat.png";
		$scope.imageZoomed = "images/whosthat.png";
		
		var activeOne = false;
		var activeTwo = false;
		var activeThree = false;
		var activeFour = false;
		var activeFive = false;
		var activeSix = false;
		
		
		var typeMatrix = [18][18];
		typeMatrix[0] = [0,1,2,3,4,5,6,7,8,9,"0.5",1,2,3,"0",5,6,7];
		typeMatrix[1] = [0,"0.5",2,"0.5",4,"2",6,7,8,9,"0.5","2","2","0.5",4,5,"2",7];
		typeMatrix[2] = ["2",1,2,3,"0.5",5,"0.5",7,8,"0.5","2","2","0.5",3,"0","2","2","0.5"];
		typeMatrix[3] = [0,"2",2,"0.5",4,"0.5",6,7,"2",9,"2",1,2,"0.5",4,5,6,7];
		typeMatrix[4] = [0,1,"2",3,4,"2",6,"0.5",8,9,"0.5",1,"2",3,4,5,"0.5",7];
		typeMatrix[5] = [0,"0.5",2,"2","0.5",5,"0.5",7,"2",9,"2",1,"0.5","0.5",4,5,"0.5",7];
		typeMatrix[6] = [0,1,2,3,4,"2","0.5",7,"0.5",9,"0.5",1,2,3,"0.5",5,"0","2"];
		typeMatrix[7] = [0,1,2,"2","2","0.5",6,"0.5","0",9,0,1,2,"0.5",4,5,6,7];
		typeMatrix[8] = [0,"2",2,3,"0","0.5","2","2",8,9,"2",1,"0.5",3,4,5,"2",7];
		typeMatrix[9] = [0,1,"2",3,4,5,"2",7,8,"0.5",0,1,2,3,4,"0","0.5",7];
		typeMatrix[10] = [0,"2","0.5",3,"2",5,6,7,"0.5",9,0,"2","2",3,4,5,"0.5",7];
		typeMatrix[11] = [0,"0.5",2,"0.5","2","2",6,7,"2",9,0,"0.5",2,"2",4,5,"0.5",7];
		typeMatrix[12] = [0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7];
		typeMatrix[13] = [0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7];
		typeMatrix[14] = [0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7];
		typeMatrix[15] = [0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7];
		typeMatrix[16] = [0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7];
		typeMatrix[17] = [0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7];
		
		
		
		
		
		
		
		$scope.allPokemon = data;
		$scope.colorPick = function(type){
			return (getColor(type));
		}	// end of function for color picking
		
		
		$scope.colorGradient = function(types){
			if(types.length==1){
				return (getColor(types[0]));
			}
			else{
				var colorOne = getColor(types[0]);
				var colorTwo = getColor(types[1]);
				return ([colorOne,colorTwo]);
			}
			
		}
		
		$scope.gradientFill = function(types){
			var colorOne = getColor(types[0]);
			var colorTwo = getColor(types[0]);
			if(types.length==2){
				colorTwo = getColor(types[1]);
			}
			var theGradient = "<defs><linearGradient x1='0%' y1='0%' x2='100%' y2='0%'>" +
					"<stop offset='0%' style='stop-color:"+getColor(colorOne)+";stop-opacity:1'/>" +
					"<stop offset='100%' style='stop-color:"+getColor(colorTwo)+";stop-opacity:1'/>" +
					"</linearGradient></defs>";
			return theGradient;
		}
		
		
		$scope.colorTwo = function(types){
			if(types.length==1){
				var color = getColor(types[0]);
				var darker = ColorLuminance(color,-.05);
				return darker;
			}
			else{
				return getColor(types[1]);
			}
		}
		
		
		$scope.pokeData = function(pok){
			$scope.imageZoomed = pok.img;
			$scope.t1ZoomStyle = 
					{"border":"2px solid "+ColorLuminance(getColor(pok.types[0]),-.2),
					"float":"left",
					"margin-left":"10px",
					"background": getColor(pok.types[0]),
					"height":"20px",
					"border-radius":"10px",
					"text-align":"center",
					"font-size":"10px",
					"width":"100px",
					"margin-bottom":"5px",
					"padding-top":"10px"};	
			$scope.t1Zoom = pok.types[0];
			if(pok.types.length==2){
				$scope.t2ZoomStyle=
				{"border":"2px solid "+ColorLuminance(getColor(pok.types[1]),-.2),
				"float":"right",
				"margin-right":"10px",
				"background": getColor(pok.types[1]),
				"height":"20px",
				"border-radius":"10px",
				"text-align":"center",
				"font-size":"10px",
				"width":"100px",
				"margin-bottom":"5px",
				"padding-top":"10px"};
				$scope.t2Zoom = pok.types[1];
			}
			else{
				$scope.t2ZoomStyle = {"border":"transparent","background":"transparent"};
				$scope.t2Zoom = "";
			}
			$scope.zoomName = pok.name;
		}
		
		
		$scope.changeOne = function(){
			var theSelected = JSON.parse($scope.selectedOne);
			$scope.imageOne=theSelected.img;
			$scope.t1OneStyle = {"border":"1px solid "+ColorLuminance(getColor(theSelected.types[0]),-.2),
					"float":"left",
					"margin-left":"10px",
					"background": getColor(theSelected.types[0]),
					"height":"10px",
					"border-radius":"5px",
					"text-align":"center",
					"font-family":"arial",
					"font-size":"10px",
					"width":"50px",
					"margin-bottom":"5px"};	
			$scope.t1One = theSelected.types[0];
			if(theSelected.types.length==2){
				$scope.t2OneStyle=
				{"border":"1px solid "+ColorLuminance(getColor(theSelected.types[1]),-.2),
				"float":"right",
				"margin-right":"10px",
				"background": getColor(theSelected.types[1]),
				"height":"10px",
				"border-radius":"5px",
				"text-align":"center",
				"font-family":"arial",
				"font-size":"10px",
				"width":"50px",
				"margin-bottom":"5px"};
				$scope.t2One = theSelected.types[1];
			}
			else{
				$scope.t2OneStyle = {"border":"transparent","background":"transparent"};
				$scope.t2One = "";
			}
			var per = Math.round(theSelected.stats.hp/255*100);
			$scope.oneHPInStyle = {"width":per+"%",
					"height":"10px","background-color":statColor(theSelected.stats.hp),
					"border-radius":"5px","border":"1px solid black","font-size":"7px"};
			$scope.oneHPIn = theSelected.stats.hp;
			var perAtt = Math.round(theSelected.stats.attack/255*100);
			$scope.oneAttackInStyle = {"width":perAtt+"%",
					"height":"10px","background-color":statColor(theSelected.stats.attack),
					"border-radius":"5px","border":"1px solid black","font-size":"7px"};
			$scope.oneAttackIn = theSelected.stats.attack;
			var perDef = Math.round(theSelected.stats.defense/255*100);
			$scope.oneDefenseInStyle = {"width":perDef+"%",
					"height":"10px","background-color":statColor(theSelected.stats.defense),
					"border-radius":"5px","border":"1px solid black","font-size":"7px"};
			$scope.oneDefenseIn = theSelected.stats.defense;
			var perSAtt = Math.round(theSelected.stats.spAttack/255*100);
			$scope.oneSpAttackInStyle = {"width":perSAtt+"%",
					"height":"10px","background-color":statColor(theSelected.stats.spAttack),
					"border-radius":"5px","border":"1px solid black","font-size":"7px"};
			$scope.oneSpAttackIn = theSelected.stats.spAttack;
			var perSDef = Math.round(theSelected.stats.spDefense/255*100);
			$scope.oneSpDefenseInStyle = {"width":perSDef+"%",
					"height":"10px","background-color":statColor(theSelected.stats.spDefense),
					"border-radius":"5px","border":"1px solid black","font-size":"7px"};
			$scope.oneSpDefenseIn = theSelected.stats.spDefense;
			var perSpeed = Math.round(theSelected.stats.speed/255*100);
			$scope.oneSpeedInStyle = {"width":perSpeed+"%",
					"height":"10px","background-color":statColor(theSelected.stats.speed),
					"border-radius":"5px","border":"1px solid black","font-size":"7px"};
			$scope.oneSpeedIn = theSelected.stats.speed;
			activeOne = true;
			changeAverage();
		}
		
		$scope.changeTwo = function(){
			var theSelected = JSON.parse($scope.selectedTwo);
			$scope.imageTwo=theSelected.img;
			$scope.t1TwoStyle = {"border":"1px solid "+ColorLuminance(getColor(theSelected.types[0]),-.2),
					"float":"left",
					"margin-left":"10px",
					"background": getColor(theSelected.types[0]),
					"height":"10px",
					"border-radius":"5px",
					"text-align":"center",
					"font-family":"arial",
					"font-size":"10px",
					"width":"50px",
					"margin-bottom":"5px"};	
			$scope.t1Two = theSelected.types[0];
			if(theSelected.types.length==2){
				$scope.t2TwoStyle=
				{"border":"1px solid "+ColorLuminance(getColor(theSelected.types[1]),-.2),
				"float":"right",
				"margin-right":"10px",
				"background": getColor(theSelected.types[1]),
				"height":"10px",
				"border-radius":"5px",
				"text-align":"center",
				"font-family":"arial",
				"font-size":"10px",
				"width":"50px",
				"margin-bottom":"5px"};
				$scope.t2Two = theSelected.types[1];
			}
			else{
				$scope.t2TwoStyle = {"border":"transparent","background":"transparent"};
				$scope.t2Two = "";
			}
			var per = Math.round(theSelected.stats.hp/255*100);
			$scope.twoHPInStyle = {"width":per+"%",
					"height":"10px","background-color":statColor(theSelected.stats.hp),
					"border-radius":"5px","border":"1px solid black","font-size":"7px"};
			$scope.twoHPIn = theSelected.stats.hp;
			var perAtt = Math.round(theSelected.stats.attack/255*100);
			$scope.twoAttackInStyle = {"width":perAtt+"%",
					"height":"10px","background-color":statColor(theSelected.stats.attack),
					"border-radius":"5px","border":"1px solid black","font-size":"7px"};
			$scope.twoAttackIn = theSelected.stats.attack;
			var perDef = Math.round(theSelected.stats.defense/255*100);
			$scope.twoDefenseInStyle = {"width":perDef+"%",
					"height":"10px","background-color":statColor(theSelected.stats.defense),
					"border-radius":"5px","border":"1px solid black","font-size":"7px"};
			$scope.twoDefenseIn = theSelected.stats.defense;
			var perSAtt = Math.round(theSelected.stats.spAttack/255*100);
			$scope.twoSpAttackInStyle = {"width":perSAtt+"%",
					"height":"10px","background-color":statColor(theSelected.stats.spAttack),
					"border-radius":"5px","border":"1px solid black","font-size":"7px"};
			$scope.twoSpAttackIn = theSelected.stats.spAttack;
			var perSDef = Math.round(theSelected.stats.spDefense/255*100);
			$scope.twoSpDefenseInStyle = {"width":perSDef+"%",
					"height":"10px","background-color":statColor(theSelected.stats.spDefense),
					"border-radius":"5px","border":"1px solid black","font-size":"7px"};
			$scope.twoSpDefenseIn = theSelected.stats.spDefense;
			var perSpeed = Math.round(theSelected.stats.speed/255*100);
			$scope.twoSpeedInStyle = {"width":perSpeed+"%",
					"height":"10px","background-color":statColor(theSelected.stats.speed),
					"border-radius":"5px","border":"1px solid black","font-size":"7px"};
			$scope.twoSpeedIn = theSelected.stats.speed;
			activeTwo = true;
			changeAverage();
		}
		
		$scope.changeThree = function(){
			var theSelected = JSON.parse($scope.selectedThree);
			$scope.imageThree=theSelected.img;
			$scope.t1ThreeStyle = {"border":"1px solid "+ColorLuminance(getColor(theSelected.types[0]),-.2),
					"float":"left",
					"margin-left":"10px",
					"background": getColor(theSelected.types[0]),
					"height":"10px",
					"border-radius":"5px",
					"text-align":"center",
					"font-family":"arial",
					"font-size":"10px",
					"width":"50px",
					"margin-bottom":"5px"};	
			$scope.t1Three = theSelected.types[0];
			if(theSelected.types.length==2){
				$scope.t2ThreeStyle=
				{"border":"1px solid "+ColorLuminance(getColor(theSelected.types[1]),-.2),
				"float":"right",
				"margin-right":"10px",
				"background": getColor(theSelected.types[1]),
				"height":"10px",
				"border-radius":"5px",
				"text-align":"center",
				"font-family":"arial",
				"font-size":"10px",
				"width":"50px",
				"margin-bottom":"5px"};
				$scope.t2Three = theSelected.types[1];
			}
			else{
				$scope.t2ThreeStyle = {"border":"transparent","background":"transparent"};
				$scope.t2Three = "";
			}
			var per = Math.round(theSelected.stats.hp/255*100);
			$scope.threeHPInStyle = {"width":per+"%",
					"height":"10px","background-color":statColor(theSelected.stats.hp),
					"border-radius":"5px","border":"1px solid black","font-size":"7px"};
			$scope.threeHPIn = theSelected.stats.hp;
			var perAtt = Math.round(theSelected.stats.attack/255*100);
			$scope.threeAttackInStyle = {"width":perAtt+"%",
					"height":"10px","background-color":statColor(theSelected.stats.attack),
					"border-radius":"5px","border":"1px solid black","font-size":"7px"};
			$scope.threeAttackIn = theSelected.stats.attack;
			var perDef = Math.round(theSelected.stats.defense/255*100);
			$scope.threeDefenseInStyle = {"width":perDef+"%",
					"height":"10px","background-color":statColor(theSelected.stats.defense),
					"border-radius":"5px","border":"1px solid black","font-size":"7px"};
			$scope.threeDefenseIn = theSelected.stats.defense;
			var perSAtt = Math.round(theSelected.stats.spAttack/255*100);
			$scope.threeSpAttackInStyle = {"width":perSAtt+"%",
					"height":"10px","background-color":statColor(theSelected.stats.spAttack),
					"border-radius":"5px","border":"1px solid black","font-size":"7px"};
			$scope.threeSpAttackIn = theSelected.stats.spAttack;
			var perSDef = Math.round(theSelected.stats.spDefense/255*100);
			$scope.threeSpDefenseInStyle = {"width":perSDef+"%",
					"height":"10px","background-color":statColor(theSelected.stats.spDefense),
					"border-radius":"5px","border":"1px solid black","font-size":"7px"};
			$scope.threeSpDefenseIn = theSelected.stats.spDefense;
			var perSpeed = Math.round(theSelected.stats.speed/255*100);
			$scope.threeSpeedInStyle = {"width":perSpeed+"%",
					"height":"10px","background-color":statColor(theSelected.stats.speed),
					"border-radius":"5px","border":"1px solid black","font-size":"7px"};
			$scope.threeSpeedIn = theSelected.stats.speed;
			activeThree = true;
			changeAverage();
		}
		
		
		$scope.changeFour = function(){
			var theSelected = JSON.parse($scope.selectedFour);
			$scope.imageFour=theSelected.img;
			$scope.t1FourStyle = {"border":"1px solid "+ColorLuminance(getColor(theSelected.types[0]),-.2),
					"float":"left",
					"margin-left":"10px",
					"background": getColor(theSelected.types[0]),
					"height":"10px",
					"border-radius":"5px",
					"text-align":"center",
					"font-family":"arial",
					"font-size":"10px",
					"width":"50px",
					"margin-bottom":"5px"};	
			$scope.t1Four = theSelected.types[0];
			if(theSelected.types.length==2){
				$scope.t2FourStyle=
				{"border":"1px solid "+ColorLuminance(getColor(theSelected.types[1]),-.2),
				"float":"right",
				"margin-right":"10px",
				"background": getColor(theSelected.types[1]),
				"height":"10px",
				"border-radius":"5px",
				"text-align":"center",
				"font-family":"arial",
				"font-size":"10px",
				"width":"50px",
				"margin-bottom":"5px"};
				$scope.t2Four = theSelected.types[1];
			}
			else{
				$scope.t2FourStyle = {"border":"transparent","background":"transparent"};
				$scope.t2Four = "";
			}
			var per = Math.round(theSelected.stats.hp/255*100);
			$scope.fourHPInStyle = {"width":per+"%",
					"height":"10px","background-color":statColor(theSelected.stats.hp),
					"border-radius":"5px","border":"1px solid black","font-size":"7px"};
			$scope.fourHPIn = theSelected.stats.hp;
			var perAtt = Math.round(theSelected.stats.attack/255*100);
			$scope.fourAttackInStyle = {"width":perAtt+"%",
					"height":"10px","background-color":statColor(theSelected.stats.attack),
					"border-radius":"5px","border":"1px solid black","font-size":"7px"};
			$scope.fourAttackIn = theSelected.stats.attack;
			var perDef = Math.round(theSelected.stats.defense/255*100);
			$scope.fourDefenseInStyle = {"width":perDef+"%",
					"height":"10px","background-color":statColor(theSelected.stats.defense),
					"border-radius":"5px","border":"1px solid black","font-size":"7px"};
			$scope.fourDefenseIn = theSelected.stats.defense;
			var perSAtt = Math.round(theSelected.stats.spAttack/255*100);
			$scope.fourSpAttackInStyle = {"width":perSAtt+"%",
					"height":"10px","background-color":statColor(theSelected.stats.spAttack),
					"border-radius":"5px","border":"1px solid black","font-size":"7px"};
			$scope.fourSpAttackIn = theSelected.stats.spAttack;
			var perSDef = Math.round(theSelected.stats.spDefense/255*100);
			$scope.fourSpDefenseInStyle = {"width":perSDef+"%",
					"height":"10px","background-color":statColor(theSelected.stats.spDefense),
					"border-radius":"5px","border":"1px solid black","font-size":"7px"};
			$scope.fourSpDefenseIn = theSelected.stats.spDefense;
			var perSpeed = Math.round(theSelected.stats.speed/255*100);
			$scope.fourSpeedInStyle = {"width":perSpeed+"%",
					"height":"10px","background-color":statColor(theSelected.stats.speed),
					"border-radius":"5px","border":"1px solid black","font-size":"7px"};
			$scope.fourSpeedIn = theSelected.stats.speed;
			activeFour = true;
			changeAverage();
		}
		
		
		
		
		$scope.changeFive = function(){
			var theSelected = JSON.parse($scope.selectedFive);
			$scope.imageFive=theSelected.img;
			$scope.t1FiveStyle = {"border":"1px solid "+ColorLuminance(getColor(theSelected.types[0]),-.2),
					"float":"left",
					"margin-left":"10px",
					"background": getColor(theSelected.types[0]),
					"height":"10px",
					"border-radius":"5px",
					"text-align":"center",
					"font-family":"arial",
					"font-size":"10px",
					"width":"50px",
					"margin-bottom":"5px"};	
			$scope.t1Five = theSelected.types[0];
			if(theSelected.types.length==2){
				$scope.t2FiveStyle=
				{"border":"1px solid "+ColorLuminance(getColor(theSelected.types[1]),-.2),
				"float":"right",
				"margin-right":"10px",
				"background": getColor(theSelected.types[1]),
				"height":"10px",
				"border-radius":"5px",
				"text-align":"center",
				"font-family":"arial",
				"font-size":"10px",
				"width":"50px",
				"margin-bottom":"5px"};
				$scope.t2Five = theSelected.types[1];
			}
			else{
				$scope.t2FiveStyle = {"border":"transparent","background":"transparent"};
				$scope.t2Five = "";
			}
			var per = Math.round(theSelected.stats.hp/255*100);
			$scope.fiveHPInStyle = {"width":per+"%",
					"height":"10px","background-color":statColor(theSelected.stats.hp),
					"border-radius":"5px","border":"1px solid black","font-size":"7px"};
			$scope.fiveHPIn = theSelected.stats.hp;
			var perAtt = Math.round(theSelected.stats.attack/255*100);
			$scope.fiveAttackInStyle = {"width":perAtt+"%",
					"height":"10px","background-color":statColor(theSelected.stats.attack),
					"border-radius":"5px","border":"1px solid black","font-size":"7px"};
			$scope.fiveAttackIn = theSelected.stats.attack;
			var perDef = Math.round(theSelected.stats.defense/255*100);
			$scope.fiveDefenseInStyle = {"width":perDef+"%",
					"height":"10px","background-color":statColor(theSelected.stats.defense),
					"border-radius":"5px","border":"1px solid black","font-size":"7px"};
			$scope.fiveDefenseIn = theSelected.stats.defense;
			var perSAtt = Math.round(theSelected.stats.spAttack/255*100);
			$scope.fiveSpAttackInStyle = {"width":perSAtt+"%",
					"height":"10px","background-color":statColor(theSelected.stats.spAttack),
					"border-radius":"5px","border":"1px solid black","font-size":"7px"};
			$scope.fiveSpAttackIn = theSelected.stats.spAttack;
			var perSDef = Math.round(theSelected.stats.spDefense/255*100);
			$scope.fiveSpDefenseInStyle = {"width":perSDef+"%",
					"height":"10px","background-color":statColor(theSelected.stats.spDefense),
					"border-radius":"5px","border":"1px solid black","font-size":"7px"};
			$scope.fiveSpDefenseIn = theSelected.stats.spDefense;
			var perSpeed = Math.round(theSelected.stats.speed/255*100);
			$scope.fiveSpeedInStyle = {"width":perSpeed+"%",
					"height":"10px","background-color":statColor(theSelected.stats.speed),
					"border-radius":"5px","border":"1px solid black","font-size":"7px"};
			$scope.fiveSpeedIn = theSelected.stats.speed;
			activeFive = true;
			changeAverage();
			
		}
		
		
		
		$scope.changeSix = function(){
			var theSelected = JSON.parse($scope.selectedSix);
			$scope.imageSix=theSelected.img;
			$scope.t1SixStyle = {"border":"1px solid "+ColorLuminance(getColor(theSelected.types[0]),-.2),
					"float":"left",
					"margin-left":"10px",
					"background": getColor(theSelected.types[0]),
					"height":"10px",
					"border-radius":"5px",
					"text-align":"center",
					"font-family":"arial",
					"font-size":"10px",
					"width":"50px",
					"margin-bottom":"5px"};	
			$scope.t1Six = theSelected.types[0];
			if(theSelected.types.length==2){
				$scope.t2SixStyle=
				{"border":"1px solid "+ColorLuminance(getColor(theSelected.types[1]),-.2),
				"float":"right",
				"margin-right":"10px",
				"background": getColor(theSelected.types[1]),
				"height":"10px",
				"border-radius":"5px",
				"text-align":"center",
				"font-family":"arial",
				"font-size":"10px",
				"width":"50px",
				"margin-bottom":"5px"};
				$scope.t2Six = theSelected.types[1];
			}
			else{
				$scope.t2SixStyle = {"border":"transparent","background":"transparent"};
				$scope.t2Six = "";
			}
			var per = Math.round(theSelected.stats.hp/255*100);
			$scope.sixHPInStyle = {"width":per+"%",
					"height":"10px","background-color":statColor(theSelected.stats.hp),
					"border-radius":"5px","border":"1px solid black","font-size":"7px"};
			$scope.sixHPIn = theSelected.stats.hp;
			var perAtt = Math.round(theSelected.stats.attack/255*100);
			$scope.sixAttackInStyle = {"width":perAtt+"%",
					"height":"10px","background-color":statColor(theSelected.stats.attack),
					"border-radius":"5px","border":"1px solid black","font-size":"7px"};
			$scope.sixAttackIn = theSelected.stats.attack;
			var perDef = Math.round(theSelected.stats.defense/255*100);
			$scope.sixDefenseInStyle = {"width":perDef+"%",
					"height":"10px","background-color":statColor(theSelected.stats.defense),
					"border-radius":"5px","border":"1px solid black","font-size":"7px"};
			$scope.sixDefenseIn = theSelected.stats.defense;
			var perSAtt = Math.round(theSelected.stats.spAttack/255*100);
			$scope.sixSpAttackInStyle = {"width":perSAtt+"%",
					"height":"10px","background-color":statColor(theSelected.stats.spAttack),
					"border-radius":"5px","border":"1px solid black","font-size":"7px"};
			$scope.sixSpAttackIn = theSelected.stats.spAttack;
			var perSDef = Math.round(theSelected.stats.spDefense/255*100);
			$scope.sixSpDefenseInStyle = {"width":perSDef+"%",
					"height":"10px","background-color":statColor(theSelected.stats.spDefense),
					"border-radius":"5px","border":"1px solid black","font-size":"7px"};
			$scope.sixSpDefenseIn = theSelected.stats.spDefense;
			var perSpeed = Math.round(theSelected.stats.speed/255*100);
			$scope.sixSpeedInStyle = {"width":perSpeed+"%",
					"height":"10px","background-color":statColor(theSelected.stats.speed),
					"border-radius":"5px","border":"1px solid black","font-size":"7px"};
			$scope.sixSpeedIn = theSelected.stats.speed;
			activeSix = true;
			changeAverage();
		}
		
		
		
		function changeAverage(){
			var numActive = 0;
			var emptySlot = {"stats":{"hp":0,"attack":0,"defense":0,"spAttack":0,"spDefense":0,"speed":0}};
			if(activeOne){
				var selOne = JSON.parse($scope.selectedOne);
				numActive++;
			} else{ var selOne = emptySlot; }
			if(activeTwo){
				var selTwo = JSON.parse($scope.selectedTwo);
				numActive++;
			} else{ var selTwo = emptySlot; }
			if(activeThree){
				var selThree = JSON.parse($scope.selectedThree);
				numActive++;
			} else{ var selThree = emptySlot; }
			if(activeFour){
				var selFour = JSON.parse($scope.selectedFour);
				numActive++;
			} else{ var selFour = emptySlot; }
			if(activeFive){
				var selFive = JSON.parse($scope.selectedFive);
				numActive++;
			} else{ var selFive = emptySlot; }
			if(activeSix){
				var selSix = JSON.parse($scope.selectedSix);
				numActive++;
			} else{ var selSix = emptySlot; }
			
			
			if(numActive==0){	// to prevent glitch causing divide by zero
				numActive=1;
			}
			
			var avgHP = Math.round((selOne.stats.hp + selTwo.stats.hp + selThree.stats.hp +
					selFour.stats.hp + selFive.stats.hp + selSix.stats.hp)/numActive);
			var avgAttack = Math.round((selOne.stats.attack + selTwo.stats.attack + selThree.stats.attack +
					selFour.stats.attack + selFive.stats.attack + selSix.stats.attack)/numActive);
			var avgDefense = Math.round((selOne.stats.defense + selTwo.stats.defense + selThree.stats.defense +
					selFour.stats.defense + selFive.stats.defense + selSix.stats.defense)/numActive);
			var avgSpAttack = Math.round((selOne.stats.spAttack + selTwo.stats.spAttack + selThree.stats.spAttack +
					selFour.stats.spAttack + selFive.stats.spAttack + selSix.stats.spAttack)/numActive);
			var avgSpDefense = Math.round((selOne.stats.spDefense + selTwo.stats.spDefense + selThree.stats.spDefense +
					selFour.stats.spDefense + selFive.stats.spDefense + selSix.stats.spDefense)/numActive);
			var avgSpeed = Math.round((selOne.stats.speed + selTwo.stats.speed + selThree.stats.speed +
					selFour.stats.speed + selFive.stats.speed + selSix.stats.speed)/numActive);
			
			var perHP = Math.round(avgHP/255*100);
			$scope.avgHPInStyle = {"width":perHP+"%",
					"height":"10px","background-color":statColor(avgHP),
					"border-radius":"5px","border":"1px solid black","font-size":"7px"};
			$scope.avgHPIn = avgHP;
			var perAtt = Math.round(avgAttack/255*100);
			$scope.avgAttackInStyle = {"width":perAtt+"%",
					"height":"10px","background-color":statColor(avgAttack),
					"border-radius":"5px","border":"1px solid black","font-size":"7px"};
			$scope.avgAttackIn = avgAttack;
			var perDef = Math.round(avgDefense/255*100);
			$scope.avgDefenseInStyle = {"width":perDef+"%",
					"height":"10px","background-color":statColor(avgDefense),
					"border-radius":"5px","border":"1px solid black","font-size":"7px"};
			$scope.avgDefenseIn = avgDefense;
			var perSAtt = Math.round(avgSpAttack/255*100);
			$scope.avgSpAttackInStyle = {"width":perSAtt+"%",
					"height":"10px","background-color":statColor(avgSpAttack),
					"border-radius":"5px","border":"1px solid black","font-size":"7px"};
			$scope.avgSpAttackIn = avgSpAttack;
			var perSDef = Math.round(avgSpDefense/255*100);
			$scope.avgSpDefenseInStyle = {"width":perSDef+"%",
					"height":"10px","background-color":statColor(avgSpDefense),
					"border-radius":"5px","border":"1px solid black","font-size":"7px"};
			$scope.avgSpDefenseIn = avgSpDefense;
			var perSpeed = Math.round(avgSpeed/255*100);
			$scope.avgSpeedInStyle = {"width":perSpeed+"%",
					"height":"10px","background-color":statColor(avgSpeed),
					"border-radius":"5px","border":"1px solid black","font-size":"7px"};
			$scope.avgSpeedIn = avgSpeed;
			
			
		}
		
		
		
		
		
		
		
		
		
		function calculateWeakness(type){
			if(type=="Normal"){
				[1,1,]
			}
		}
		
		
		
		
		
		
		
		
		
		
		
		
		function statColor(stat){
			if(stat>=100){
				return "#84f450";
			}
			else if(86<=stat&&stat<=99){
				return "#f9f92a";
			}
			else if(75<=stat&&stat<=85){
				return "#f9992a";
			}
			else if(60<=stat&&stat<=74){
				return "#ff5111";
			}
			else if(stat<60){
				return "#db0000";
			}
			
		}
		
		// credit: https://www.sitepoint.com/javascript-generate-lighter-darker-color/
		function ColorLuminance(hex, lum) {

			// validate hex string
			hex = String(hex).replace(/[^0-9a-f]/gi, '');
			if (hex.length < 6) {
				hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
			}
			lum = lum || 0;

			// convert to decimal and change luminosity
			var rgb = "#", c, i;
			for (i = 0; i < 3; i++) {
				c = parseInt(hex.substr(i*2,2), 16);
				c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
				rgb += ("00"+c).substr(c.length);
			}

			return rgb;
		}
		
		
		
		
		function getColor(type){
			if(type=="Normal"){
				return "#A8A77A";
			}
			else if (type=="Fire"){
				return "#EE8130";
			}
			else if(type=="Fighting"){
				return "#C22E28";
			}
			else if(type=="Water"){
				return "#6390F0";
			}
			else if(type=="Flying"){
				return "#A98FF3";
			}
			else if(type=="Grass"){
				return "#7AC74C";
			}
			else if(type=="Poison"){
				return "#A33EA1";
			}
			else if(type=="Electric"){
				return "#F7D02C";
			}
			else if(type=="Ground"){
				return "#E2BF65";
			}
			else if(type=="Psychic"){
				return "#F95587";
			}
			else if(type=="Rock"){
				return "#B6A136";
			}
			else if(type=="Ice"){
				return "#96D9D6";
			}
			else if(type=="Bug"){
				return "#A6B91A";
			}
			else if(type=="Dragon"){
				return "#6F35FC";
			}
			else if(type=="Ghost"){
				return "#735797";
			}
			else if(type=="Dark"){
				return "#705746";
			}
			else if(type=="Steel"){
				return "#B7B7CE";
			}
			else if(type=="Fairy"){
				return "#D685AD";
			}
			else{
				return "white";
			}	
		}
		
		
		
	})
})