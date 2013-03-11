var Player = function(){
	var that = this;
	ModelePlayer.call(that);
	VuePlayer.call(that);
	
    that.jump = function() {
		if (((!that.isJumping || that.isMultiSaut) && !that.isFalling)  || that.isSuperMultiSaut || that.isContreUnMur && that.nbSautsDisponibles > 0) {
			that.nbSautsDisponibles --;				
			that.fallSpeed = 0;
			that.isJumping = true;
			that.jumpSpeed = 16;
		}
	}
	
	that.checkJump = function() {

		if(typeof(map_modifiee[parseInt((player.y - player.height ) / DIM_BLOC)]) == "undefined"		
		|| typeof(map_modifiee[parseInt((player.y - player.height ) / DIM_BLOC)][parseInt(player.x / DIM_BLOC)]) == "undefined"			
		|| map_modifiee[parseInt((player.y - player.height ) / DIM_BLOC)][parseInt(player.x / DIM_BLOC)] == "1"				
		){
			// Mode passe muraille
			if(player.jumpSpeed > 0 && player.isSpiderman){
				return;
			}
			that.isContreUnMur = false;
			that.nbSautsDisponibles = that.nbSautsDisponiblesParDefaut; 
			that.tombe();
			
			if(that.nbSautsDisponibles > 0){
				that.isContreUnMur = true;
			}			
			return;
		}
		else{
			
		}
		if(map_modifiee[parseInt((player.y - player.height ) / DIM_BLOC)][parseInt(player.x / DIM_BLOC)] == "4"){
			GameOver(0, 'TETE BRULEE');
			return;
		}	
		
		that.setPosition(that.x, that.y - that.jumpSpeed);		
		
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
		that.isContreUnMur = false;
		that.nbSautsDisponibles = that.nbSautsDisponiblesParDefaut; 
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
						//Le player bouge en même temps que la plateforme
						player.setPosition(player.x + plateformeVerticale.sensdeplacement * DIM_BLOC, (i - 1) * DIM_BLOC ); 
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
				//detecteColisionAvecToutesEntites();	

			//
			// Dans le cas où on saute contre un mur après avoir été sur une plate forme
			if(!(map_modifiee[parseInt((that.y) / DIM_BLOC)][parseInt((coordonneeX - coordonneeX % DIM_BLOC)/ DIM_BLOC + 1)] == "0")
			){	
				that.setPosition(coordonneeX - coordonneeX % DIM_BLOC, that.y);
			}
			// Même chose vers la gauche
			if(!(map_modifiee[parseInt((that.y) / DIM_BLOC)][parseInt((coordonneeX - coordonneeX % DIM_BLOC)/ DIM_BLOC - 1)] == "0")
			){	
				that.setPosition(coordonneeX - coordonneeX % DIM_BLOC, that.y);
			}			
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
		that.isContreUnMur = false;
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
		}else{ // Dans le cas où Pixellou touche un mur
			if(that.nbSautsDisponibles > 0){
				that.isContreUnMur = true;
			}
			
			if(that.isPassemuraille){
				that.setPosition(that.x + deplacementValue, that.y);
			}
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
	
	return that;
}
