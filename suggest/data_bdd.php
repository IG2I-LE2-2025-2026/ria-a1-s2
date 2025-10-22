<?php
// formater en JSON
// Question de la robustesse !!!
// On veut toujours renvoyer du JSON bien formé 
// même sans argument debutNom
// même si il n'y a aucun résultat 

// TODO: récupérer la donnée depuis une base de données ! 
// Utiliser les librairies LE1 : maLibUtils, maLibSQL.pdo

include_once("libs/maLibSQL.pdo.php");
include_once("libs/maLibUtils.php"); 
$data = array("annee"=>2025, "promo"=>"LE2","etudiants"=>array()); 

if ($recherche = valider("debutNom")) { 
	// requete SQL ? 
	$SQL = "SELECT * FROM etudiants WHERE prenom LIKE '$recherche%' OR nom LIKE '$recherche%'"; 
	// exécuter requete et stocker ses résultats dans $data 
	$data["etudiants"] = parcoursRs(SQLSelect($SQL)); 
}

// transformer un tableau php en json : 
echo json_encode($data); 


?>
