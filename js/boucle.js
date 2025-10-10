
var oDefault = {
	periode : 5, 
	fnTraitement : function(){console.log("traitement");}, 
	fnPoursuite: function(){return true;}
}

function enrichir(oDefault,oParams) {
	var res = {}; 
	var prop; 
	
	for (prop in oDefault) {
		if 		 ((oParams != undefined) 
				&& (oParams[prop] != undefined))
			res[prop] = oParams[prop]; 
		else
			res[prop] = oDefault[prop];
	}

	return res; 
}

function oBoucle(oConfig) {
	/*
	var oEffectif = oDefault; // ceci est une prise de référence ! 
	// On préfèrerait un clonage !! 
	// https://www.younup.fr/blog/le-clonage-des-objets-en-js
	// const newRobot = JSON.parse(JSON.stringify(complexRobot));
	// ne permet pas de traiter les fonctions 
	// JS6 assign : superficiel
	// Jquery : .clone() peut faire du deep clone 
	// clonage superficiel : on duplique la structure de l'objet 
	// on garde les valeurs de l'objet initial 
	// parmi ces valeurs, il peut y avoir des références qui persistent dans l'objet cloné 
	
	if (oConfig.periode != undefined) 
		oEffectif.periode = oConfig.periode; 
		
	if (oConfig.fnTraitement != undefined) 
		oEffectif.fnTraitement = oConfig.fnTraitement; 
		
	if (oConfig.fnPoursuite != undefined) 
		oEffectif.fnPoursuite = oConfig.fnPoursuite; 
	*/
	
	var oEffectif = enrichir(oDefault,oConfig);
	
	var foo = function () {
		if (oEffectif.fnPoursuite()) {
			oEffectif.fnTraitement();
			setTimeout(foo, oEffectif.periode*1000);
		}
	}; 
	foo();
}

