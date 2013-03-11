<?php session_start();?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
   <html xmlns="http://www.w3.org/1999/xhtml">
	  <head>  
	<!--	<meta property="og:title" content="Pixellou, sauve Pixellette !" /> 
		<meta property="og:description" content="Jeu gratuit (mais moche) semi addictif." /> 
		<meta property="og:image" content="http://www.pixellou.fr/vignette.png" />	-->
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta name="description" content="Jeu gratuit (mais moche) semi addictif."/>		
		<link rel="image_src" href="http://www.pixellou.fr/vignette.png"></link>

		<title>Pixellou, sauve Pixellette !</title>  
	  <style type="text/css">  
	  body {  
		margin:0px;  
		padding:0px;  
		text-align:center;  
		background:black;
		color: white;
	  }  
	  a{
		text-decoration:none;
		color:white;
	  }
	  li{
		list-style:none;
	  }
	  
	  canvas{  
		outline:0;  
		border:1px solid #000;  
		margin-left: auto;  
		margin-right: auto;  
	  }  
	  </style>  
	  </head>  
	  <body>  		
<?php


$repMonde = './monde/';


if(isset($_GET['niveau']) && $_GET['niveau'] == 'next' && isset($_SESSION['monde_courant'] )){

	$listeFichiers = array();
	if ($handle = opendir($repMonde)) {
       while (false !== ($file = readdir($handle))) {
           if ($file != "." && $file != "..") {
				$listeFichiers[] = $file;
           }
       }
       closedir($handle);
   }
   sort($listeFichiers);
   $countListeFichiers = count($listeFichiers);
   $mondeSuivant = ''; 
   for($i = 0; $i < $countListeFichiers; $i ++){
		if($listeFichiers[$i] ==  $_SESSION['monde_courant']){
			if(isset($listeFichiers[$i + 1])){
				$mondeSuivant = $listeFichiers[$i + 1]; 
			}
			break;	
		}
   }
	header("Location: .?niveau=".$mondeSuivant); 
}
else 
if(isset($_GET['niveau']) && is_file($repMonde.$_GET['niveau']))
{
		$_SESSION['monde_courant'] = $_GET['niveau'];
?>
		<canvas id='c'></canvas>  
		<script type="text/javascript"><?php echo transformMapTxtToJs($repMonde.$_GET['niveau']);?></script>  	
		<script type="text/javascript" src="parametre.js"></script>  
		<script type="text/javascript" src="modele/ModeleEntite.js"></script>
		<script type="text/javascript" src="modele/ModelePlayer.js"></script>  
		<script type="text/javascript" src="modele/ModeleTroll.js"></script>
		<script type="text/javascript" src="modele/ModeleMur.js"></script>
		<script type="text/javascript" src="modele/ModelePlateformeVerticale.js"></script>
		<script type="text/javascript" src="modele/ModelePlateformeHorizontale.js"></script> 
		<script type="text/javascript" src="modele/ModeleBalle.js"></script> 
		<script type="text/javascript" src="vue/VueEntite.js"></script> 
		<script type="text/javascript" src="vue/VueTroll.js"></script> 
		<script type="text/javascript" src="vue/VueMur.js"></script> 
		<script type="text/javascript" src="vue/VuePlayer.js"></script>
		<script type="text/javascript" src="vue/VuePlateformeVerticale.js"></script>
		<script type="text/javascript" src="vue/VuePlateformeHorizontale.js"></script> 	
		<script type="text/javascript" src="vue/VueBalle.js"></script> 
		<script type="text/javascript" src="controleur/Entite.js"></script>
		<script type="text/javascript" src="controleur/Player.js"></script>
		<script type="text/javascript" src="controleur/Troll.js"></script> 
		<script type="text/javascript" src="controleur/Mur.js"></script> 
		<script type="text/javascript" src="controleur/PlateformeVerticale.js"></script> 
		<script type="text/javascript" src="controleur/PlateformeHorizontale.js"></script> 
		<script type="text/javascript" src="controleur/Mur.js"></script> 
		<script type="text/javascript" src="controleur/Balle.js"></script> 
		<script type="text/javascript" src="controleur/Clavier.js"></script> 
		<script type="text/javascript" src="utils/clone.js"></script>
		<script type="text/javascript" src="controleur/Editeur.js"></script> 
		<script type="text/javascript" src="game.js"></script>  
		
		<script>
			var allerAuMondeSuivant = function(){
				if(reussite){
					window.location = "?niveau=next";
				}else{
					reset();
				}
			}
		</script>
		<div><a href="index.php">Retourner à la page d'acceuil</a></div>

		
<?php
}else{
?><h1>&#9632; Pixellou, Sauve Pixellette !!! </h1>
<h3>(touches 'Flêches' : bouger, 'Espace' : sauter, 'Entrée' : reset)</h3>
<ul><?php

	$listeFichiers = array();
	if ($handle = opendir($repMonde)) {
       while (false !== ($file = readdir($handle))) {
           if ($file != "." && $file != "..") {
				$listeFichiers[] = $file;
           }
       }
       closedir($handle);
   }
   sort($listeFichiers);
   $countListeFichiers = count($listeFichiers);
   
   for($i = 0; $i < $countListeFichiers; $i ++){
		?><li><a href="index.php?niveau=<?php echo $listeFichiers[$i];?>">Niveau : <?php echo $listeFichiers[$i]; ?></a></li><?php
   }
	?></ul>
	
	<?php
}
?>
	  <!--<div><a href="creer.html">Vous voulez m'envoyer un nouveau niveau ?</a></div>-->
	  </body>  
	</html> 
	
<?php

function transformMapTxtToJs($pFichier){
   $fichier = $pFichier;
   $resourceTest = fopen($fichier, 'r');
   $tableauFinal = '';
   $tableauFinal .= 'var mapParDefaut = [';
   
   $contenu_fichier = file_get_contents($fichier);
   $nbLignes = substr_count($contenu_fichier, "\n");
   $ligne = 0;
   
   
   while(!feof($resourceTest)){
       $ligneCourante = fgets($resourceTest);
	   $strlenLigne = strlen($ligneCourante);
		for($i = 0; $i < $strlenLigne ; $i++){	
			if($ligneCourante[$i] == "\r" || $ligneCourante[$i] == "\n"){
				$tableauFinal .= ']';	   
				break;
			}
			if($i == 0){
				$tableauFinal .= '[';
			}
			if($ligneCourante[$i] == ' '){
				$ligneCourante[$i] = '0';
			}
			$tableauFinal .= '"'.$ligneCourante[$i].'"';
			if(isset($ligneCourante[$i + 1]) && $ligneCourante[$i + 1] != "\r" && $ligneCourante[$i + 1] != "\n"){
				$tableauFinal .= ',';
			}
	   }
	   if($nbLignes > $ligne)
	       $tableauFinal .= ',';	 
	   $ligne++;	   
   }
   
   $tableauFinal .= ']];';
   return $tableauFinal;
 }
?>