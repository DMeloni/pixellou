
const DIM_BLOC = 16;
var width =  1024,//document.documentElement.clientWidth - document.documentElement.clientWidth % DIM_BLOC - DIM_BLOC, 
	height = 640,//document.documentElement.clientHeight - document.documentElement.clientHeight % DIM_BLOC - DIM_BLOC,
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
var decalageX;
var decalageY;
var nrOfPlatforms;
var	platforms;
var	murs;
var	plateformesVerticales;
var	plateformesHorizontales;
var mechants;
var plateforme;
var nombreMechants;
var nombrePlateformes;
var defilementVerticalPossible = false;	
var defilementHorizontalPossible = false;
var reussite = false; // Flag de reussite du niveau (agit sur la touche Entrée)
/*
* Déplace le mechant 
*/
var deplacement = 0;
var sensDeplacement = -1/2;

// Déplace les plateformes de gauche a droite
var deplacePlateformeDeGaucheADroite = function(){
	var collision = false;
	plateformesVerticales.forEach(function(PlateformeVerticale, index){
		if(PlateformeVerticale.deplacement > 2){
			PlateformeVerticale.sensdeplacement = -1/8;
		}
		if(PlateformeVerticale.deplacement < -2){
			PlateformeVerticale.sensdeplacement = 1/8;
		}

		deplaceHerosAvecPlateformeVerticale(PlateformeVerticale);
		PlateformeVerticale.setPosition((PlateformeVerticale.X + PlateformeVerticale.sensdeplacement) * DIM_BLOC, (PlateformeVerticale.Y)  * DIM_BLOC);	
		PlateformeVerticale.deplacement += PlateformeVerticale.sensdeplacement;		
		
	});
}
var deplacePlateformeDeHautEnBas = function(){
	plateformesHorizontales.forEach(function(PlateformeVerticale, index){
		if(PlateformeVerticale.deplacement > 2){
			PlateformeVerticale.sensdeplacement = -1/8;
		}
		if(PlateformeVerticale.deplacement < -2){
			PlateformeVerticale.sensdeplacement = 1/8;
		}
		deplaceHerosAvecPlateformeHorizontale(PlateformeVerticale);
		PlateformeVerticale.setPosition((PlateformeVerticale.X) * DIM_BLOC, (PlateformeVerticale.Y + PlateformeVerticale.sensdeplacement)  * DIM_BLOC);	
		PlateformeVerticale.deplacement += PlateformeVerticale.sensdeplacement;
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
	plateformesVerticales.forEach(function(PlateformeVerticale, index){
		deplaceHerosAvecPlateformeVerticale(PlateformeVerticale);
	});
	plateformesHorizontales.forEach(function(PlateformeVerticale, index){
		deplaceHerosAvecPlateformeHorizontale(PlateformeVerticale);
	});	
	/*murs.forEach(function(mur, index){
	/*murs.forEach(function(mur, index){
		deplaceHerosAvecPlateformeVerticale(mur);
	});	*/
}

var map_modifiee;

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
					plateformesVerticales[nrOfPlatforms] = new PlateformeVerticale(j, i);
					plateformesVerticales[nrOfPlatforms].X  = j;
					plateformesVerticales[nrOfPlatforms].Y  = i;					
					nrOfPlatforms++;					
					nombrePlateformes++;	
					map_modifiee[i][j] = '0';					
				}else if(map_modifiee[i][j] == '7'){
					plateformesHorizontales[nrOfPlatforms] = new PlateformeHorizontale(j, i);
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
						mechants[nombreMechants]['sensdeplacement'] = 1/32;
					}else{
						mechants[nombreMechants]['sensdeplacement'] = -1/32;
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
	reussite = false;
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

	player.draw(decalageX, decalageY);
	
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
	
	
	if(player.isContreUnMur){
		player.couleurPiedCourant = player.couleurPiedAvecSaut;
	}
	else{
		player.couleurPiedCourant = player.couleurPiedParDefaut;
	}
	
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
				reussite = true;
				ctx.fillText("BRAVO !!!", width / 2 - 60, height / 2 - 50);
				ctx.fillText("Appuyez sur Entrée pour acceder au monde suivant !", width / 2 - 60, height / 2 - 10);
			}
			else{
				ctx.fillText("GAME OVER : " + pRaison, width / 2 - 60, height / 2 - 50);
				ctx.fillText("Appuyez sur Entrée pour recommencer", width / 2 - 60, height / 2 - 10);
			}
			ctx.fillText("SCORE :" + pScore, width / 2 - 60, height / 2 - 30);				
		}, 100);
		
	};


	
	
reset();