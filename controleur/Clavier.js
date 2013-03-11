
/*
 * Gestion des touches claviers
 */

document.onkeydown = function(e){
	//Gestion du saut	
	if(e.keyCode == '32'){
		player.jump();
	}
	
	//Gestion du d�placement � gauche
	if(e.keyCode == '37'){
		player.deplacementGauche = true;		
	}	
	//Gestion du d�placement � droite
	if(e.keyCode == '39'){
		player.deplacementDroite = true;
	}		

	//Gestion du d�placement � droite
	/*
	if(e.keyCode == '40'){
		alert(player.x);
		alert(player.y);
	}*/		
	//Gestion du d�placement � droite
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
	if(e.keyCode == '16'){		
		player.tir();
	}
	if(e.keyCode == '13'){		
		allerAuMondeSuivant();
	}	
}


/*
* Gestion du d�placement
*/
document.onkeyup = function(e){
	//Gestion du d�placement � gauche
	if(e.keyCode == '37'){
		player.deplacementGauche = false;		
	}	
	//Gestion du d�placement � gauche
	if(e.keyCode == '39'){
		player.deplacementDroite = false;		
	}		
}

