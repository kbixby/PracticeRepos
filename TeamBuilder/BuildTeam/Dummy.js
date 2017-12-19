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
		}