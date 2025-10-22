<?php
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
		preg_match("/^(.*):(" . $cherche . ".*):.*$/i",$ligne,$tabResultats)
		|| 
		preg_match("/^($cherche.*):(.*):.*$/i",$ligne,$tabResultats)
		)
		{
			// TODO EXO2 afficher nom ET prénom 
			echo "<div class=\"suggestion\">"; 
			echo $tabResultats[2]  . " " . $tabResultats[1]; 
			echo "</div>"; 
			// TODO formater en XHTML
		}
	}

	die("");
}

?>
