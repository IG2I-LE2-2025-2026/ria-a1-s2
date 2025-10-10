// Fonction AJAX

var oDefaut = {
  type: 'GET',
  donnees: {},
  callback: function () {}
};

function enrichir(oDefault, oParams) {
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

// Effectue un appel AJAX
function ajax(urlOrOParams, oParams)
{
  var request = new XMLHttpRequest();
  var url, type, oDonnes, donnees, callback;
  
  // Distinguer les deux syntaxes (1 ou 2 arguments)
  if (typeof urlOrOParams === 'string') {
    url = urlOrOParams;
  } else {
    oParams = urlOrOParams;
    url = oParams.url;
  }
  
  // Ajout des paramètres facultatifs
  oParams = enrichir(oDefaut, oParams);
  
  // On revient aux paramètres « à l'ancienne »
  type = oParams.type;
  callback = oParams.callback;
  oDonnees = oParams.donnees;
  donnees = '';
  for (var prop in oDonnees) {
    donnees += '&' + prop + '=' + oDonnees[prop];
  }
  donnees = donnees.substring(1);
  
  function traiteReponse() {
	  if (request.readyState == 4) {
	      if (request.status == 200) {
			    var reponse = request.responseText;
			    // Appelle la fonction de callback
			    callback(reponse);
	      }
	  }
  } 

	if (type=='GET') 
	{
		request.open("GET", url+"?"+donnees, true);
		donnees=null;
	}
	else 
	{
		request.open("POST", url, true);
		request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	}

	request.onreadystatechange = traiteReponse;
	request.send(donnees);
}

