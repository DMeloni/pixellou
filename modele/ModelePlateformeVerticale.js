
// Déclaration de la classe PlateFormeVerticale
var ModelePlateformeVerticale = function(x, y){
	ModeleEntite.call(this, x, y); // Hérite des propriétés de l'Entite
	var that = this;
	that.firstColor = ENTITE_COULEUR_PLATEFORME_VERTICALE;	
	that.sensdeplacement = 1/8;
	that.deplacement = 0;
};