// Bibliothèque de fonctions utilitaires

function trace(s) {
	// que fait cette fonction ?
	window.console && console.log(s);
  // Équivalent à :
  /*
	if (window.console) {
	  console.log(s);
	}
	*/
}

function mkDebug() {
  // Cette fonction crée des fonctions debug
  // avec une fermeture transitive sur compteur
  
  // Cette variable est locale à mkDebug
  var compteur = 10;

  return function(s) {
	  // affiche un nombre de messages limité par un compteur
	  if (s === "RAZ") {
	    compteur = 10;
	  }
	  
	  if (compteur > 0) {
	    if (s === undefined) {
    	  trace(compteur);
	    } else {
	      trace(s);
      }
	    compteur--;
    }
  }
}

// On crée une fonction debug
var debug = mkDebug();

function getReference(refOrId) {
  // Retourne la référence d'un element dont la référence ou l'identifiant est fourni
	var ref;
	if (typeof refOrId === "object") {
	  ref = refOrId;
	} else if (typeof refOrId === "string" &&
	         document.getElementById(refOrId)) {
	    ref = document.getElementById(refOrId);
    }
  return ref;
}

function show(refOrId, display = "block") {
	// affiche l'élément dont la référence ou l'id est fourni
	// le paramètre display doit valoir block par défaut
	getReference(refOrId).style.display = display;
}

function hide(refOrId) {
	// cache l'élément dont la référence ou l'id est fourni
	show(refOrId, "none");
}

function html(refOrId, val) {
	// affecte une valeur à l'élément dont la référence ou l'id est fourni; si val n'est pas fourni, on renvoie son contenu
	if (val === undefined) {
	  return getReference(refOrId).innerHTML;
	} else {
	  getReference(refOrId).innerHTML = val;
	}
}

function val(refOrId, val) {
	// affecte une valeur à l'élément dont la référence ou l'id est fourni; si val n'est pas fourni, on renvoie son contenu
	// l'élément est un champ de formulaire
	// la fonction doit pouvoir manipuler l'état des champs de type checkbox et radio 
	var ref = getReference(refOrId);
	var monAttribut;
	
	if (ref.type === "checkbox" ||
	    ref.type === "radio") {
    monAttribut = "checked";
  } else {
    monAttribut = "value";
  };
  
  if (val === undefined) {
    return ref[monAttribut];
  } else {
    ref[monAttribut] = val;
  }
}
