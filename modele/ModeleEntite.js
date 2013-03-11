/*
* La classe Entite représente toutes les entités 
* définies dans le tableau map_modifiee
*/
var ModeleEntite = function(x, y, type){
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


	return that;
};
