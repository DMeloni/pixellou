
const DIM_BLOC = 16;
var width =  document.documentElement.clientWidth - document.documentElement.clientWidth % DIM_BLOC - DIM_BLOC, 
	height = document.documentElement.clientHeight - document.documentElement.clientHeight % DIM_BLOC - DIM_BLOC,
	gLoop,
	points = 0,
	state = true,
	c = document.getElementById('c'), 
	ctx = c.getContext('2d');			
	c.width = width;
	c.height = height;
	
var timeStampDebut;
var score = 0;
var player;

// Déclaration des couleurs :
const ENTITE_COULEUR_HEROS 				  = '#c8daf6';
const ENTITE_COULEUR_HEROS_ECUREUIL  	  = '#e5f349';
const ENTITE_COULEUR_HEROS_SPIDERMAN	  = '#f23a3a';
const ENTITE_COULEUR_TROLL 			      = '#71e351';
const ENTITE_COULEUR_MUR   				  = '#FFFFFF';
const ENTITE_COULEUR_PLATEFORME_VERTICALE = '#f0f0a2';
const ENTITE_COULEUR_PLATEFORME_HORIZONTALE = '#a2f0f0';

var decalageX;
var decalageY;



var nrOfPlatforms;
var	platforms;
var	murs;
var	plateformesVerticales;
var	plateformesHorizontales;
var	platformWidth  = DIM_BLOC;
var	platformHeight = DIM_BLOC;
var mechants;
var plateforme;
var nombreMechants;
var nombrePlateformes;

		
/*
* La classe Entite représente toutes les entités 
* définies dans le tableau map_modifiee
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
		that.X = x / DIM_BLOC;
		that.Y = y / DIM_BLOC;
	};

	that.draw = function(decalageX, decalageY){
		ctx.fillStyle = that.firstColor ;
		ctx.fillRect(that.x + decalageX, that.y + decalageY, platformWidth, platformHeight);
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
			map_modifiee[i][j] = '0'; 			
			
			// Le méchant fait demi tour quand il arrive au bord d'un trou /lave ou d'un mur
			if(map_modifiee[parseInt(i + 1)][parseInt(j + 1 )] != "1" // Trou de droite
			 || map_modifiee[parseInt(i)][parseInt(j + 1 )] == "1" // Mur de droite
			 ){ 
				mechants[numeroMechant]['sensdeplacement'] = -1/16;
			}
			else if(map_modifiee[parseInt(i + 1)][parseInt(j)] != "1"
				 || map_modifiee[parseInt(i)][parseInt(j)] == "1" // Mur de gauche
			){ // Trou de gauche
				mechants[numeroMechant]['sensdeplacement'] = 1/16;
			}
			map_modifiee[i][j + mechants[numeroMechant]['sensdeplacement']] = '5';
			
			platforms[mechants[numeroMechant]['codeMechant']].setPosition((j + mechants[numeroMechant]['sensdeplacement']) * DIM_BLOC, (i)  * DIM_BLOC);		
			mechants[numeroMechant]['deplacement'] += mechants[numeroMechant]['sensdeplacement'];
			mechants[numeroMechant]['X'] = j + mechants[numeroMechant]['sensdeplacement'];
			var tailleMasque = 1;
			if(typeof(player) != 'undefined'){
				if((player.y == (i * DIM_BLOC)) 
				&& ((player.x >= (j  + mechants[numeroMechant]['sensdeplacement'] - tailleMasque)* DIM_BLOC) 
				&& (player.x <= (j  + mechants[numeroMechant]['sensdeplacement'] + tailleMasque)* DIM_BLOC))){
					GameOver(0, 'KILL');
				}
			}
		}
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

// Déclaration de la classe PlateFormeHorizontale
var PlateFormeHorizontale = function(x, y){
	Entite.call(this, x, y); // Hérite des propriétés de l'Entite
	var that = this;
	that.firstColor = ENTITE_COULEUR_PLATEFORME_HORIZONTALE;	
	that.sensdeplacement = 1/8;
	that.deplacement = 0;
};



/*
* Déplace le mechant 
*/
var deplacement = 0;
var sensDeplacement = -1/2;

// Déplace les plateformes de gauche a droite
var deplacePlateformeDeGaucheADroite = function(){
	var collision = false;
	plateformesVerticales.forEach(function(plateformeVerticale, index){
		if(plateformeVerticale.deplacement > 2){
			plateformeVerticale.sensdeplacement = -1/8;
		}
		if(plateformeVerticale.deplacement < -2){
			plateformeVerticale.sensdeplacement = 1/8;
		}

		deplaceHerosAvecPlateformeVerticale(plateformeVerticale);
		plateformeVerticale.setPosition((plateformeVerticale.X + plateformeVerticale.sensdeplacement) * DIM_BLOC, (plateformeVerticale.Y)  * DIM_BLOC);	
		plateformeVerticale.deplacement += plateformeVerticale.sensdeplacement;		
		
	});
}
var deplacePlateformeDeHautEnBas = function(){
	plateformesHorizontales.forEach(function(plateformeVerticale, index){
		if(plateformeVerticale.deplacement > 2){
			plateformeVerticale.sensdeplacement = -1/8;
		}
		if(plateformeVerticale.deplacement < -2){
			plateformeVerticale.sensdeplacement = 1/8;
		}
		deplaceHerosAvecPlateformeHorizontale(plateformeVerticale);
		plateformeVerticale.setPosition((plateformeVerticale.X) * DIM_BLOC, (plateformeVerticale.Y + plateformeVerticale.sensdeplacement)  * DIM_BLOC);	
		plateformeVerticale.deplacement += plateformeVerticale.sensdeplacement;
	});
}
var deplaceHerosAvecPlateformeHorizontale = function(entite){
		var tailleMasque = 0.5 ;
		if((player.y <= (((entite.Y - 0.5) * 16))) 
		  && (player.y >= ((entite.Y - (1.5 + player.fallSpeed/6)) * 16))
		  && (player.x + 8 >= entite.X * 16) 
		  && (player.x - 8 <= entite.X * 16)
		   ){		
			player.isOnPlatform = true;
			player.fallStop();		   
			player.setPosition(player.x, (entite.Y - 1  + entite.sensdeplacement) * 16 );
		}
}
var deplaceHerosAvecPlateformeVerticale = function(entite){
		var tailleMasque = 0.5 ;
		if((player.y <= (((entite.Y - 1) * 16))) 
		  && (player.y >= ((entite.Y - (1.5 + player.fallSpeed/6)) * 16))
		  && (player.x >= entite.X * 16) 
		  && (player.x <= entite.X * 16)
		   ){		
			player.isOnPlatform = true;
			player.fallStop();		   
			player.setPosition(player.x + entite.sensdeplacement* 16, (entite.Y - 1) * 16 );
		}
}
var detecteColisionAvecToutesEntites = function(){
	plateformesVerticales.forEach(function(plateformeVerticale, index){
		deplaceHerosAvecPlateformeVerticale(plateformeVerticale);
	});
	plateformesHorizontales.forEach(function(plateformeVerticale, index){
		deplaceHerosAvecPlateformeHorizontale(plateformeVerticale);
	});	
	/*murs.forEach(function(mur, index){
	/*murs.forEach(function(mur, index){
		deplaceHerosAvecPlateformeVerticale(mur);
	});	*/
}

var map_modifiee;
Object.prototype.clone = function() {
  var newObj = (this instanceof Array) ? [] : {};
  for (i in this) {
    if (i == 'clone') continue;
    if (this[i] && typeof this[i] == "object") {
      newObj[i] = this[i].clone();
    } else newObj[i] = this[i]
  } return newObj;
};
var generatemap = function(){
	map_modifiee = map.clone();
	for (var i = 0; i < map_modifiee.length ; i++) {		
		if(map_modifiee.length * DIM_BLOC > height){
			defilementVerticalPossible = true;
		}	
		for (var j = 0; j < map_modifiee[i].length ; j++) {	
			if(map_modifiee[i].length * DIM_BLOC > width){
				defilementHorizontalPossible = true;	
			}						
			if(map_modifiee[i][j] != '0'){
				if(map_modifiee[i][j] == '1'){
					murs[nrOfPlatforms] = new Mur(j, i , 0);
					nrOfPlatforms++;
				}else if(map_modifiee[i][j] == '6'){	
					plateformesVerticales[nrOfPlatforms] = new PlateFormeVerticale(j, i);
					plateformesVerticales[nrOfPlatforms].X  = j;
					plateformesVerticales[nrOfPlatforms].Y  = i;					
					nrOfPlatforms++;					
					nombrePlateformes++;	
					map_modifiee[i][j] = '0';					
				}else if(map_modifiee[i][j] == '7'){
					plateformesHorizontales[nrOfPlatforms] = new PlateFormeHorizontale(j, i);
					plateformesHorizontales[nrOfPlatforms].X  = j;
					plateformesHorizontales[nrOfPlatforms].Y  = i;					
					nrOfPlatforms++;					
					nombrePlateformes++;	
					map_modifiee[i][j] = '0';					
				}
				else if(map_modifiee[i][j] == '2'){
					platforms[nrOfPlatforms] = new Entite(j, i, 1);
					nrOfPlatforms++;
				}else if(map_modifiee[i][j] == '3'){
					origineHerosY = i * DIM_BLOC;
					origineHerosX = j * DIM_BLOC;
					if(defilementHorizontalPossible){
						decalageX = origineHerosX ;
					}else{
						decalageX = (width - map_modifiee[i].length * DIM_BLOC)/2;
					}
					if(defilementVerticalPossible){
						decalageY = height - origineHerosY;
					}else{
						decalageY = (height - map_modifiee.length * DIM_BLOC)/2;
					}
					map_modifiee[i][j] = '0';
				}else if(map_modifiee[i][j] == '4'){
					platforms[nrOfPlatforms] = new Entite( j, i , 4);
					nrOfPlatforms++;
				}else if(map_modifiee[i][j] == '5'){
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
}

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
var defilementVerticalPossible = false;	
var defilementHorizontalPossible = false;

var Player = function(){
	Entite.call(this); // Hérite des propriétés de l'Entite
	var that = this;
	that.firstColor = ENTITE_COULEUR_HEROS;
	that.width  = DIM_BLOC;
	that.height = DIM_BLOC;
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
	that.setPosition(that.origineX, that.origineY);
	that.isOnPlatform = false;
	that.isHero = false;
	that.isEcureuil = false;
	that.isSpiderman = false;
	
    that.jump = function() {
		if (!that.isJumping && !that.isFalling) {
			that.fallSpeed = 0;
			that.isJumping = true;
			that.jumpSpeed = 16;
		}
	}
	
	that.checkJump = function() {
		if (true || that.y > height*0.4) {
			
			if(map_modifiee[parseInt((player.y - player.height ) / DIM_BLOC)][parseInt(player.x / DIM_BLOC)] == "1"				
			){
				// Mode passe muraille
				if(player.jumpSpeed > 0 && player.isSpiderman){
					return;
				}
			
				that.tombe();
				return;
			}
			if(map_modifiee[parseInt((player.y - player.height ) / DIM_BLOC)][parseInt(player.x / DIM_BLOC)] == "4"){
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
		//that.repositionnement();
		that.isFalling = false;
		that.fallSpeed = 0;
		//that.jump();	
	}
	
	that.transformationEcureuil = function(){
		if(!that.isEcureuil){
			that.firstColor = ENTITE_COULEUR_HEROS_ECUREUIL;
			that.isEcureuil  = true;
			that.isSpiderman = false;
		}else{
			that.firstColor = ENTITE_COULEUR_HEROS;
			that.isEcureuil = false;
		}		
	}

	that.transformationSpiderman = function(){
		if(!that.isSpiderman){
			that.firstColor = ENTITE_COULEUR_HEROS_SPIDERMAN;
			that.isEcureuil  = false;
			that.isSpiderman = true;
		}else{
			that.firstColor = ENTITE_COULEUR_HEROS;
			that.isSpiderman = false;
		}
	}
	
	that.detectFall = function(){
		if(!player.isFalling 
		&& !player.isJumping	
		&& !player.isEcureuil				
		&& !player.isSpiderman
		//&&  map_modifiee[parseInt((player.y) / 16) - 1][parseInt(player.x / 16)] == "0") // Fonction de grimpage au plafond rigolote
		&&  map_modifiee[parseInt((player.y) / DIM_BLOC) + 1][parseInt(player.x / DIM_BLOC)] == "0"
		){	
			player.isOnPlatform = false;
			player.tombe();
		}
		// Mode Ecureuil volant
		else if(
		   player.isEcureuil
		&& map_modifiee[parseInt((player.y) / DIM_BLOC) + 1][parseInt(player.x / DIM_BLOC)] == "0"
		){	
			player.isOnPlatform = false;
			player.tombe();
		}	
		
		if(map_modifiee[parseInt((player.y) / DIM_BLOC) + 1][parseInt(player.x / DIM_BLOC)] == "2"){
			GameOver(score, 'WIN');	
		}
		if(map_modifiee[parseInt((player.y) / DIM_BLOC) + 1][parseInt(player.x / DIM_BLOC)] == "4"){
			GameOver(0, 'FIRE');
		}	
		if(map_modifiee[parseInt((player.y) / DIM_BLOC) + 1][parseInt(player.x / DIM_BLOC)] == "5"){
			GameOver(0, 'KILL');
		}	
	}
	
	that.checkFall = function(){
		//if (that.y < height - that.height) {
		
			coordonneeY = player.y + player.height - player.y % DIM_BLOC ;
			coordonneeX = player.x;
 
			if( map_modifiee[parseInt((coordonneeY) / DIM_BLOC)][parseInt(coordonneeX / DIM_BLOC)] == "4"){
				GameOver(0, 'FIRE');
			}
			if( map_modifiee[parseInt((coordonneeY) / DIM_BLOC)][parseInt(coordonneeX / DIM_BLOC)] == "5"){
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
					if((player.y <= (((i - 1) * DIM_BLOC))) 
					  && (player.y >= ((i - (1.5 + player.fallSpeed/6)) * DIM_BLOC))
					  && ((player.x >= (j  + plateformeVerticale.sensdeplacement - tailleMasque)* DIM_BLOC) 
					  && (player.x <= (j  + plateformeVerticale.sensdeplacement + tailleMasque)* DIM_BLOC)
					   )){			
						player.fallStop();
						player.isOnPlatform = true;
						player.setPosition(player.x, (i - 1) * DIM_BLOC ); 
						return;
					}			
				});	
				plateformesHorizontales.forEach(function(plateformeVerticale, index){
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
					if((player.y <= (((i - 1) * DIM_BLOC))) 
					  && (player.y >= ((i - (1.5 + player.fallSpeed/6)) * DIM_BLOC))
					  && ((player.x >= (j  + plateformeVerticale.sensdeplacement - tailleMasque)* DIM_BLOC) 
					  && (player.x <= (j  + plateformeVerticale.sensdeplacement + tailleMasque)* DIM_BLOC)
					   )){			
						player.fallStop();
						player.isOnPlatform = true;
						player.setPosition(player.x, (i - 1) * DIM_BLOC ); 
						return;
					}			
				});	
				detecteColisionAvecToutesEntites();	

			//
						
			if( map_modifiee[parseInt((coordonneeY) / DIM_BLOC)][parseInt(coordonneeX / DIM_BLOC)] == "0"	 
			){		
				that.setPosition(that.x, that.y + that.fallSpeed);				
				if(that.fallSpeed < 10){
					that.fallSpeed++;
				}
			}else{
				that.setPosition(coordonneeX, coordonneeY - DIM_BLOC );
				that.fallStop();			
				return;						
			}
	}
	that.moveLeft = function(){	
		that.deplacement(-DIM_BLOC);
	}
	that.moveRight = function(){	
		that.deplacement(DIM_BLOC);
	}	
	//Effectue le deplacement du héros et de la caméra si besoin
	that.deplacement = function(deplacementValue){
		that.repositionnement();	
		var defilement = false;
		if(defilementHorizontalPossible
		 &&((deplacementValue < 0 && (that.x + decalageX < 0 - width/DIM_BLOC/2 * deplacementValue))// Gauche
		 || (deplacementValue > 0 && (that.x + decalageX  > width - width/DIM_BLOC/2 * deplacementValue )))){
			murs.forEach(function(mur, index){
				if( map_modifiee[parseInt((that.y) / DIM_BLOC)][parseInt((that.x + deplacementValue) / DIM_BLOC)] == "0"){					
					defilement = true;
				}
			});	
			if(defilement){
				decalageX -= deplacementValue;
			}
		}
		if( map_modifiee[parseInt((that.y) / DIM_BLOC)][parseInt((that.x + deplacementValue) / DIM_BLOC)] == "0"
		){
			that.setPosition(that.x + deplacementValue, that.y);
			
		}			
	}
	
	// Repositionnement parfait sur la grille en cas de décalage 
	// (dû aux plateformes)
	that.repositionnement = function(){
		//Repositionnement du personnage sur la grille
		if(that.x % DIM_BLOC != 0 && !that.isOnPlatform){
			if( map_modifiee[parseInt((that.y) / DIM_BLOC)][parseInt((that.x - that.x % DIM_BLOC - DIM_BLOC) / DIM_BLOC)] == "0"
			) {				
				that.setPosition(that.x - that.x % DIM_BLOC - DIM_BLOC, that.y);
			}else if( map_modifiee[parseInt((that.y) / DIM_BLOC)][parseInt((that.x - that.x % DIM_BLOC + DIM_BLOC) / DIM_BLOC)] == "0"
			) {				
				that.setPosition(that.x - that.x % DIM_BLOC + DIM_BLOC, that.y);			
			}
		}
	}	

	that.interval = 0;
};

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

	//Gestion du déplacement à droite
	/*
	if(e.keyCode == '40'){
		alert(player.x);
		alert(player.y);
	}*/		
	//Gestion du déplacement à droite
	if(e.keyCode == '38'){
		player.isHero = !player.isHero;
	}		
	
	//Activation du mode ecureuil
	if(e.keyCode == '69'){
		player.transformationEcureuil();
	}

	//Activation du mode passe muraille
	if(e.keyCode == '80'){		
		//player.transformationSpiderman();
		alert(player.isOnPlatform);
	}	
	
	//Reset
	if(e.keyCode == '82'){		
		reset();
	}	
	
	//Tir !!
	if(e.keyCode == '16'){		
		player.tir();
	}
}

// Fonction de reset
var reset  = function(e){

	clearTimeout(deplacePlateformeDeGaucheADroite);
	clearTimeout(deplacePlateformeDeHautEnBas);
	clearTimeout(gLoop);	
	delete plateformesVerticales;
	delete plateformesHorizontales
	delete plateforme;
	delete platforms;
	delete murs;
	delete player;
	delete map_modifiee;
	mechants = [];
	platforms = [];
	murs      = [];
	plateformesVerticales = [];
	plateformesHorizontales = [];
	plateforme = [];
	nombreMechants = 0;
	nombrePlateformes = 0;	
	nrOfPlatforms = 0;

	generatemap();
	player = new Player();
	var date = new Date(); 
	timeStampDebut = date.getTime();
	deplacePlateformeDeGaucheADroite();
	deplacePlateformeDeHautEnBas();
	delete date;
	
	state = true;
	GameLoop();
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

// Recadre l'écran si le héros est trop haut ou trop bas
var detectDefilementVertical = function(){
	var masqueDecalage = height/DIM_BLOC/2;
	if(defilementVerticalPossible){
		if(player.y + decalageY < height / 2 - masqueDecalage){
			decalageY =  height / 2 - masqueDecalage -  player.y ;
		}else{
			if(player.y + decalageY > height / 2 + masqueDecalage){
				decalageY =  height / 2 + masqueDecalage -  player.y ;
			}
		}
	}
}

var GameLoop = function(){	
	clear();

	for (var numeroMechant = 0; numeroMechant < nombreMechants ; numeroMechant++) {
		setTimeout(platforms[mechants[numeroMechant]['codeMechant']].deplaceTroll, 62);
	}
		
	setTimeout(deplacePlateformeDeHautEnBas, 62);
	setTimeout(deplacePlateformeDeGaucheADroite, 62);
	
	
	//MoveCircles(5);
	DrawCircles();
	detectDefilementVertical();

	plateformesVerticales.forEach(function(platform, index){
		platform.draw(decalageX, decalageY);
	});
	plateformesHorizontales.forEach(function(platform, index){
		platform.draw(decalageX, decalageY);
	});
	platforms.forEach(function(platform, index){
		platform.draw(decalageX, decalageY);;
	});	
	murs.forEach(function(mur, index){
		mur.draw(decalageX, decalageY);
	});
	
	player.draw(decalageX, decalageY);
	
	// Gestion du déplacement du personnage
	if(player.deplacementGauche){
		player.moveLeft();
	}
	if(player.deplacementDroite){
		player.moveRight();
	}	
	
	if (player.isJumping) player.checkJump();
	player.detectFall();
	if (player.isFalling) player.checkFall();	

	if(map_modifiee[parseInt((player.y) / DIM_BLOC)][parseInt(player.x/DIM_BLOC  + 1)] == "2"
	|| map_modifiee[parseInt((player.y) / DIM_BLOC)][parseInt(player.x/DIM_BLOC - 1)] == "2"
	|| map_modifiee[parseInt((player.y) / DIM_BLOC) + 1][parseInt(player.x/DIM_BLOC)] == "2"
	){
		GameOver(score, 'WIN');	
	}
		
	var dateFin = new Date();
	timeStampFin = dateFin.getTime() - timeStampDebut;
		
	score = (30000- timeStampFin);
	if(score <= 0){
		GameOver(0, 'TIME UP');
	}
	ctx.fillStyle = "#777777";
	ctx.fillText("POINTS:" + score, 10, height-10);
	
	if (state)
		gLoop = setTimeout(GameLoop, 1500 / 50);
}

	var GameOver = function(pScore, pRaison){
		
		state = false;
		clearTimeout(gLoop);
		setTimeout(function(){
			clear();
			
			ctx.fillStyle = "#777777";
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

reset();