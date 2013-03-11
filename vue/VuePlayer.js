var VuePlayer = function(){
	var that = this;	
	that.firstColor = ENTITE_COULEUR_HEROS;
	that.couleurPiedParDefaut = that.firstColor;
	that.couleurPiedAvecSaut  = ENTITE_COULEUR_HEROS_PIED;
	that.couleurPiedCourant   = that.couleurPiedParDefaut;
	that.couleurCasquette     = ENTITE_COULEUR_HEROS_CASQUETTE;
	
	that.draw = function(decalageX, decalageY){
		ctx.fillStyle = that.couleurCasquette;
		ctx.fillRect(that.x + decalageX , that.y + decalageY, DIM_BLOC, DIM_BLOC/3 + 1);
		ctx.fillStyle = that.firstColor ;
		ctx.fillRect(that.x + decalageX, that.y + decalageY + DIM_BLOC /3 , DIM_BLOC, DIM_BLOC/3 * 2);		
		ctx.fillStyle = that.couleurPiedCourant;
		ctx.fillRect(that.x + decalageX , that.y + decalageY + 3 * DIM_BLOC /4, DIM_BLOC, DIM_BLOC/4);
	};
	return that;
}
