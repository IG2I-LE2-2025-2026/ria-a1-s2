// Fonctions pour le suggest

function recherche_suggestions() {
  console.log("Fonction recherche_suggestions");
  var recherche = val("recherche");
  // TODO : requête AJAX
}

function valider_suggestion(e) {
  console.log("Fonction valider_suggestion");
  console.log(e);
  // TODO : intégrer la suggestion cliquée dans le champ de texte
  val("recherche", html(e.target).trim());
}

