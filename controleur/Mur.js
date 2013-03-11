var Mur = function(x, y){
	var that = this;
	ModeleMur.call(that, x, y);
	VueMur.call(that, x, y);
	return that;
}
