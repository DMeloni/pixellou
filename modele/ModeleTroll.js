

// Déclaration de la classe Troll
var ModeleTroll = function(x, y) {
	ModeleEntite.call(this, x, y); // Hérite des propriétés de l'Entite
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
				mechants[numeroMechant]['sensdeplacement'] = -1/32;
			}
			else if(map_modifiee[parseInt(i + 1)][parseInt(j)] != "1"
				 || map_modifiee[parseInt(i)][parseInt(j)] == "1" // Mur de gauche
			){ // Trou de gauche
				mechants[numeroMechant]['sensdeplacement'] = 1/32;
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