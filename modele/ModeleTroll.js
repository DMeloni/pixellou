

// D�claration de la classe Troll
var ModeleTroll = function(x, y) {
	ModeleEntite.call(this, x, y); // H�rite des propri�t�s de l'Entite
	var that = this;
	that.codeEntite    = "5";
	that.couleurEntite = ENTITE_COULEUR_TROLL;		
	that.firstColor = ENTITE_COULEUR_TROLL;
	that.deplacement = 1/8;
};