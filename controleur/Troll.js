var Troll = function(x, y){
	var that = this;
	//Entite.call(that, x, y);
	VueTroll.call(that);
	ModeleTroll.call(that, x, y);
	that.vivant = true;
	that.PV = 2;
	
	that.sensdeplacement = that.deplacement;
	if(0.5 - Math.random() > 0){
		that.sensdeplacement *= 1;
	}else{
		that.sensdeplacement *= -1;
	}

	that.detecteCollisionAvecHeros = function(){
		var tailleMasque = 1;
		var blocSuivant = -1;
		if(that.sensdeplacement > 0){
			blocSuivant = 1;		
		}
		
		if(typeof(player) != 'undefined'){
			if((player.y == (that.simpleY * DIM_BLOC)) 
			&& ((player.x >= (that.simpleX  + that.sensdeplacement - tailleMasque)* DIM_BLOC) 
			&& (player.x <= (that.simpleX  + that.sensdeplacement + tailleMasque)* DIM_BLOC))){
				//GameOver(0, 'KILL');
				that.tempsPause = 10;
				player.enlevePV(1);
				
			}
		}	
	}
	that.numeroMechant = null;
	that.tempsPause = 0;
	that.deplaceTroll = function(){
		map_modifiee[parseInt(that.simpleY)][parseInt(that.simpleX)] = "0";
		var isApteDeDescendre = true;
		
		if(that.tombeDansLave()){
			console.log('meur');
			that.vivant = false;
			return null;
		}
		
		that.detecteChute();		
		blocSuivant = 1;
		var descenteTroll = 1;
		if(that.sensdeplacement < 0){
			blocSuivant = that.sensdeplacement;
			descenteTroll = -1;  // Descente par la droite
			monteeTroll = -1;  // Montee par la droite
		}else{
			descenteTroll = 1; 
			monteeTroll = 1; // Montee par la gauche
		}
		if(!(that.tempsPause > 0)){
			if(
			map_modifiee[parseInt(that.simpleY + 1)][parseInt(that.simpleX + blocSuivant)] == "1" // Bloc en bas
			&& map_modifiee[parseInt(that.simpleY)][parseInt(that.simpleX + blocSuivant)] == "0" 
			//&& map_modifiee[parseInt(that.simpleY + 1)][parseInt(that.simpleX + that.sensdeplacement)] == "0"
			){
				that.setPosition((that.simpleX + that.sensdeplacement) * DIM_BLOC, that.y);	
			}else 
			// Descente escalier
			if(isApteDeDescendre
				&& typeof(map_modifiee[parseInt(that.simpleY + 2)]) != "undefined"
				    && map_modifiee[parseInt(that.simpleY + 2)][parseInt(that.simpleX + blocSuivant)] == "1" 
				&& map_modifiee[parseInt(that.simpleY + 1)][parseInt(that.simpleX + blocSuivant)] == "0" 
				&& map_modifiee[parseInt(that.simpleY)][parseInt(that.simpleX + blocSuivant)] == "0" 
			){
				var nouvelleY = that.y + (that.y + 1) % 1;
				that.setPosition((that.simpleX + descenteTroll) * DIM_BLOC, nouvelleY);	
				that.tempsPause = 5;
			}
			// Monté escalier
			else if(isApteDeDescendre
				&& map_modifiee[parseInt(that.simpleY)][parseInt(that.simpleX + blocSuivant)] == "1" 
				&& map_modifiee[parseInt(that.simpleY - 1)][parseInt(that.simpleX + blocSuivant)] == "0"
			){			
				that.setPosition((that.simpleX + monteeTroll) * DIM_BLOC, (that.simpleY - 1) * DIM_BLOC);
				that.tempsPause = 10;
			}		
			else{
				that.sensdeplacement *=-1;
			}
		}else{
			that.tempsPause -= 1;
		}
		
		that.detecteCollisionAvecHeros();	
		//console.log(that.tempsPause);
	}
	
	that.detecteChute = function(){
			// Le méchant tombe s'il est en dessus d'un trou
		if(map_modifiee[parseInt(that.simpleY + 1)][parseInt(that.simpleX)] != "1"
		){
			that.setPosition(that.x, (that.simpleY + 1 )  * DIM_BLOC);		
			return true;
		}	
		
		
		return false;
	}
	
	that.tombeDansLave = function(){
		if(map_modifiee[parseInt(that.simpleY + 1)][parseInt(that.simpleX)] == "4"){			
			return true;
		}		
		return false;
	}
	

	
	return that;
}
