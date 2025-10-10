

function trace(s) {
	// que fait cette fonction ?
	window.console && console.log(s);
	
	// lors de l'évaluation d'une condition 
	// utilisant un opérateur "ET" 
	// le code exécute la première instruction 
	// et SI elle est vraie, teste (donc exécute) la seconde 
	// MAIS PAS si elle est FAUSSE 
}

function debug(s) {
	// en C, on utiliserait une variable statique 
	// ca n'existe pas en JS 
	// => utilisation d'une closure "fermeture" au sens "enfermement" de l'accès à une variable depuis une fonction 
	// affiche le compteur si s n'est pas fourni
	// les opérateurs triples comparent les types sous-jacents (boolean n'est pas la même chose que int, null pas la même chose que undefined)
	if (s === undefined) {
		trace("compteur : " + compteur); 
		return;
	}
	
	// affiche un nombre de messages limité par un compteur
	
	if (++compteur<=maxCompteur) trace(s); 
	
	// e.g. après 5 affichages, la fonction ne fait plus rien 
	// comment remettre à 0 le compteur ?   
}

var debug2 = (function () {
	var compteur_interne2 = 0; 
	var max_interne2 = 5; 
	return function (s, raz) {
		if ( (raz != undefined) && (raz === true) ){
			compteur_interne2 = 0;
			return;
		}
		if (s === undefined) {
			trace("compteur : " + compteur_interne2); 
			return;
		}
		if (++compteur_interne2<=max_interne2) trace(s);   
	}
}) ();


// TODO : oDbg qui offre la fonctionnalité sous forme d'objet  
var oDbg = (function(max_interne){
	var compteur_interne = 0; 
	if (max_interne == undefined) max_interne=5; 
	return {
		trace : function(s){
			if (++compteur_interne<=max_interne) trace(s);
		}, 
		getCompteur : function(){return compteur_interne;}, 
		resetCompteur : function(){compteur_interne=0}, 
		getMax : function(){return max_interne}, 
		setMax : function(m){max_interne=m;}, 
	}; 
})(5); 


function show(refOrId,display) {
	// affiche l'élément dont la référence ou l'id est fourni
	// le paramètre display doit valoir block par défaut
	if (typeof refOrId == "string") 
		refOrId = document.getElementById(refOrId);
		
	if (display == undefined) display = "block";
	
	refOrId.style.display = display; 
}

function hide(refOrId) {
	// cache l'élément dont la référence ou l'id est fourni
	show(refOrId,"none");
}

function html(refOrId, val) {
	// affecte une valeur à l'élément dont la référence ou l'id est fourni; si val n'est pas fourni, on renvoie son contenu
	if (typeof refOrId == "string") 
		refOrId = document.getElementById(refOrId);
		
	if (val != undefined) refOrId.innerHTML = val;
	else return refOrId.innerHTML; 
}

function val(refOrId, val) {
	// affecte une valeur à l'élément dont la référence ou l'id est fourni; si val n'est pas fourni, on renvoie son contenu
	// l'élément est un champ de formulaire
	// la fonction doit pouvoir manipuler l'état des champs de type checkbox et radio 
	
	if (typeof refOrId == "string") 
		refOrId = document.getElementById(refOrId);
		
	if	(
						(refOrId.type == "checkbox")
				|| 	(refOrId.type == "radio")
			)
	{
		if (val != undefined) refOrId.checked = val;
		else return refOrId.checked; 
	}
	else {
		if (val != undefined) refOrId.value = val;
		else return refOrId.value; 
	}
}

