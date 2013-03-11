var width = 1024, 
	height = 640,
	gLoop,
	points = 0,
	state = true,
	c = document.getElementById('c'), 
	ctx = c.getContext('2d');			
	
	c.width = width;
	c.height = height;
var date = new Date(), 
    timeStampDebut = date.getTime();
var score = 0;


// Déclaration des couleurs :
const ENTITE_COULEUR_HEROS 				  = '#c8daf6';
const ENTITE_COULEUR_TROLL 			      = '#71e351';
const ENTITE_COULEUR_MUR   				  = '#FFFFFF';
const ENTITE_COULEUR_PLATEFORME_VERTICALE = '#f0f0a2';

const DIM_BLOC = 16;

var map =  [
		       ["1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1"]
		      ,["1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1"]
			  ,["1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1","0","2","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1"]
			  ,["1","0","3","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1","1","1","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1"]
			  ,["1","1","1","1","0","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1","1","1","1","1","0","0","0","0","0","5","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1"]
			  ,["1","1","1","1","0","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","0","1","1","1","1","0","0","0","0","0","1","1"]
			  ,["0","0","0","0","0","0","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1","4","4","1","1","1","1","1","1","1","1","1","1","1","1","1","1","0","1","1","1","1","0","0","0","0","0","1","1"]
			  ,["0","0","0","0","0","0","0","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1","1","1","0","0","1","1"]
			  ,["1","0","1","4","4","4","4","1","1","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1","1","1","0","0","1","1"]
			  ,["1","0","1","1","1","1","1","1","1","1","1","0","0","6","6","6","6","6","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1","0","0","1","1","1","1","1","1","1","1","1","1","1","1","1","1","0","0","1","1","0","0","0","0","0","0","1","1"]
			  ,["1","0","0","0","0","1","1","0","0","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1","0","0","1","1","1","1","1","1","1","1","1","1","1","1","1","1","0","0","1","1","0","0","0","0","0","0","1","1"]
			  ,["1","1","1","1","0","1","1","0","0","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","0","0","0","1","1","1","1","0","0","1","1","1","1"]
			  ,["1","0","0","0","0","1","1","0","0","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","0","0","0","1","1","1","1","0","0","1","1","1","1"]
			  ,["1","0","1","1","1","1","0","0","0","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","0","0","1","1","0","0","0","0","0","0","0","0","1","1","1","1"]
			  ,["1","0","0","1","1","1","0","0","0","1","1","0","0","0","5","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","0","0","1","1","0","0","0","0","0","0","0","0","1","1","1","1"]
			  ,["1","1","0","1","1","1","0","0","0","1","1","1","1","1","1","1","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","0","1","1","1","1","1","0","0","0","0","1","1"]
			  ,["0","0","0","0","0","0","0","0","0","1","1","1","1","1","1","1","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","0","1","1","1","1","1","0","0","0","0","1","1"]
			  ,["0","0","0","0","0","0","0","0","0","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","4","4","4","4","1","0","0","0","0","0","0","0","1","1","0","0","0","0","0","0","0","0","0","1","1","0","0","0","0","0","0","0","0","1","1","1","1"]
			  ,["0","0","0","0","0","0","0","0","0","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1","1","1","0","0","0","0","0","0","0","1","1","0","0","0","0","0","0","5","0","0","1","1","0","0","0","0","0","0","0","0","1","1","1","1"]
			  ,["0","0","0","0","0","0","0","0","0","1","1","0","0","0","0","0","0","0","0","0","0","0","0","1","1","0","1","1","1","1","1","1","0","0","0","0","0","0","0","1","1","4","4","4","1","1","1","1","1","1","1","1","1","1","4","1","4","1","1","1","1","1","1","1"]
			  ,["0","0","0","0","0","0","0","0","0","1","1","0","0","0","0","0","0","0","0","0","0","0","0","1","1","0","0","0","1","1","1","1","0","0","0","0","0","0","0","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1"]
			  ,["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","0","0","0","1","1","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1"]
			  ,["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","0","0","0","1","1","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1"]
			  ,["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1","1","1","1","1","1","0","0","0","1","1","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1"]
			  ,["1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1","1","1","1","1","1","0","0","0","1","1","1","1","1","1","1","1","1","0","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1"]
			  ,["1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","0","0","0","0","0","0","0","0","0","0","1","1","1","1","1","1","1","1","1","0","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1","1","1","1"]
			  ,["1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","0","0","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","0","0","0","5","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1","1","1","1"]
			  ,["1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","0","0","1","1","0","0","1","4","4","4","1","0","0","0","0","0","0","0","0","0","1","1","1","1","1","1","1","1","1","0","0","0","0","0","0","0","1","1","1","1","1","1","1","1","1","1"]
			  ,["1","1","0","0","0","0","0","0","0","0","0","0","1","1","1","1","1","1","0","0","0","0","0","0","1","1","1","1","1","0","0","0","0","0","0","0","0","0","1","1","1","1","1","1","1","1","1","0","0","0","0","0","0","0","1","1","1","1","1","1","1","1","1","1"]
			  ,["1","1","0","0","0","0","0","0","0","0","1","1","1","1","1","1","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","0","0","0","0","0","0","1","1","1","1","1","1","1","0","0","0","0","0","0","0","0","0","0","1","1"]
			  ,["1","1","0","0","0","0","0","0","0","0","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","0","0","0","0","0","0","1","1","1","1","1","1","1","0","0","0","0","0","0","0","0","0","0","1","1"]
			  ,["1","1","0","0","0","0","0","0","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","0","0","0","0","0","0","0","0","0","0","1","1"]
			  ,["1","1","0","0","0","0","0","0","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","0","0","0","0","0","0","0","0","0","0","1","1"]
			  ,["1","1","0","0","0","0","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","6","6","6","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1","1","1","1","1","1","1","0","0","1","1"]
			  ,["1","1","0","0","0","0","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1","1","1","1","1","1","1","0","0","1","1"]
			  ,["1","1","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1"]
			  ,["1","1","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1"]
			  ,["1","1","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","5","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1"]
			  ,["1","1","1","1","1","1","1","1","1","1","1","1","1","4","4","4","4","4","4","4","1","1","1","1","1","1","1","1","4","4","4","4","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1"]
			  ,["1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1"]
		    ];

	var nrOfPlatforms = 0, 
		platforms = [],
		murs      = [],
		plateformesVerticales = [],
		platformWidth = 16,
		platformHeight = 16;
		
/*
* La classe Entite représente toutes les entités 
* définies dans le tableau map
*/
var Entite = function(x, y, type){
	var that=this;
	that.sensdeplacement = 0;
	that.deplacement = 0;
	
	that.firstColor = '#FFFFFF';

	that.onCollide = function(){			
		player.fallStop();
	};

	if (type === 1) {
		that.firstColor = '#ef97d0';
		that.onCollide = function(){
			player.fallStop();
			//player.jumpSpeed = 50;
		};
	}
	if (type === 4) {
		that.firstColor = '#dc2626';
	}					
	that.x = x * DIM_BLOC;
	that.y = y * DIM_BLOC;
	that.type = type;

	that.setPosition = function(x, y){
		that.x = x;
		that.y = y;
	};

	that.draw = function(){
		ctx.fillStyle = that.firstColor ;
		ctx.fillRect(that.x, that.y, platformWidth, platformHeight);
	};

	return that;
};

// Déclaration de la classe Troll
var Troll = function(x, y) {
	Entite.call(this, x, y); // Hérite des propriétés de l'Entite
	var that = this;
	that.firstColor = ENTITE_COULEUR_TROLL;
	that.deplaceTroll = function(){
		var mechantX = null;
		var mechantY = null;
		for (var numeroMechant = 0; numeroMechant < nombreMechants ; numeroMechant++) {
			i = mechants[numeroMechant]['Y'];
			j = mechants[numeroMechant]['X'];
			map[i][j] = '0'; 			
			if(mechants[numeroMechant]['deplacement'] > 2){
				mechants[numeroMechant]['sensdeplacement'] = -1/16;
			}
			if(mechants[numeroMechant]['deplacement'] < -2){
				mechants[numeroMechant]['sensdeplacement'] = 1/16;
			}
			map[i][j + mechants[numeroMechant]['sensdeplacement']] = '5';
			
			platforms[mechants[numeroMechant]['codeMechant']].setPosition((j + mechants[numeroMechant]['sensdeplacement']) * 16, (i)  * 16);		
			mechants[numeroMechant]['deplacement'] += mechants[numeroMechant]['sensdeplacement'];
			mechants[numeroMechant]['X'] = j + mechants[numeroMechant]['sensdeplacement'];
			var tailleMasque = 1;
			if(typeof(player) != 'undefined'){
				if((player.y == (i * 16)) 
				&& ((player.x >= (j  + mechants[numeroMechant]['sensdeplacement'] - tailleMasque)* 16) 
				&& (player.x <= (j  + mechants[numeroMechant]['sensdeplacement'] + tailleMasque)* 16))){
					GameOver(0, 'KILL');
				}
			}
		}
		setTimeout(that.deplaceTroll, 62);
	}
};

// Déclaration de la classe Mur
var Mur = function(x, y){
	Entite.call(this, x, y); // Hérite des propriétés de l'Entite
	var that = this;
	that.firstColor = ENTITE_COULEUR_MUR;
};

// Déclaration de la classe PlateFormeVerticale
var PlateFormeVerticale = function(x, y){
	Entite.call(this, x, y); // Hérite des propriétés de l'Entite
	var that = this;
	that.firstColor = ENTITE_COULEUR_PLATEFORME_VERTICALE;	
	that.sensdeplacement = 1/8;
	that.deplacement = 0;
};

var mechants = [];
var plateforme = [];
var nombreMechants = 0;
var nombrePlateformes = 0;

/*
* Déplace le mechant 
*/
var deplacement = 0;
var sensDeplacement = -1/2;

// Déplace les plateformes de gauche a droite
var deplacePlateforme = function(){
	plateformesVerticales.forEach(function(plateformeVerticale, index){
		if(plateformeVerticale.deplacement > 2){
			plateformeVerticale.sensdeplacement = -1/8;
		}
		if(plateformeVerticale.deplacement < -2){
			plateformeVerticale.sensdeplacement = 1/8;
		}
		detecteColisionAvecEntite(plateformeVerticale);
		plateformeVerticale.setPosition((plateformeVerticale.X + plateformeVerticale.sensdeplacement) * 16, (plateformeVerticale.Y)  * 16);		
		if(plateformeVerticale.deplacement % 1 == 0){				
			//Dans le cas où la plateforme est pas toute seule
			if(plateformeVerticale.sensdeplacement > 0){ // De droite à gauche		
					map[plateformeVerticale.Y][plateformeVerticale.X] = '0';
					map[plateformeVerticale.Y][plateformeVerticale.X + (plateformeVerticale.sensdeplacement * 8)] = '6';
			}	
		}
		plateformeVerticale.deplacement += plateformeVerticale.sensdeplacement;
		plateformeVerticale.X           += plateformeVerticale.sensdeplacement;
	});
	setTimeout(deplacePlateforme, 62);
}
deplacePlateforme();

var detecteColisionAvecEntite = function(entite){
		var tailleMasque = 0.5 ;
		if((player.y <= (((entite.Y - 1) * 16))) 
		  && (player.y >= ((entite.Y - (1.5 + player.fallSpeed/6)) * 16))
		&& ((player.x >= (entite.X  + entite.sensdeplacement - tailleMasque)* 16) 
		&& (player.x <= (entite.X  + entite.sensdeplacement + tailleMasque)* 16)
		   )){			
			player.fallStop();			
			player.setPosition(player.x + entite.sensdeplacement* 16, (entite.Y - 1) * 16 );
			//player.setPosition(player.x, (plateformeVerticale.Y - 1) * 16 );
		}
}
var detecteColisionAvecToutesEntites = function(){
	plateformesVerticales.forEach(function(plateformeVerticale, index){
		detecteColisionAvecEntite(plateformeVerticale);
	});
	murs.forEach(function(mur, index){
		detecteColisionAvecEntite(mur);
	});	
}


var generateMap = function(){
	for (var i = 0; i < map.length ; i++) {			
		for (var j = 0; j < map[i].length ; j++) {	
			if(map[i][j] != '0'){
				if(map[i][j] == '1'){
					murs[nrOfPlatforms] = new Mur(j, i , 0);
					nrOfPlatforms++;
				}else if(map[i][j] == '6'){	
					plateformesVerticales[nrOfPlatforms] = new PlateFormeVerticale(j, i);
					plateformesVerticales[nrOfPlatforms].X  = j;
					plateformesVerticales[nrOfPlatforms].Y  = i;					
					nrOfPlatforms++;					
					nombrePlateformes++;								
				}
				else if(map[i][j] == '2'){
					platforms[nrOfPlatforms] = new Entite(j, i, 1);
					nrOfPlatforms++;
				}else if(map[i][j] == '3'){
					origineHerosY = i * 16;
					origineHerosX = j * 16;
				}else if(map[i][j] == '4'){
					platforms[nrOfPlatforms] = new Entite( j, i , 4);
					nrOfPlatforms++;
				}else if(map[i][j] == '5'){
					mechants[nombreMechants] = [];
					mechants[nombreMechants]["X"] = j;
					mechants[nombreMechants]["Y"] = i;
					mechants[nombreMechants]['deplacement'] = 0;
					mechants[nombreMechants]['codeMechant'] = nrOfPlatforms;
					if(0.5 - Math.random() > 0){
						mechants[nombreMechants]['sensdeplacement'] = 1/8;
					}else{
						mechants[nombreMechants]['sensdeplacement'] = -1/8;
					}
					nombreMechants++;
					platforms[nrOfPlatforms] = new Troll( j, i , 5);
					platforms[nrOfPlatforms].deplaceTroll();
					nrOfPlatforms++;
				}
			}
		}
	}
}();


var clear = function(){
	ctx.fillStyle = '#000000';
	ctx.clearRect(0, 0, width, height);
	ctx.beginPath();
	ctx.rect(0, 0, width, height);
	ctx.closePath();
	ctx.fill();
}

var howManyCircles = 10, circles = [];

for (var i = 0; i < howManyCircles; i++) 
	circles.push([Math.random() * width, Math.random() * height, Math.random() * 100, Math.random() / 2]);

var DrawCircles = function(){
	for (var i = 0; i < howManyCircles; i++) {
		ctx.fillStyle = 'rgba(255, 255, 255, ' + circles[i][3] + ')';
		ctx.beginPath();
		ctx.arc(circles[i][0], circles[i][1], circles[i][2], 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fill();
	}
};

var MoveCircles = function(e){
	for (var i = 0; i < howManyCircles; i++) {
		if (circles[i][1] - circles[i][2] > height) {
			circles[i][0] = Math.random() * width;
			circles[i][2] = Math.random() * 100;
			circles[i][1] = 0 - circles[i][2];
			circles[i][3] = Math.random() / 2;
		}
		else {
			circles[i][1] += e;
		}
	}
};

var player = new (function(){
	Entite.call(this); // Hérite des propriétés de l'Entite
	var that = this;
	that.firstColor = ENTITE_COULEUR_HEROS;
	that.width  = 16;
	that.height = 16;
	that.frames = 1;
	that.actualFrame = 0;
	that.deplacementGauche = false;	//Déplacement actif vers la gauche
	that.deplacementDroite = false;	//Déplacement actif vers la droite
	that.isJumping = false;
	that.isFalling = false;
	that.jumpSpeed = 0;
	that.fallSpeed = 0;
	that.origineY = origineHerosY;
	that.origineX = origineHerosX;
	
    that.jump = function() {
		if (!that.isJumping && !that.isFalling) {
			that.fallSpeed = 0;
			that.isJumping = true;
			that.jumpSpeed = 16;
		}
	}
	
	that.checkJump = function() {
		if (true || that.y > height*0.4) {			
			if(map[parseInt((player.y - player.height ) / 16)][parseInt(player.x / 16)] == "1"){
				that.tombe();
				return;
			}
			if(map[parseInt((player.y - player.height ) / 16)][parseInt(player.x / 16)] == "4"){
				GameOver(0, 'TETE BRULEE');
				return;
			}	
			
			that.setPosition(that.x, that.y - that.jumpSpeed);		
		}
		
		else {
			if (that.jumpSpeed > 10) 
				points++;			
		}
		
		//Pixellou redescend
		that.jumpSpeed--;		
		if (that.jumpSpeed == 0) {
			that.tombe();
		}
	
	}
	that.tombe = function(){
		jumpSpeed = 0;
		that.isJumping = false;
		that.isFalling = true;
		that.fallSpeed = 1;
	}

	that.fallStop = function(){
		that.repositionnement();
		that.isFalling = false;
		that.fallSpeed = 0;
		//that.jump();	
	}
	
	that.detectFall = function(){
		if(!player.isFalling 
		&& !player.isJumping
		//&&  map[parseInt((player.y) / 16) - 1][parseInt(player.x / 16)] == "0") // Fonction de grimpage au plafond rigolote
		&&  map[parseInt((player.y) / 16) + 1][parseInt(player.x / 16)] == "0"
		){	
			player.tombe();
		}
		if(map[parseInt((player.y) / 16) + 1][parseInt(player.x / 16)] == "2"){
			GameOver(score, 'WIN');	
		}
		if(map[parseInt((player.y) / 16) + 1][parseInt(player.x / 16)] == "4"){
			GameOver(0, 'FIRE');
		}	
		if(map[parseInt((player.y) / 16) + 1][parseInt(player.x / 16)] == "5"){
			GameOver(0, 'KILL');
		}	
	}
	
	that.checkFall = function(){
		//if (that.y < height - that.height) {
		
			coordonneeY = player.y + player.height - player.y % 16 ;
			coordonneeX = player.x;
 
			if( map[parseInt((coordonneeY) / 16)][parseInt(coordonneeX / 16)] == "4"){
				GameOver(0, 'FIRE');
			}
			if( map[parseInt((coordonneeY) / 16)][parseInt(coordonneeX / 16)] == "5"){
				GameOver(0, 'KILL');
			}		

			// Detection de la plate forme qui bouge
			plateformesVerticales.forEach(function(plateformeVerticale, index){
				i = plateformeVerticale.Y;
				j = plateformeVerticale.X;
				if(plateformeVerticale.deplacement > 2){
					plateformeVerticale.sensdeplacement = -1/8;
				}
				if(plateformeVerticale.deplacement < -2){
					plateformeVerticale.sensdeplacement = 1/8;
				}
				//Detection d'une colision
				var tailleMasque = 0.5 ;			
				//Chute sur la plateforme		
				if((player.y <= (((i - 1) * 16))) 
				  && (player.y >= ((i - (1.5 + player.fallSpeed/6)) * 16))
				&& ((player.x >= (j  + plateformeVerticale.sensdeplacement - tailleMasque)* 16) 
				&& (player.x <= (j  + plateformeVerticale.sensdeplacement + tailleMasque)* 16)
				   )){			
					player.fallStop();			
					//player.setPosition(player.x + plateforme[numeroPlateForme]['sensdeplacement']* 16, (i - 1) * 16 );
					player.setPosition(player.x, (i - 1) * 16 ); 
					return;
				}			
			});		
				
			detecteColisionAvecToutesEntites();
						
			if( map[parseInt((coordonneeY) / 16)][parseInt(coordonneeX / 16)] == "0"	 
			){		
				that.setPosition(that.x, that.y + that.fallSpeed);				
				if(that.fallSpeed < 10){
					that.fallSpeed++;
				}
			}else{
				that.setPosition(coordonneeX, coordonneeY - 16 );
				that.fallStop();			
				return;						
			}
	}
	
	that.moveLeft = function(){
		that.repositionnement();
		if (that.x > 0) {
			if( map[parseInt((that.y) / 16)][parseInt((that.x - 16) / 16)] == "0") {				
				that.setPosition(that.x - 16, that.y);
			}
			that.detectFall();
		}
	}
	
	// Repositionnement parfait sur la grille en cas de décalage 
	// (dû aux plateformes)
	that.repositionnement = function(){
		//Repositionnement du personnage sur la grille
		if(that.x % 16 != 0 && that.isFalling){
			that.setPosition(that.x - that.x % 16 + 16, that.y);
		}		
	}
	that.moveRight = function(){			
		that.repositionnement();		
		var deplacementDroite = 16;
		if( map[parseInt((that.y) / 16)][parseInt((that.x + 16) / 16)] == "0"
		){	
			that.setPosition(that.x + 16, that.y);
		}
		that.detectFall();		
	}
	that.interval = 0;
})();


player.setPosition(player.origineX, player.origineY);



/*
* Gestion du saut lors de l'appui de la touche Espace
*/
/*
document.onkeypress = function(e){

	//Gestion du saut	
	if(e.keyCode == '32'){
		player.jump();
	}
}
*/
document.onkeydown = function(e){
	//Gestion du saut	
	if(e.keyCode == '32'){
		player.jump();
	}
	
	//Gestion du déplacement à gauche
	if(e.keyCode == '37'){
		player.deplacementGauche = true;		
	}	
	//Gestion du déplacement à droite
	if(e.keyCode == '39'){
		player.deplacementDroite = true;
	}		
}

/*
* Gestion du déplacement
*/
document.onkeyup = function(e){
	//Gestion du déplacement à gauche
	if(e.keyCode == '37'){
		player.deplacementGauche = false;		
	}	
	//Gestion du déplacement à gauche
	if(e.keyCode == '39'){
		player.deplacementDroite = false;		
	}		
}
	

//document.focus();

		
	
	var checkCollision = function(){

	}

var GameLoop = function(){
	   

	clear();
	

	//MoveCircles(5);
	DrawCircles();

	platforms.forEach(function(platform, index){
		platform.draw();
	});
	plateformesVerticales.forEach(function(platform, index){
		platform.draw();
	});
	
	murs.forEach(function(mur, index){
		mur.draw();
	});
	
	player.draw();
	
	//checkCollision();

	// Gestion du déplacement du personnage
	if(player.deplacementGauche){
		player.moveLeft();
	}
	if(player.deplacementDroite){
		player.moveRight();
	}	
	
	if (player.isJumping) player.checkJump();
	if (player.isFalling) player.checkFall();	

	var dateFin = new Date();
	timeStampFin = dateFin.getTime() - timeStampDebut;
		
	score = (30000- timeStampFin);
	if(score <= 0){
		GameOver(0, 'TIME UP');
	}
	ctx.fillStyle = "Black";
	ctx.fillText("POINTS:" + score, 10, height-10);
	
	if (state)
		gLoop = setTimeout(GameLoop, 1000 / 50);
}

	var GameOver = function(pScore, pRaison){
		
		state = false;
		clearTimeout(gLoop);
		setTimeout(function(){
			clear();
			
			ctx.fillStyle = "White";
			ctx.font = "10pt Arial";		
				
			if(pScore > 0){
				ctx.fillText("BRAVO !!!", width / 2 - 60, height / 2 - 50);
			}
			else{
				ctx.fillText("GAME OVER : " + pRaison, width / 2 - 60, height / 2 - 50);
			}
			ctx.fillText("SCORE :" + pScore, width / 2 - 60, height / 2 - 30);
		}, 100);
		
	};
	

GameLoop();
