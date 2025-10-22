// Fonctions pour le suggest

// structure du cache ? 
var cache = {
	currentSuggestions : [], 
	// tableau des méta-données des étudiants affichés actuellement 
	lastSuggestions : {}
	// objet permettant d'accèder aux suggestions associées à une recherche particulière 
}; 
/*	lastSuggestions : {
		"b" : [..], 
		"t" : [..]
	}
	lastSuggestions : [ 
		{recherche:"b",etudiants : [..]}, 
		{recherche:"t",etudiants : [..]}, 
	]
*/


function recherche_suggestions() {
  console.log("Fonction recherche_suggestions");
  var recherche = val("recherche");
  // TODO : il faudrait ici vérifier si notre historique contient déjà les données recherchées
  // Si oui, ne pas faire la requete AJAX ! 
  // et utiliser les données du cache pour remplir les suggestions 
  
  // INFO: le poids des entetes est supérieur au poids des données transférées : on pourrait utiliser l'API Websockets de HTML5 pour garder la communication ouverte entre le nav. et le serveur 
  
  ajax({
    url: "data_bdd.php",
    donnees : {
    	debutNom : recherche
    }, 
    callback: function (chaineJson) {
   	  // la variable recherche est dans le scope de cette fonction ! 
   	  // cf. closure !! 
    	var objetJson = JSON.parse(chaineJson);
    	//console.log(chaineJson); 
    	//console.log(objetJson); 
    	
    	cache.currentSuggestions = objetJson.etudiants; 
    	cache.lastSuggestions[recherche] = objetJson.etudiants; 
    	
    	
    	var suggestXhtml = ""; 
    	/*
    	{"annee":2025,"promo":"LE2",
    		"etudiants":[{"prenom":"Mohamed Othman","nom":"BAZEGA","id":"2"}, ... ]}
    	*/
    	// objetJson.etudiants est un tableau 
    	// sa taille : objetJson.etudiants.length
    	var i; 
    	for(i=0;i<objetJson.etudiants.length;i++) {
    		// HTML5 offre une API permettant de créer de nouvelles balises pour stocker des données data-attributes 
    		
    		suggestXhtml += "<div id=\"" + i + "\" class=\"suggestion\">"; 
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
  // id dand le cache : 
  var meta = cache.currentSuggestions[e.target.id]; 
  val("recherche", meta.prenom + " " + meta.nom.substring(0,1) + ". (" + meta.id +")");
}

