// Fonctions pour le suggest

function recherche_suggestions() {
  console.log("Fonction recherche_suggestions");
  var recherche = val("recherche");
  // TODO : requête AJAX
  ajax({
    url: "data.php",
    donnees : {
    	debutNom : recherche
    }, 
    callback: function (r) {
      console.log("Retour AAJX recherche_suggestions");
      html("suggest", r);
    }
  });
}

function valider_suggestion(e) {
  console.log("Fonction valider_suggestion");
  console.log(e);
  // Intégrer la suggestion cliquée dans le champ de texte
  val("recherche", html(e.target).trim());
}

