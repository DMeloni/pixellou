// Déclaration de la classe Mur
var ModeleMur = function(x, y){
	var that = this;
	that.codeEntite    = "1";
	that.couleurEntite = "#FFFFFF";		
	ModeleEntite.call(that, x, y);
	return that;
};