var app = angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http,$document){
	$http.get('pokemonlist.json').success(function(data){
		$scope.selectedOne = "images/whosthat.png";
		$scope.selectedTwo = "images/whosthat.png";
		$scope.selectedThree = "images/whosthat.png";
		$scope.selectedFour = "images/whosthat.png";
		$scope.selectedFive = "images/whosthat.png";
		$scope.selectedSix = "images/whosthat.png";
		
		
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
			console.log(pok.name);
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