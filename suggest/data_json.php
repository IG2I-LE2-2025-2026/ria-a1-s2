<?php
// TODO formater en JSON
// Question de la robustesse !!!
// On veut toujours renvoyer du JSON bien formé 
// même sans argument debutNom
// même si il n'y a aucun résultat 

$data = array("annee"=>2025, "promo"=>"LE2","etudiants"=>array()); 


if (isset($_GET["debutNom"])) 
{
	$cherche = $_GET["debutNom"]; 
	
	// On va ouvrir un fichier et afficher les lignes 
	// où le prénom ou le nom contient ce texte

	$tabLignes = file("LE2_2025_2026.csv");
	foreach ($tabLignes as $ligne)
	{
		// TODO EXO1 : effectuer une recherche sur nom ou prénom 
		if (
		preg_match("/^(.*):(" . $cherche . ".*):(.*)$/i",$ligne,$tabResultats)
		|| 
		preg_match("/^($cherche.*):(.*):(.*)$/i",$ligne,$tabResultats)
		)
		{
			// TODO EXO2 afficher nom ET prénom 
			// echo "<div class=\"suggestion\">"; 
			// echo $tabResultats[2]  . " " . $tabResultats[1]; 
			// echo "</div>"; 
			// TODO : ajouter l'étudiant dans le tableau $data["etudiants"]
			// Cet étudiant doit être décrit par 
			// son nom, son prénom, son id 
			$data["etudiants"][] = array(
				"prenom" => $tabResultats[2], 
				"nom" => $tabResultats[1],
				"id" => $tabResultats[3]
			); 
		}
	}
}
/*
	echo "<pre>"; 
	print_r($data);
	echo "</pre>"; 
*/
// transformer un tableau php en json : 
echo json_encode($data); 
?>
