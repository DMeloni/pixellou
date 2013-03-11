var VueMur = function(x, y){
	var that = this;
	that.firstColor = ENTITE_COULEUR_MUR;
	VueEntite.call(that, x, y);	
	return that;
}
