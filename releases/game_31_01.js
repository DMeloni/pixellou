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
		platformWidth = 16,
		platformHeight = 16;
		
	var Platform = function(x, y, type){
		var that=this;
		
		that.firstColor = '#FFFFFF';
		that.secondColor = '#FFFFFF';
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
		if (type === 5) {
			that.firstColor = '#71e351';
		}	
		if (type === 6) {
			that.firstColor = '#f0f0a2';
		}			
		that.x = ~~ x;
		that.y = y;
		that.type = type;
		
		that.setPosition = function(x, y){
			that.x = x;
			that.y = y;
		};
		
		//NEW IN PART 5
		that.isMoving = ~~(Math.random() * 2);
		that.direction= ~~(Math.random() * 2) ? -1 : 1;
			
		that.draw = function(){
			ctx.fillStyle = that.firstColor ;
			
			/*
			ctx.fillStyle = 'rgba(255, 255, 255, 1)';
			var gradient = ctx.createRadialGradient(that.x + (platformWidth/2), that.y + (platformHeight/2), 5, that.x + (platformWidth/2), that.y + (platformHeight/2), 45);
			gradient.addColorStop(0, that.firstColor);
			gradient.addColorStop(1, that.secondColor);
			ctx.fillStyle = gradient;
			*/
			ctx.fillRect(that.x, that.y, platformWidth, platformHeight);
		};
	
		return that;
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
var deplaceTroll = function(){
	
	var mechantX = null;
	var mechantY = null;
	for (var numeroMechant = 0; numeroMechant < nombreMechants ; numeroMechant++) {
		i = mechants[numeroMechant]['Y'];
		j = mechants[numeroMechant]['X'];
		map[i][j] = '0'; 			
		if(mechants[numeroMechant]['deplacement'] > 2){
			mechants[numeroMechant]['sensdeplacement'] = -1/8;
		}
		if(mechants[numeroMechant]['deplacement'] < -2){
			mechants[numeroMechant]['sensdeplacement'] = 1/8;
		}
		map[i][j + mechants[numeroMechant]['sensdeplacement']] = '5';
		
		platforms[mechants[numeroMechant]['codeMechant']].setPosition((j + mechants[numeroMechant]['sensdeplacement']) * 16, (i)  * 16);		
		mechants[numeroMechant]['deplacement'] += mechants[numeroMechant]['sensdeplacement'];
		mechants[numeroMechant]['X'] = j + mechants[numeroMechant]['sensdeplacement'];
		var tailleMasque = 1;
		if((player.Y == (i * 16)) 
		&& ((player.X >= (j  + mechants[numeroMechant]['sensdeplacement'] - tailleMasque)* 16) 
		&& (player.X <= (j  + mechants[numeroMechant]['sensdeplacement'] + tailleMasque)* 16))){
			GameOver(0, 'KILL');
		}	
	}
	setTimeout(deplaceTroll, 62);
}

// Déplace les plateformes de gauche a droite

var deplacePlateforme = function(){
	for (var numeroPlateForme = 0; numeroPlateForme < nombrePlateformes ; numeroPlateForme++) {
		i = plateforme[numeroPlateForme]['Y'];
		j = plateforme[numeroPlateForme]['X'];
		
		if(plateforme[numeroPlateForme]['deplacement'] > 2){
			plateforme[numeroPlateForme]['sensdeplacement'] = -1/8;
		}
		if(plateforme[numeroPlateForme]['deplacement'] < -2){
			plateforme[numeroPlateForme]['sensdeplacement'] = 1/8;
		}

		//Detection d'une colision
		var tailleMasque = 0.5 ;
		
		//Chute sur la plateforme		
		if((player.Y <= (((i - 1) * 16))) 
		  && (player.Y >= ((i - (1.5 + player.fallSpeed/6)) * 16))
		&& ((player.X >= (j  + plateforme[numeroPlateForme]['sensdeplacement'] - tailleMasque)* 16) 
		&& (player.X <= (j  + plateforme[numeroPlateForme]['sensdeplacement'] + tailleMasque)* 16)
		   )){			
		   //alert(player.fallSpeed);
			player.fallStop();			
			player.setPosition(player.X + plateforme[numeroPlateForme]['sensdeplacement']* 16, (i - 1) * 16 );
			//player.setPosition(player.X, (i - 1) * 16 );			
		}
		platforms[plateforme[numeroPlateForme]['codeMechant']].setPosition((j + plateforme[numeroPlateForme]['sensdeplacement']) * 16, (i)  * 16);		
		if(plateforme[numeroPlateForme]['deplacement'] % 1 == 0){					
			//Dans le cas où la plateforme est pas toute seule
			if(plateforme[numeroPlateForme]['sensdeplacement'] > 0){ // De droite à gauche		
					map[i][j] = '0';
					map[i][j + (plateforme[numeroPlateForme]['sensdeplacement'] * 8)] = '6';
			}	
		}
		plateforme[numeroPlateForme]['deplacement'] += plateforme[numeroPlateForme]['sensdeplacement'];
		plateforme[numeroPlateForme]['X'] = j + plateforme[numeroPlateForme]['sensdeplacement'];
	}
	setTimeout(deplacePlateforme, 62);
}
deplacePlateforme();

/*
// Déplace les plateformes de gauche a droite
var deplacePlateforme = function(){
	for (var numeroPlateForme = 0; numeroPlateForme < nombrePlateformes ; numeroPlateForme++) {
		i = plateforme[numeroPlateForme]['Y'];
		j = plateforme[numeroPlateForme]['X'];
		
		if(plateforme[numeroPlateForme]['deplacement'] > 2){
			plateforme[numeroPlateForme]['sensdeplacement'] = -1/8;
		}
		if(plateforme[numeroPlateForme]['deplacement'] < -2){
			plateforme[numeroPlateForme]['sensdeplacement'] = 1/8;
		}

		//Detection d'une colision
		var tailleMasque = 0.5 ;
		
		//Chute sur la plateforme		
		if((player.Y <= (((i - 1) * 16))) 
		  && (player.Y >= ((i - (1.5 + player.fallSpeed/6)) * 16))
		&& ((player.X >= (j  + plateforme[numeroPlateForme]['sensdeplacement'] - tailleMasque)* 16) 
		&& (player.X <= (j  + plateforme[numeroPlateForme]['sensdeplacement'] + tailleMasque)* 16)
		   )){			
		   //alert(player.fallSpeed);
			player.fallStop();			
			player.setPosition(player.X, (i - 1 + plateforme[numeroPlateForme]['sensdeplacement']) * 16);
			//player.setPosition(player.X, (i - 1) * 16 );			
		}
		platforms[plateforme[numeroPlateForme]['codeMechant']].setPosition(j  * 16, (i + plateforme[numeroPlateForme]['sensdeplacement']) * 16);		
		if(plateforme[numeroPlateForme]['deplacement'] % 1 == 0){					
			//Dans le cas où la plateforme est pas toute seule
			if(plateforme[numeroPlateForme]['sensdeplacement'] > 0){ // De droite à gauche		
				map[i][j] = '0';
				map[i][j + (plateforme[numeroPlateForme]['sensdeplacement'] * 8)] = '6';
			}	
		}
		plateforme[numeroPlateForme]['deplacement'] += plateforme[numeroPlateForme]['sensdeplacement'];
		plateforme[numeroPlateForme]['Y'] = i + plateforme[numeroPlateForme]['sensdeplacement'];
	}
	setTimeout(deplacePlateforme, 62);
}
deplacePlateforme();
*/
var generateMap = function(){
	for (var i = 0; i < map.length ; i++) {			
		for (var j = 0; j < map[i].length ; j++) {	
			if(map[i][j] != '0'){
				if(map[i][j] == '1'){
					platforms[nrOfPlatforms] = new Platform( (j) * 16, (i)  * 16 , 0);
					nrOfPlatforms++;
				}else if(map[i][j] == '6'){
					plateforme[nombrePlateformes] = [];
					plateforme[nombrePlateformes]["X"] = j;
					plateforme[nombrePlateformes]["Y"] = i;
					plateforme[nombrePlateformes]['deplacement'] = 0;
					plateforme[nombrePlateformes]['codeMechant'] = nrOfPlatforms;
					plateforme[nombrePlateformes]['sensdeplacement'] = 1/8;
					
					platforms[nrOfPlatforms] = new Platform( (j) * 16, (i)  * 16 , 6);		
					nrOfPlatforms++;
					nombrePlateformes++;					
				}
				else if(map[i][j] == '2'){
					platforms[nrOfPlatforms] = new Platform( (j) * 16, (i)  * 16 , 1);
					nrOfPlatforms++;
				}else if(map[i][j] == '3'){
					origineHerosY = i * 16;
					origineHerosX = j * 16;
				}else if(map[i][j] == '4'){
					platforms[nrOfPlatforms] = new Platform( (j) * 16, (i)  * 16 , 4);
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
					platforms[nrOfPlatforms] = new Platform( (j) * 16, (i)  * 16 , 5);
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
	var that = this;
	//that.image = new Image();
	//that.image.src = "angel.png"
	that.width = 16;
	that.height = 16;
	that.frames = 1;
	that.actualFrame = 0;
	that.X = 0;
	that.Y = 0;	
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
				
		if (true || that.Y > height*0.4) {			
			if(map[parseInt((player.Y - player.height ) / 16)][parseInt(player.X / 16)] == "1"){
				that.tombe();
				return;
			}
			if(map[parseInt((player.Y - player.height ) / 16)][parseInt(player.X / 16)] == "4"){
				GameOver(0, 'TETE BRULEE');
				return;
			}	
			
			that.setPosition(that.X, that.Y - that.jumpSpeed);		
		}
		
		else {
			if (that.jumpSpeed > 10) 
				points++;
			// if player is in mid of the gamescreen
			// dont move player up, move obstacles down instead
			/*
			MoveCircles(that.jumpSpeed * 0.5);
			
			
			platforms.forEach(function(platform, ind){
				platform.y += that.jumpSpeed;

				if (platform.y > height) {
					var type = ~~(Math.random() * 5);
					if (type == 0) 
						type = 1;
					else 
						type = 0;
					
					platforms[ind] = new Platform(Math.random() * (width - platformWidth), platform.y - height, type);
				}
			});
			*/
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
		that.isFalling = false;
		that.fallSpeed = 0;
		//that.jump();	
	}
	
	that.detectFall = function(){
		if(!player.isFalling 
		&& !player.isJumping
		//&&  map[parseInt((player.Y) / 16) - 1][parseInt(player.X / 16)] == "0") // Fonction de grimpage au plafond rigolote
		&&  map[parseInt((player.Y) / 16) + 1][parseInt(player.X / 16)] == "0"
		)
		{	
			player.tombe();
			//alert(player.X);
		}
		if(map[parseInt((player.Y) / 16) + 1][parseInt(player.X / 16)] == "2"){
			GameOver(score, 'WIN');	
		}
		if(map[parseInt((player.Y) / 16) + 1][parseInt(player.X / 16)] == "4"){
			GameOver(0, 'FIRE');
		}	
		if(map[parseInt((player.Y) / 16) + 1][parseInt(player.X / 16)] == "5"){
			GameOver(0, 'KILL 2');
		}	
	}
	
	
	that.checkFall = function(){
		//if (that.Y < height - that.height) {
		
			coordonneeY    = player.Y + player.height - player.Y % 16 ;
			coordonneeX = player.X;
 
			if( map[parseInt((coordonneeY) / 16)][parseInt(coordonneeX / 16)] == "4"){
				GameOver(0, 'FIRE');
			}
			if( map[parseInt((coordonneeY) / 16)][parseInt(coordonneeX / 16)] == "5"){
				GameOver(0, 'KILL 3');
			}		

			// Detection de la plate forme qui bouge
			for (var numeroPlateForme = 0; numeroPlateForme < nombrePlateformes ; numeroPlateForme++) {
				i = plateforme[numeroPlateForme]['Y'];
				j = plateforme[numeroPlateForme]['X'];
				
				if(plateforme[numeroPlateForme]['deplacement'] > 2){
					plateforme[numeroPlateForme]['sensdeplacement'] = -1/8;
				}
				if(plateforme[numeroPlateForme]['deplacement'] < -2){
					plateforme[numeroPlateForme]['sensdeplacement'] = 1/8;
				}

				//Detection d'une colision
				var tailleMasque = 0.5 ;			
				//Chute sur la plateforme		
				if((player.Y <= (((i - 1) * 16))) 
				  && (player.Y >= ((i - (1.5 + player.fallSpeed/6)) * 16))
				&& ((player.X >= (j  + plateforme[numeroPlateForme]['sensdeplacement'] - tailleMasque)* 16) 
				&& (player.X <= (j  + plateforme[numeroPlateForme]['sensdeplacement'] + tailleMasque)* 16)
				   )){			
					player.fallStop();			
					//player.setPosition(player.X + plateforme[numeroPlateForme]['sensdeplacement']* 16, (i - 1) * 16 );
					player.setPosition(player.X, (i - 1) * 16 ); 
					return;
				}
			}
			if( map[parseInt((coordonneeY) / 16)][parseInt(coordonneeX / 16)] == "0"	 
			){		
				that.setPosition(that.X, that.Y + that.fallSpeed);				
				if(that.fallSpeed < 10){
					that.fallSpeed++;
				}
			}else{
				that.setPosition(coordonneeX, coordonneeY - 16 );
				that.fallStop();			
				return;						
			}
			
			
			
			/*platforms.forEach(function(e, ind){		
				if (				
				(player.X < e.x + platformWidth) && 
				(player.X + player.width > e.x) && 
				(player.Y + player.height + (that.fallSpeed*2 + 1) > e.y) && 
				(player.Y + player.height + (that.fallSpeed*2 + 1) <= e.y + platformHeight)
				) {
					//player.Y = e.y - player.height;				
					that.setPosition(that.X, e.y - that.height);
					e.onCollide();					
					return;
				}				
			})*/
			
					
		//} 
		/*else {
			//if (points == 0){
				that.setPosition(that.X, that.origineY);
				that.fallStop();
			//}
			//else{
			//	GameOver();			
			//}
		}*/
	}
	
	that.moveLeft = function(){
			//Repositionnement du personnage sur la grille
			if(that.X % 16 != 0 && that.isFalling){
				that.setPosition(that.X - that.X % 16, that.Y);
			}
			
		if (that.X > 0) {
			if( map[parseInt((that.Y) / 16)][parseInt((that.X - 16) / 16)] == "0"
			){				
				that.setPosition(that.X - 16, that.Y);
			}
			that.detectFall();
		}
		
	}
	
	that.moveRight = function(){
		//that.replaceEn16();
			
			//Repositionnement du personnage sur la grille
			if(that.X % 16 != 0 && that.isFalling){
				that.setPosition(that.X - that.X % 16 + 16, that.Y);
			}
			
		//if (that.X + that.width < width) {
			var deplacementDroite = 16;
			if( map[parseInt((that.Y) / 16)][parseInt((that.X + 16) / 16)] == "0"
			){	
				that.setPosition(that.X + 16, that.Y);
			}
			that.detectFall();
		//}
		
	}

	
	that.setPosition = function(x, y){
		that.X = x;
		that.Y = y;
	}
	
	that.interval = 0;
	that.draw = function(){
		try {
			  //ctx.drawImage(that.image, 0, 0, that.height, that.width);
			  
			  ctx.beginPath();			   
			 // ctx.moveTo(that.X, that.Y);
			  ctx.fillStyle = '#c8daf6';
			  ctx.fillRect(that.X, that.Y, that.height, that.width);
			  //ctx.lineTo(that.X, that.Y);
			  ctx.stroke();
			
			//ctx.drawImage(that.image, 0, that.height * that.actualFrame, that.width, that.height, that.X, that.Y, that.width, that.height);
		} 
		catch (e) {
		};
		
		if (that.interval == 4 ) {
			if (that.actualFrame == that.frames) {
				that.actualFrame = 0;
			}
			else {
				that.actualFrame++;
			}
			that.interval = 0;
		}
		that.interval++;		
	}
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


	
	player.draw();
	
	
	platforms.forEach(function(platform, index){
	/*
		if (platform.isMoving) {
			if (platform.x < 0) {
				platform.direction = 1;
			} else if (platform.x > width - platformWidth) {
				platform.direction = -1;
			}
				platform.x += platform.direction * (index / 2) * ~~(points / 100);
			}
			*/
		platform.draw();
	});
		 
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
	
deplaceTroll();
GameLoop();
