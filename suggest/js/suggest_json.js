// Fonctions pour le suggest

function recherche_suggestions() {
  console.log("Fonction recherche_suggestions");
  var recherche = val("recherche");
  // TODO : 1) transformer le résultat (chaine) en objet JSON
  // 2) parcourir l'objet pour créer le XHTML
  // 3) insérer le XHTML dans le champ "suggest"
  ajax({
    url: "data_json.php",
    donnees : {
    	debutNom : recherche
    }, 
    callback: function (chaineJson) {
    	var objetJson = JSON.parse(chaineJson);
    	//console.log(chaineJson); 
    	//console.log(objetJson); 
    	var suggestXhtml = ""; 
    	/*
    	{"annee":2025,"promo":"LE2",
    		"etudiants":[{"prenom":"Mohamed Othman","nom":"BAZEGA","id":"2"}, ... ]}
    	*/
    	// objetJson.etudiants est un tableau 
    	// sa taille : objetJson.etudiants.length
    	var i; 
    	for(i=0;i<objetJson.etudiants.length;i++) {
    		suggestXhtml += "<div class=\"suggestion\">"; 
    		suggestXhtml += objetJson.etudiants[i].prenom.substring(0,1);
  		 	suggestXhtml += ". ";
		 	  suggestXhtml += objetJson.etudiants[i].nom;
    		suggestXhtml += "</div>"; 
    		
    	}
      console.log("Retour AAJX recherche_suggestions");
      html("suggest", suggestXhtml);
    }
  });
}

function valider_suggestion(e) {
  console.log("Fonction valider_suggestion");
  console.log(e);
  // Intégrer la suggestion cliquée dans le champ de texte
  val("recherche", html(e.target).trim());
}

