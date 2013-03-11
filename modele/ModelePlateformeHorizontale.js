

// Déclaration de la classe PlateFormeHorizontale
var ModelePlateformeHorizontale = function(x, y){
	ModeleEntite.call(this, x, y); // Hérite des propriétés de l'Entite
	var that = this;
	that.firstColor = ENTITE_COULEUR_PLATEFORME_HORIZONTALE;	
	that.sensdeplacement = 1/8;
	that.deplacement = 0;
};

