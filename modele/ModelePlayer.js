var ModelePlayer = function(){
	var that = this;
	ModeleEntite.call(that); // Hérite des propriétés de l'Entite	
	that.firstColor = ENTITE_COULEUR_HEROS;
	that.width  = DIM_BLOC;
	that.height = DIM_BLOC;
	that.frames = 1;
	that.actualFrame = 0;
	that.deplacementGauche = false;	//Déplacement actif vers la gauche
	that.deplacementDroite = false;	//Déplacement actif vers la droite
	that.isJumping = false;
	that.isFalling = false;
	that.jumpSpeed = 0;
	that.fallSpeed = 0;
	that.origineY = origineHerosY;
	that.origineX = origineHerosX;
	that.setPosition(that.origineX, that.origineY);
	that.isOnPlatform = false;
	that.isHero = false;
	that.isEcureuil = false;
	that.isPassemuraille = false;
	that.isSpiderman = false;
	that.isMultiSaut = false; // Permet de faire plusieurs sauts d'affilés
	that.isSuperMultiSaut = false; // Permet de faire plusieurs sauts d'affilés même en tombant
	that.isContreUnMur = false; // Permet de faire au moins un saut contre un mur
	that.isMultiSautContreMur = false; // Permet de sauter plusieurs fois contre un mur
	that.nbSautsDisponiblesParDefaut = parametreNbSautsParDefaut;
	that.nbSautsDisponibles   = that.nbSautsDisponiblesParDefaut; // Permet de sauter plusieurs fois contre un mur

};
