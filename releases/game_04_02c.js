
var width = 1024, 
	height = 640,
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

// D�claration des couleurs :
const ENTITE_COULEUR_HEROS 				  = '#c8daf6';
const ENTITE_COULEUR_HEROS_ECUREUIL  	  = '#e5f349';
const ENTITE_COULEUR_HEROS_SPIDERMAN	  = '#f23a3a';
const ENTITE_COULEUR_TROLL 			      = '#71e351';
const ENTITE_COULEUR_MUR   				  = '#FFFFFF';
const ENTITE_COULEUR_PLATEFORME_VERTICALE = '#f0f0a2';
var decalageX = 0 ;
var decalageY = -700;
const DIM_BLOC = 16;


var nrOfPlatforms = 0;
var	platforms = [];
var	murs      = [];
var	plateformesVerticales = [];
var	platformWidth = 16;
var	platformHeight = 16;
var mechants = [];
var plateforme = [];
var nombreMechants = 0;
var nombrePlateformes = 0;

		
/*
* La classe Entite repr�sente toutes les entit�s 
* d�finies dans le tableau map_modifiee
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

// D�claration de la classe Troll
var Troll = function(x, y) {
	Entite.call(this, x, y); // H�rite des propri�t�s de l'Entite
	var that = this;
	that.firstColor = ENTITE_COULEUR_TROLL;
	that.deplaceTroll = function(){
		var mechantX = null;
		var mechantY = null;
		for (var numeroMechant = 0; numeroMechant < nombreMechants ; numeroMechant++) {
			i = mechants[numeroMechant]['Y'];
			j = mechants[numeroMechant]['X'];
			map_modifiee[i][j] = '0'; 			
			if(mechants[numeroMechant]['deplacement'] > 2){
				mechants[numeroMechant]['sensdeplacement'] = -1/16;
			}
			if(mechants[numeroMechant]['deplacement'] < -2){
				mechants[numeroMechant]['sensdeplacement'] = 1/16;
			}
			map_modifiee[i][j + mechants[numeroMechant]['sensdeplacement']] = '5';
			
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
	}
};


// D�claration de la classe Mur
var Mur = function(x, y){
	Entite.call(this, x, y); // H�rite des propri�t�s de l'Entite
	var that = this;
	that.firstColor = ENTITE_COULEUR_MUR;

};

// D�claration de la classe PlateFormeVerticale
var PlateFormeVerticale = function(x, y){
	Entite.call(this, x, y); // H�rite des propri�t�s de l'Entite
	var that = this;
	that.firstColor = ENTITE_COULEUR_PLATEFORME_VERTICALE;	
	that.sensdeplacement = 1/8;
	that.deplacement = 0;
};



/*
* D�place le mechant 
*/
var deplacement = 0;
var sensDeplacement = -1/2;

// D�place les plateformes de gauche a droite
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
		//plateformeVerticale.setPosition((plateformeVerticale.X + plateformeVerticale.sensdeplacement) * 16, (plateformeVerticale.Y)  * 16);		
		
		/*
		if(plateformeVerticale.deplacement % 1 == 0){				
			//Dans le cas o� la plateforme est pas toute seule
			if(plateformeVerticale.sensdeplacement > 0){ // De droite � gauche		
					map_modifiee[plateformeVerticale.Y][plateformeVerticale.X] = '0';
					map_modifiee[plateformeVerticale.Y][plateformeVerticale.X + (plateformeVerticale.sensdeplacement * 8)] = '0';
			}else{
					map_modifiee[plateformeVerticale.Y][plateformeVerticale.X] = '0';
					map_modifiee[plateformeVerticale.Y][plateformeVerticale.X + (plateformeVerticale.sensdeplacement * 8)] = '0';				
			}
		}*/
		plateformeVerticale.deplacement += plateformeVerticale.sensdeplacement;
		
	});
	
}


var detecteColisionAvecEntite = function(entite){
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
		detecteColisionAvecEntite(plateformeVerticale);
	});
	murs.forEach(function(mur, index){
		detecteColisionAvecEntite(mur);
	});	
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
		if(map_modifiee.length * DIM_BLOC > length){
			defilementHorizontalPossible = true;	
		}	
		for (var j = 0; j < map_modifiee[i].length ; j++) {	
			if(map_modifiee[i].length * DIM_BLOC > width){
				defilementVerticalPossible = true;	
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
				}
				else if(map_modifiee[i][j] == '2'){
					platforms[nrOfPlatforms] = new Entite(j, i, 1);
					nrOfPlatforms++;
				}else if(map_modifiee[i][j] == '3'){
					origineHerosY = i * 16;
					origineHerosX = j * 16;
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
	Entite.call(this); // H�rite des propri�t�s de l'Entite
	var that = this;
	that.firstColor = ENTITE_COULEUR_HEROS;
	that.width  = 16;
	that.height = 16;
	that.frames = 1;
	that.actualFrame = 0;
	that.deplacementGauche = false;	//D�placement actif vers la gauche
	that.deplacementDroite = false;	//D�placement actif vers la droite
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
			if(map_modifiee[parseInt((player.y - player.height ) / 16)][parseInt(player.x / 16)] == "1"				
			){
				// Mode passe muraille
				if(player.jumpSpeed > 0 && player.isSpiderman){
					return;
				}
			
				that.tombe();
				return;
			}
			if(map_modifiee[parseInt((player.y - player.height ) / 16)][parseInt(player.x / 16)] == "4"){
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
		&&  map_modifiee[parseInt((player.y) / 16) + 1][parseInt(player.x / 16)] == "0"
		){	
			player.isOnPlatform = false;
			player.tombe();
		}
		// Mode Ecureuil volant
		else if(
		   player.isEcureuil
		&& map_modifiee[parseInt((player.y) / 16) + 1][parseInt(player.x / 16)] == "0"
		){	
			player.isOnPlatform = false;
			player.tombe();
		}	
		
		if(map_modifiee[parseInt((player.y) / 16) + 1][parseInt(player.x / 16)] == "2"){
			GameOver(score, 'WIN');	
		}
		if(map_modifiee[parseInt((player.y) / 16) + 1][parseInt(player.x / 16)] == "4"){
			GameOver(0, 'FIRE');
		}	
		if(map_modifiee[parseInt((player.y) / 16) + 1][parseInt(player.x / 16)] == "5"){
			GameOver(0, 'KILL');
		}	
	}
	
	that.checkFall = function(){
		//if (that.y < height - that.height) {
		
			coordonneeY = player.y + player.height - player.y % 16 ;
			coordonneeX = player.x;
 
			if( map_modifiee[parseInt((coordonneeY) / 16)][parseInt(coordonneeX / 16)] == "4"){
				GameOver(0, 'FIRE');
			}
			if( map_modifiee[parseInt((coordonneeY) / 16)][parseInt(coordonneeX / 16)] == "5"){
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
						
			if( map_modifiee[parseInt((coordonneeY) / 16)][parseInt(coordonneeX / 16)] == "0"	 
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
	/*
	that.moveLeft = function(){
		that.repositionnement();
		if (that.x > 0) {
			if( map_modifiee[parseInt((that.y) / 16)][parseInt((that.x - 16) / 16)] == "0") {				
				that.setPosition(that.x - 16, that.y);
			}
			that.detectFall();
		}
	}*/
	that.moveLeft = function(){	
		that.deplacement(-16);
	}
	that.moveRight = function(){	
		that.deplacement(16);
	}	
	//Effectue le deplacement du h�ros et de la cam�ra si besoin
	that.deplacement = function(deplacementValue){
		that.repositionnement();	
		var defilement = false;
		if(defilementVerticalPossible
		 &&((deplacementValue < 0 && (that.x + decalageX < 0 - 10 * deplacementValue))// Gauche
		 || (deplacementValue > 0 && (that.x + decalageX  > width - 10 * deplacementValue )))){
			murs.forEach(function(mur, index){
				if( map_modifiee[parseInt((that.y) / 16)][parseInt((that.x + deplacementValue) / 16)] == "0"){					
					defilement = true;
				}
			});	
			if(defilement){
				decalageX -= deplacementValue;
			}
		}
		if( map_modifiee[parseInt((that.y) / 16)][parseInt((that.x + deplacementValue) / 16)] == "0"
		){
			that.setPosition(that.x + deplacementValue, that.y);
			that.detectFall();
		}			
	}
	
	// Repositionnement parfait sur la grille en cas de d�calage 
	// (d� aux plateformes)
	that.repositionnement = function(){
		//Repositionnement du personnage sur la grille
		if(that.x % 16 != 0 && !that.isOnPlatform){
			if( map_modifiee[parseInt((that.y) / 16)][parseInt((that.x - that.x % 16 - 16) / 16)] == "0"
			// && map_modifiee[parseInt((that.y) / 16 - 1)][parseInt((that.x - that.x % 16 - 16) / 16)] == "1"
			) {				
				that.setPosition(that.x - that.x % 16 - 16, that.y);
			}else if( map_modifiee[parseInt((that.y) / 16)][parseInt((that.x - that.x % 16 + 16) / 16)] == "0"
			 //     && map_modifiee[parseInt((that.y) / 16 - 1)][parseInt((that.x - that.x % 16 - 16) / 16)] == "1"
			) {				
				that.setPosition(that.x - that.x % 16 + 16, that.y);			
			}
		}
	}	

	that.interval = 0;
};







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
	
	//Gestion du d�placement � gauche
	if(e.keyCode == '37'){
		player.deplacementGauche = true;		
	}	
	//Gestion du d�placement � droite
	if(e.keyCode == '39'){
		player.deplacementDroite = true;
	}		

	//Gestion du d�placement � droite
	/*
	if(e.keyCode == '40'){
		alert(player.x);
		alert(player.y);
	}*/		
	//Gestion du d�placement � droite
	if(e.keyCode == '38'){
		player.isHero = !player.isHero;
	}		
	
	//Activation du mode ecureuil
	if(e.keyCode == '69'){
		player.transformationEcureuil();
	}

	//Activation du mode passe muraille
	if(e.keyCode == '80'){		
		player.transformationSpiderman();
	}	

	//Reset
	if(e.keyCode == '82'){		
		reset();
	}	
}

// Fonction de reset
var reset  = function(e){
	mechants = [];
	platforms = [];
	murs      = [];
	plateformesVerticales = [];
	plateforme = [];
	nombreMechants = 0;
	nombrePlateformes = 0;	
	generatemap();
	player = new Player();
	var date = new Date(); 
	timeStampDebut = date.getTime();
	
	deplacePlateforme();
	delete date;
	
	clearTimeout(gLoop);	
	state = true;
	GameLoop();
}

/*
* Gestion du d�placement
*/
document.onkeyup = function(e){
	//Gestion du d�placement � gauche
	if(e.keyCode == '37'){
		player.deplacementGauche = false;		
	}	
	//Gestion du d�placement � gauche
	if(e.keyCode == '39'){
		player.deplacementDroite = false;		
	}		
}

// Recadre l'�cran si le h�ros est trop haut ou trop bas
var detectDefilementVertical = function(){
	var masqueDecalage = 15;
	var defilementHorizontalPossible = true;
	if(defilementHorizontalPossible){
		if(player.y + decalageY < height / 2 - masqueDecalage * DIM_BLOC){
			decalageY += DIM_BLOC;
		}else{
			if(player.y + decalageY > height / 2 + masqueDecalage * DIM_BLOC){
				decalageY -= DIM_BLOC;
			}
		}
	}
}

var GameLoop = function(){	
	clear();

	for (var numeroMechant = 0; numeroMechant < nombreMechants ; numeroMechant++) {
		setTimeout(platforms[mechants[numeroMechant]['codeMechant']].deplaceTroll, 62);
	}
		
	setTimeout(deplacePlateforme, 62);
	
	//MoveCircles(5);
	DrawCircles();

	platforms.forEach(function(platform, index){
		platform.draw(decalageX, decalageY);;
	});
	plateformesVerticales.forEach(function(platform, index){
		platform.draw(decalageX, decalageY);
	});
	
	
	murs.forEach(function(mur, index){
		mur.draw(decalageX, decalageY);
	});
	
	player.draw(decalageX, decalageY);
	
	// Gestion du d�placement du personnage
	if(player.deplacementGauche){
		player.moveLeft();
	}
	if(player.deplacementDroite){
		player.moveRight();
	}	
	
	if (player.isJumping) player.checkJump();
	if (player.isFalling) player.checkFall();	

	detectDefilementVertical();
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
	
reset();

