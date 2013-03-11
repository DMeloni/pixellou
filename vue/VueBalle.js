var VueBalle = function(x, y, typeBalle){
	var that = this;
	that.firstColor = "#FF0000";
	VueEntite.call(that, x, y);	
	that.typeBalle = typeBalle;
	
	if(that.typeBalle == 0){
		that.firstColor = "#FF0000";
	}else 
	if(that.typeBalle == 1){
		that.firstColor = "#00F0F0";
	}else 	
	if(that.typeBalle == 2){
		that.firstColor = "#ffe71f";
	}
	
	that.draw = function(decalageX, decalageY){
		ctx.fillStyle = that.firstColor ;
		if(that.typeBalle == 0){
			ctx.fillRect(that.x + decalageX, that.y + decalageY, DIM_BLOC / 4, DIM_BLOC / 4);
		}
		else if(that.typeBalle == 1){
			ctx.fillRect(that.x + decalageX, that.y + decalageY, DIM_BLOC / 3, DIM_BLOC / 3);
		}
		else if(that.typeBalle == 2){
			ctx.fillRect(that.x + decalageX, that.y + decalageY, DIM_BLOC / 2, DIM_BLOC / 2);
		}
		
	};
	
	return that;
}
