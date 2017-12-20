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
		
		var allTypesList = ["Normal","Fire","Fighting","Water","Flying","Grass","Poison","Electric","Ground","Psychic","Rock","Ice","Bug","Dragon","Ghost","Dark","Steel","Fairy"];

		var typeMatrix = [18];
		typeMatrix[0] = [1,1,1,1,1,1,1,1,1,1,0.5,1,1,1,0,1,1,1];
		typeMatrix[1] = [1,0.5,1,0.5,1,2,1,1,1,1,0.5,2,2,0.5,1,1,2,1];
		typeMatrix[2] = [2,1,1,1,0.5,1,0.5,1,1,0.5,2,2,0.5,1,0,2,2,0.5];
		typeMatrix[3] = [1,2,1,0.5,1,0.5,1,1,2,1,2,1,1,0.5,1,1,1,1];
		typeMatrix[4] = [1,1,2,1,1,2,1,0.5,1,1,0.5,1,2,1,1,1,0.5,1];
		typeMatrix[5] = [1,0.5,1,2,0.5,1,0.5,1,2,1,2,1,0.5,0.5,1,1,0.5,1];
		typeMatrix[6] = [1,1,1,1,1,2,0.5,1,0.5,1,0.5,1,1,1,0.5,1,0,2];
		typeMatrix[7] = [1,1,1,2,2,0.5,1,0.5,0,1,1,1,1,0.5,1,1,1,1];
		typeMatrix[8] = [1,2,1,1,0,0.5,2,2,1,1,2,1,0.5,1,1,1,2,1];
		typeMatrix[9] = [1,1,2,1,1,1,2,1,1,0.5,1,1,1,1,1,0,0.5,1];
		typeMatrix[10] = [1,2,0.5,1,2,1,1,1,0.5,1,1,2,2,1,1,1,0.5,1];
		typeMatrix[11] = [1,0.5,1,0.5,2,2,1,1,2,1,1,0.5,1,2,1,1,0.5,1];
		typeMatrix[12] = [1,0.5,0.5,1,0.5,2,0.5,1,1,2,1,1,1,1,0.5,2,0.5,0.5];
		typeMatrix[13] = [1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,0.5,0];
		typeMatrix[14] = [0,1,1,1,1,1,1,1,1,2,1,1,1,1,2,0.5,1,1];
		typeMatrix[15] = [1,1,0.5,1,1,1,1,1,1,2,1,1,1,1,2,0.5,1,0.5];
		typeMatrix[16] = [1,0.5,1,0.5,1,1,1,0.5,1,1,2,2,1,1,1,1,0.5,2];
		typeMatrix[17] = [1,0.5,2,1,1,1,0.5,1,1,1,1,1,1,2,1,2,0.5,1];
		
		
		
		
		var teamFourTimes = {"Normal":0,"Fire":0,"Fighting":0,"Water":0,"Flying":0,"Grass":0,"Poison":0,"Electric":0,"Ground":0,"Psychic":0,"Rock":0,"Ice":0,"Bug":0,"Dragon":0,"Ghost":0,"Dark":0,"Steel":0,"Fairy":0};
		var teamTwoTimes = {"Normal":0,"Fire":0,"Fighting":0,"Water":0,"Flying":0,"Grass":0,"Poison":0,"Electric":0,"Ground":0,"Psychic":0,"Rock":0,"Ice":0,"Bug":0,"Dragon":0,"Ghost":0,"Dark":0,"Steel":0,"Fairy":0};
		var teamHalf = {"Normal":0,"Fire":0,"Fighting":0,"Water":0,"Flying":0,"Grass":0,"Poison":0,"Electric":0,"Ground":0,"Psychic":0,"Rock":0,"Ice":0,"Bug":0,"Dragon":0,"Ghost":0,"Dark":0,"Steel":0,"Fairy":0};
		var teamQuarter = {"Normal":0,"Fire":0,"Fighting":0,"Water":0,"Flying":0,"Grass":0,"Poison":0,"Electric":0,"Ground":0,"Psychic":0,"Rock":0,"Ice":0,"Bug":0,"Dragon":0,"Ghost":0,"Dark":0,"Steel":0,"Fairy":0};
		var teamImmune = {"Normal":0,"Fire":0,"Fighting":0,"Water":0,"Flying":0,"Grass":0,"Poison":0,"Electric":0,"Ground":0,"Psychic":0,"Rock":0,"Ice":0,"Bug":0,"Dragon":0,"Ghost":0,"Dark":0,"Steel":0,"Fairy":0};
		
		
		
		
		
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
				var zoomTypes = calculateDefenseTwo(pok.types);
				$scope.zoomSuperStrengths = zoomTypes.SuperStrengths;
				$scope.zoomStrengths = zoomTypes.Strengths;
				$scope.zoomWeaknesses = zoomTypes.Weaknesses;
				$scope.zoomSuperWeaknesses = zoomTypes.SuperWeaknesses;
				$scope.zoomImmunities = zoomTypes.Immunities;
			}
			else{
				$scope.t2ZoomStyle = {"border":"transparent","background":"transparent"};
				$scope.t2Zoom = "";
				var zoomTypes = calculateDefenseOne(pok.types[0]);
				$scope.zoomSuperStrengths = "None";
				$scope.zoomStrengths = zoomTypes.Strengths;
				$scope.zoomWeaknesses = zoomTypes.Weaknesses;
				$scope.zoomSuperWeaknesses = "None";
				$scope.zoomImmunities = zoomTypes.Immunities;
			}
			$scope.zoomName = pok.name;
		}
		
		
		
		
		
		
		
		
		function changeAverage(){
			
			teamFourTimes = {"Normal":0,"Fire":0,"Fighting":0,"Water":0,"Flying":0,"Grass":0,"Poison":0,"Electric":0,"Ground":0,"Psychic":0,"Rock":0,"Ice":0,"Bug":0,"Dragon":0,"Ghost":0,"Dark":0,"Steel":0,"Fairy":0};
			teamTwoTimes = {"Normal":0,"Fire":0,"Fighting":0,"Water":0,"Flying":0,"Grass":0,"Poison":0,"Electric":0,"Ground":0,"Psychic":0,"Rock":0,"Ice":0,"Bug":0,"Dragon":0,"Ghost":0,"Dark":0,"Steel":0,"Fairy":0};
			teamHalf = {"Normal":0,"Fire":0,"Fighting":0,"Water":0,"Flying":0,"Grass":0,"Poison":0,"Electric":0,"Ground":0,"Psychic":0,"Rock":0,"Ice":0,"Bug":0,"Dragon":0,"Ghost":0,"Dark":0,"Steel":0,"Fairy":0};
			teamQuarter = {"Normal":0,"Fire":0,"Fighting":0,"Water":0,"Flying":0,"Grass":0,"Poison":0,"Electric":0,"Ground":0,"Psychic":0,"Rock":0,"Ice":0,"Bug":0,"Dragon":0,"Ghost":0,"Dark":0,"Steel":0,"Fairy":0};
			teamImmune = {"Normal":0,"Fire":0,"Fighting":0,"Water":0,"Flying":0,"Grass":0,"Poison":0,"Electric":0,"Ground":0,"Psychic":0,"Rock":0,"Ice":0,"Bug":0,"Dragon":0,"Ghost":0,"Dark":0,"Steel":0,"Fairy":0};
			
			var numActive = 0;
			var emptySlot = {"stats":{"hp":0,"attack":0,"defense":0,"spAttack":0,"spDefense":0,"speed":0}};
			var activeTeam = [];
			if(activeOne){
				var selOne = JSON.parse($scope.selectedOne);
				activeTeam.push($scope.selectedOne);
				numActive++;
			} else{ var selOne = emptySlot; }
			if(activeTwo){
				var selTwo = JSON.parse($scope.selectedTwo);
				activeTeam.push($scope.selectedTwo);
				numActive++;
			} else{ var selTwo = emptySlot; }
			if(activeThree){
				var selThree = JSON.parse($scope.selectedThree);
				activeTeam.push($scope.selectedThree);
				numActive++;
			} else{ var selThree = emptySlot; }
			if(activeFour){
				var selFour = JSON.parse($scope.selectedFour);
				activeTeam.push($scope.selectedFour);
				numActive++;
			} else{ var selFour = emptySlot; }
			if(activeFive){
				var selFive = JSON.parse($scope.selectedFive);
				activeTeam.push($scope.selectedFive);
				numActive++;
			} else{ var selFive = emptySlot; }
			if(activeSix){
				var selSix = JSON.parse($scope.selectedSix);
				activeTeam.push($scope.selectedSix);
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
			
			//REMEMBER THE LARGER THE NUMBER THE MORE DAMAGE IT DOES (AKA THE WEAKER TO IT THE
			//	POKEMON IS)
			
			
			var member = [];
			for(n=0;n<numActive;n++){
				member = JSON.parse(activeTeam[n]);
				if(member.types.length==1){
					var typesJSON = calculateDefenseOne(member.types[0]);
					//teamDefense[teamDefense.length] = (typesJSON.Strengths);
					if(typesJSON.Strengths[0]!=="None"){
						updateTeamTypeStats(typesJSON.Strengths,0.5);
					}
					if(typesJSON.Weaknesses[0]!=="None"){
						updateTeamTypeStats(typesJSON.Weaknesses,2);
					}
					if(typesJSON.Immunities[0]!=="None"){
						updateTeamTypeStats(typesJSON.Immunities,0);
					}
					
				}
				else{
					var typesJSON = calculateDefenseTwo(member.types);
					if(typesJSON.Strengths[0]!=="None"){
						updateTeamTypeStats(typesJSON.Strengths,0.5);
					}
					if(typesJSON.SuperStrengths[0]!="None"){
						updateTeamTypeStats(typesJSON.SuperStrengths,0.25);
					}
					if(typesJSON.SuperWeaknesses[0]!="None"){
						updateTeamTypeStats(typesJSON.SuperWeaknesses,4);
					}
					if(typesJSON.Weaknesses[0]!=="None"){
						updateTeamTypeStats(typesJSON.Weaknesses,2);
					}
					if(typesJSON.Immunities[0]!=="None"){
						updateTeamTypeStats(typesJSON.Immunities,0);
					}
					
				}
				console.log("~~~~~");
			}
			console.log("TEAM TYPE STATS:");
			console.log("SUPER WEAK TO: " +JSON.stringify(teamFourTimes));
			console.log("WEAK TO: "+JSON.stringify(teamTwoTimes));
			console.log("TOUGH AGAINST: "+JSON.stringify(teamHalf));
			console.log("SUPER TOUGH AGAINST: "+JSON.stringify(teamQuarter));
			console.log("IMMUNE TO: "+JSON.stringify(teamImmune));
			console.log("--------------");
		}
		
		
		
		function updateTeamTypeStats(typesAffected, affectAmount){
			for(utts in typesAffected){
				if(typesAffected[utts]=="Normal"){
					if(affectAmount==4){
						teamFourTimes.Normal++;
					}
					else if(affectAmount==2){
						teamTwoTimes.Normal++;
					}
					else if(affectAmount==0.5){
						teamHalf.Normal++;
					}
					else if(affectAmount==0.25){
						teamQuarter.Normal++;
					}
					else if(affectAmount==0){
						teamImmune.Normal++;
					}
				}
				else if(typesAffected[utts]=="Fire"){
					if(affectAmount==4){
						teamFourTimes.Fire++;
					}
					else if(affectAmount==2){
						teamTwoTimes.Fire++;
					}
					else if(affectAmount==0.5){
						teamHalf.Fire++;
					}
					else if(affectAmount==0.25){
						teamQuarter.Fire++;
					}
					else if(affectAmount==0){
						teamImmune.Fire++;
					}
				}
				else if(typesAffected[utts]=="Fighting"){
					if(affectAmount==4){
						teamFourTimes.Fighting++;
					}
					else if(affectAmount==2){
						teamTwoTimes.Fighting++;
					}
					else if(affectAmount==0.5){
						teamHalf.Fighting++;
					}
					else if(affectAmount==0.25){
						teamQuarter.Fighting++;
					}
					else if(affectAmount==0){
						teamImmune.Fighting++;
					}
				}
				else if(typesAffected[utts]=="Water"){
					if(affectAmount==4){
						teamFourTimes.Water++;
					}
					else if(affectAmount==2){
						teamTwoTimes.Water++;
					}
					else if(affectAmount==0.5){
						teamHalf.Water++;
					}
					else if(affectAmount==0.25){
						teamQuarter.Water++;
					}
					else if(affectAmount==0){
						teamImmune.Water++;
					}
				}
				else if(typesAffected[utts]=="Flying"){
					if(affectAmount==4){
						teamFourTimes.Flying++;
					}
					else if(affectAmount==2){
						teamTwoTimes.Flying++;
					}
					else if(affectAmount==0.5){
						teamHalf.Flying++;
					}
					else if(affectAmount==0.25){
						teamQuarter.Flying++;
					}
					else if(affectAmount==0){
						teamImmune.Flying++;
					}
				}
				else if(typesAffected[utts]=="Grass"){
					if(affectAmount==4){
						teamFourTimes.Grass++;
					}
					else if(affectAmount==2){
						teamTwoTimes.Grass++;
					}
					else if(affectAmount==0.5){
						teamHalf.Grass++;
					}
					else if(affectAmount==0.25){
						teamQuarter.Grass++;
					}
					else if(affectAmount==0){
						teamImmune.Grass++;
					}
				}
				else if(typesAffected[utts]=="Poison"){
					if(affectAmount==4){
						teamFourTimes.Poison++;
					}
					else if(affectAmount==2){
						teamTwoTimes.Poison++;
					}
					else if(affectAmount==0.5){
						teamHalf.Poison++;
					}
					else if(affectAmount==0.25){
						teamQuarter.Poison++;
					}
					else if(affectAmount==0){
						teamImmune.Poison++;
					}
				}
				else if(typesAffected[utts]=="Electric"){
					if(affectAmount==4){
						teamFourTimes.Electric++;
					}
					else if(affectAmount==2){
						teamTwoTimes.Electric++;
					}
					else if(affectAmount==0.5){
						teamHalf.Electric++;
					}
					else if(affectAmount==0.25){
						teamQuarter.Electric++;
					}
					else if(affectAmount==0){
						teamImmune.Electric++;
					}
				}
				else if(typesAffected[utts]=="Ground"){
					if(affectAmount==4){
						teamFourTimes.Ground++;
					}
					else if(affectAmount==2){
						teamTwoTimes.Ground++;
					}
					else if(affectAmount==0.5){
						teamHalf.Ground++;
					}
					else if(affectAmount==0.25){
						teamQuarter.Ground++;
					}
					else if(affectAmount==0){
						teamImmune.Ground++;
					}
				}
				else if(typesAffected[utts]=="Psychic"){
					if(affectAmount==4){
						teamFourTimes.Psychic++;
					}
					else if(affectAmount==2){
						teamTwoTimes.Psychic++;
					}
					else if(affectAmount==0.5){
						teamHalf.Psychic++;
					}
					else if(affectAmount==0.25){
						teamQuarter.Psychic++;
					}
					else if(affectAmount==0){
						teamImmune.Psychic++;
					}
				}
				else if(typesAffected[utts]=="Rock"){
					if(affectAmount==4){
						teamFourTimes.Rock++;
					}
					else if(affectAmount==2){
						teamTwoTimes.Rock++;
					}
					else if(affectAmount==0.5){
						teamHalf.Rock++;
					}
					else if(affectAmount==0.25){
						teamQuarter.Rock++;
					}
					else if(affectAmount==0){
						teamImmune.Rock++;
					}
				}
				else if(typesAffected[utts]=="Ice"){
					if(affectAmount==4){
						teamFourTimes.Ice++;
					}
					else if(affectAmount==2){
						teamTwoTimes.Ice++;
					}
					else if(affectAmount==0.5){
						teamHalf.Ice++;
					}
					else if(affectAmount==0.25){
						teamQuarter.Ice++;
					}
					else if(affectAmount==0){
						teamImmune.Ice++;
					}
				}
				else if(typesAffected[utts]=="Bug"){
					if(affectAmount==4){
						teamFourTimes.Bug++;
					}
					else if(affectAmount==2){
						teamTwoTimes.Bug++;
					}
					else if(affectAmount==0.5){
						teamHalf.Bug++;
					}
					else if(affectAmount==0.25){
						teamQuarter.Bug++;
					}
					else if(affectAmount==0){
						teamImmune.Bug++;
					}
				}
				else if(typesAffected[utts]=="Dragon"){
					if(affectAmount==4){
						teamFourTimes.Dragon++;
					}
					else if(affectAmount==2){
						teamTwoTimes.Dragon++;
					}
					else if(affectAmount==0.5){
						teamHalf.Dragon++;
					}
					else if(affectAmount==0.25){
						teamQuarter.Dragon++;
					}
					else if(affectAmount==0){
						teamImmune.Dragon++;
					}
				}
				else if(typesAffected[utts]=="Ghost"){
					if(affectAmount==4){
						teamFourTimes.Ghost++;
					}
					else if(affectAmount==2){
						teamTwoTimes.Ghost++;
					}
					else if(affectAmount==0.5){
						teamHalf.Ghost++;
					}
					else if(affectAmount==0.25){
						teamQuarter.Ghost++;
					}
					else if(affectAmount==0){
						teamImmune.Ghost++;
					}
				}
				else if(typesAffected[utts]=="Dark"){
					if(affectAmount==4){
						teamFourTimes.Dark++;
					}
					else if(affectAmount==2){
						teamTwoTimes.Dark++;
					}
					else if(affectAmount==0.5){
						teamHalf.Dark++;
					}
					else if(affectAmount==0.25){
						teamQuarter.Dark++;
					}
					else if(affectAmount==0){
						teamImmune.Dark++;
					}
				}
				else if(typesAffected[utts]=="Steel"){
					if(affectAmount==4){
						teamFourTimes.Steel++;
					}
					else if(affectAmount==2){
						teamTwoTimes.Steel++;
					}
					else if(affectAmount==0.5){
						teamHalf.Steel++;
					}
					else if(affectAmount==0.25){
						teamQuarter.Steel++;
					}
					else if(affectAmount==0){
						teamImmune.Steel++;
					}
				}
				else if(typesAffected[utts]=="Fairy"){
					if(affectAmount==4){
						teamFourTimes.Fairy++;
					}
					else if(affectAmount==2){
						teamTwoTimes.Fairy++;
					}
					else if(affectAmount==0.5){
						teamHalf.Fairy++;
					}
					else if(affectAmount==0.25){
						teamQuarter.Fairy++;
					}
					else if(affectAmount==0){
						teamImmune.Fairy++;
					}
				}
			}
		}
		
		
		
		function getCol(matrix,col){
			var column = [];
			for(var i=0;i<matrix.length;i++){
				column.push(matrix[i][col]);
			}
			return column;
		}
		
		function calculateDefenseOne(type){
			var pokeType = typeToNumber(type);
			var defense = getCol(typeMatrix,pokeType);
			var weakTo = [];
			var strongAgainst = [];
			var immuneTo = [];
			for (i=0;i<defense.length;i++){
				if(defense[i]==2){
					weakTo[weakTo.length]=numberToType(i);
				}
				else if(defense[i]==0.5){
					strongAgainst[strongAgainst.length]=numberToType(i);
				}
				else if(defense[i]==0){
					immuneTo[immuneTo.length]=numberToType(i);
				}
			}
			if(weakTo.length==0){
				weakTo[0]="None";
			}
			if(strongAgainst.length==0){
				strongAgainst[0] = "None";
			}
			if(immuneTo.length==0){
				immuneTo[0] = "None";
			}
			var typeJSON = {"Weaknesses":weakTo,"Strengths":strongAgainst,"Immunities":immuneTo}
			return typeJSON;
		}
		
		
		function calculateDefenseTwo(types){
			var pokeTypeOne = typeToNumber(types[0]);
			var pokeTypeTwo = typeToNumber(types[1]);
			defenseOne = getCol(typeMatrix,pokeTypeOne);
			defenseTwo = getCol(typeMatrix,pokeTypeTwo);
			var superWeak = [];
			var weak = [];
			var strong = [];
			var superStrong = [];
			var immune = [];
			for(i=0;i<defenseOne.length;i++){
				var def = Number(defenseOne[i]) * Number(defenseTwo[i]);
				if(def==0.25){
					superStrong[superStrong.length]=numberToType(i);
				}
				else if(def==0.5){
					strong.push(numberToType(i));
				}
				else if(def==2){
					weak[weak.length]=numberToType(i);
				}
				else if(def==4){
					superWeak[superWeak.length]=numberToType(i);
				}
				else if(def==0){
					immune[immune.length]=numberToType(i);
				}
			}
			if(superWeak.length==0){
				superWeak[0] = "None";
			}
			if(weak.length==0){
				weak[0] = "None";
			}
			if(strong.length==0){
				strong[0] = "None";
			}
			if(superStrong.length==0){
				superStrong[0]="None";
			}
			if(immune.length==0){
				immune[0]="None";
			}
			var typeJSON = {"SuperWeaknesses":superWeak,"Weaknesses":weak,"Strengths":strong,"SuperStrengths":superStrong,"Immunities":immune};
			return typeJSON;
		}
		
		
		
		
		
		function numberToType(num){
			if(num==0){
				return "Normal";
			}
			else if(num==1){
				return "Fire";
			}
			else if(num==2){
				return "Fighting";
			}
			else if(num==3){
				return "Water";
			}
			else if(num==4){
				return "Flying";
			}
			else if(num==5){
				return "Grass";
			}
			else if(num==6){
				return "Poison";
			}
			else if(num==7){
				return "Electric";
			}
			else if(num==8){
				return "Ground";
			}
			else if(num==9){
				return "Psychic";
			}
			else if(num==10){
				return "Rock";
			}
			else if(num==11){
				return "Ice";
			}
			else if(num==12){
				return "Bug";
			}
			else if(num==13){
				return "Dragon";
			}
			else if(num==14){
				return "Ghost";
			}
			else if(num==15){
				return "Dark";
			}
			else if(num==16){
				return "Steel";
			}
			else if(num==17){
				return "Fairy";
			}
		}
		
		function typeToNumber(type){
			if(type=="Normal"){
				return 0;
			}
			else if(type=="Fire"){
				return 1;
			}
			else if(type=="Fighting"){
				return 2;
			}
			else if(type=="Water"){
				return 3;
			}
			else if(type=="Flying"){
				return 4;
			}
			else if(type=="Grass"){
				return 5;
			}
			else if(type=="Poison"){
				return 6;
			}
			else if(type=="Electric"){
				return 7;
			}
			else if(type=="Ground"){
				return 8;
			}
			else if(type=="Psychic"){
				return 9;
			}
			else if(type=="Rock"){
				return 10;
			}
			else if(type=="Ice"){
				return 11;
			}
			else if(type=="Bug"){
				return 12;
			}
			else if(type=="Dragon"){
				return 13;
			}
			else if(type=="Ghost"){
				return 14;
			}
			else if(type=="Dark"){
				return 15;
			}
			else if(type=="Steel"){
				return 16;
			}
			else if(type=="Fairy"){
				return 17;
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