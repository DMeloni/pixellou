

// D�claration de la classe PlateFormeHorizontale
var ModelePlateformeHorizontale = function(x, y){
	ModeleEntite.call(this, x, y); // H�rite des propri�t�s de l'Entite
	var that = this;
	that.firstColor = ENTITE_COULEUR_PLATEFORME_HORIZONTALE;	
	that.sensdeplacement = 1/8;
	that.deplacement = 0;
};

