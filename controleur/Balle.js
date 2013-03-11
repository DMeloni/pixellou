var Balle = function(x, y, direction, typeBalle){
	var that = this;
	ModeleBalle.call(that, x, y);
	VueBalle.call(that, x, y, typeBalle);
	that.vitesse = DIM_BLOC + 1;
	that.puissance = 1;
	if(typeBalle == 0){
		that.puissance = 1;
		that.vitesse = DIM_BLOC + 1;
	}else 	
	if(typeBalle == 1){
		that.puissance = 3;
		that.vitesse = DIM_BLOC + 2;
	} else 	
	if(typeBalle == 2){
		that.puissance = 6;
		that.vitesse = DIM_BLOC + 4;
	}
	
	
	if(direction < 0){
		that.vitesse *= -1; 
	}
	
	that.deplace = function(){
		that.setPosition(that.x + that.vitesse, that.y);
	}
	
	that.detecteCollision = function(){
		if(map_modifiee[parseInt(that.simpleY)][parseInt(that.simpleX)] == "1"){			
			return true;
		}
		/*
		* Colision avec les ennemis
		*/
		var detectionMechant = false;
		var tailleMasque = 1/2;
		mechants.forEach(function(troll, index){
			if(troll.simpleY >= (that.simpleY - tailleMasque)
			 && troll.simpleY <= (that.simpleY + tailleMasque)
			 && troll.simpleX >= (that.simpleX - tailleMasque)
			 && troll.simpleX <= (that.simpleX + tailleMasque)
			 ){
				mechants[index].enlevePV(that.puissance);
				console.log('un mechant touche');
				detectionMechant = true;
			}
		});
		return detectionMechant;
	}

	return that;
}
