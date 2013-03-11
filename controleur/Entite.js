var Entite = function(x, y, type){
	var that = this;
	ModeleEntite.call(that, x, y, type);
	VueEntite.call(that, x, y, type);
	return that;
}
