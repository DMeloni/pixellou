/*
* La classe Entite représente toutes les entités
* définies dans le tableau map_modifiee
*/
var VueEntite = function(){
	var that = this;
	that.draw = function(decalageX, decalageY){
		ctx.fillStyle = that.firstColor ;
		ctx.fillRect(that.x + decalageX, that.y + decalageY, DIM_BLOC, DIM_BLOC);
	};
	return that;
}
