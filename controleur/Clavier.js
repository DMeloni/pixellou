
/*
 * Gestion des touches claviers
 */

document.onkeydown = function(e){



	
	//Gestion du saut	
	if(e.keyCode == '32' || e.keyCode == '90'){
		player.jump();
	}

	//Gestion du déplacement à gauche
	if(e.keyCode == '37' || e.keyCode == '81'){
		player.deplacementGauche = true;		
		player.directionActuelle = "gauche";
	}	
	//Gestion du déplacement à droite
	if(e.keyCode == '39'|| e.keyCode == '68'){
		player.deplacementDroite = true;
		player.directionActuelle = "droite";
	}		

	//Gestion du déplacement à droite
	/*
	if(e.keyCode == '40'){
		alert(player.x);
		alert(player.y);
	}*/		
	//Gestion du déplacement à droite
	if(e.keyCode == '38'){
		player.isHero = !player.isHero;
	}		
	
	//Activation du mode ecureuil
	if(e.keyCode == '69'){
		player.transformationEcureuil();
	}

	//Activation du mode passe muraille
	if(e.keyCode == '80'){		
		//player.transformationSpiderman();
		alert(player.isOnPlatform);
	}	
	
	//Reset
	if(e.keyCode == '82'){		
		reset();
	}	
	
	
	
	//Tir !!
	console.log(e.keyCode);
	if(e.keyCode == '223'){		
		player.tir();
	}
	
	
	if(e.keyCode == '13'){		
		allerAuMondeSuivant();
	}	
	
	
	//Touche 1 : 38 49
	if(event.keyCode == '38' || event.keyCode == '49'){
		main.setCouleurCourante(ENTITE_MUR);
		console.log("Outil Mur");
	}

	//Touche 2 : 233 50
	if(event.keyCode == '233' || event.keyCode == '50'){
		main.setCouleurCourante(ENTITE_VIDE);
		console.log("Outil Vide");
	}
	
	//Touche 3 : 34 51
	if(event.keyCode == '34' || event.keyCode == '51'){
		main.setCouleurCourante(ENTITE_TROLL);
		console.log("Outil Troll");
	}	

	//Touche 4 : 34 51
	/*
	if(event.keyCode == '34' || event.keyCode == '51'){
		main.setCouleurCourante(ENTITE_LAVE);
		alert("Outil Lave");
	}	
	
	//Touche 5 : 40 53
	if(event.keyCode == '40' || event.keyCode == '53'){
		main.setCouleurCourante(ENTITE_TROLL);
		alert("Outil Troll");
	}		*/
}


/*
* Gestion du déplacement
*/
document.onkeyup = function(e){	
	//Gestion du déplacement à gauche
	if(e.keyCode == '37' || e.keyCode == '81'){
		player.deplacementGauche = false;		
	}	
	//Gestion du déplacement à gauche
	if(e.keyCode == '39'|| e.keyCode == '68'){
		player.deplacementDroite = false;		
	}		
}

