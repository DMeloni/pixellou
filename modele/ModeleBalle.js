// Déclaration de la classe Balle
var ModeleBalle = function(x, y){
	var that = this;
	that.codeEntite    = "8";
	that.couleurEntite = "#FF0000";
	ModeleEntite.call(that, x, y);
	return that;
};