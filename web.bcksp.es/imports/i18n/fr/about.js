/*----------------------------------------*\
  bcksp.es - about.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-03-02 17:28:49
  @Last Modified time: 2020-02-25 14:38:57
\*----------------------------------------*/

i18n.addTranslation('fr', "about", {
				//"The deletion <br/>archivist manifesto",
	title : 	"manifest<br/>de l'archiviste <br/>des ratures",
	short : 	"<p>"+
					"Les outils numériques ont fait émerger dans la pratique de l'écriture "+
					"de multiples erreurs, hésitations, reformulations et corrections. "+
					"Celles-çi, bien que plus nombreuses qu'à l'époque de la plume, "+
					"se font plus discrète. Des écrans, rien ne dépasse, "+
					"ils semblent lisse et sans sueur."+
				"</p>"+
				"<p>"+
					"<ul>"+
						"<li>"+
							"Bcksp.es tire son nom de la touche «Backspace» du clavier informatique. "+
							"Celle-ci est située au-dessus de la touche «Enter». Elle est utilisée "+
							"pour effacer les derniers caractères saisis, ceux situés à gauche "+
							"du curseur d’écriture."+
						"</li>"+
						"<li>"+
							"Bcksp.es archive les mots que vous supprimez en appuyant sur la touche «Backspace»."+
						"</li>"+
						"<li>"+
							"Bcksp.es vous propose de <a href='{$souvenir}'>matérialiser vos ratures</a>."+
						"</li>"+
						"<li>"+
							"Bcksp.es organise votre archive dans l'ordre dans laquelle elle s'écrit, <a href='{$editor}'>erreur après erreur</a>."+
						"</li>"+
						"<li>"+
							"Bcksp.es considére <a href='{$privacy}'>ses utilisateurs comme auteurs</a>."+
						"</li>"+
						"<li>"+
							"Bcksp.es <a href='{$security}'>chiffre vos données</a> sur toute la ligne."+
						"</li>"+
						"<li>"+
							"Bcksp.es est une porte vers un espace intérieur où l'erreur et le doute "+
							"sont vêtu des aprêts d'une poésie brutaliste <a href='{$about}'>non moins dénuée de sens</a>."+
						"</li>"+
						"<li>"+
							"Vous voulez <a href=\"{$about}\">en savoir plus</a>."+
						"</li>"+
					"</ul>"+
				"</p>",
	long : [
		{
			title:{
				value : "",
				id : "intro"
			},
			content : [{
				text:	"<p>"+
							"Jusque l'invention des caratères typographiques mobiles "+
							"et du clavier, l'écriture était exclusivement une activité de dessin. "+
							"Au travers de cette technique passait quelque chose de plus que les conceptes "+
							"véhiculés par le vocabulaire et la grammaire. Les outils numériques ont été pensé, "+
							"comme si la théorie de l'information de Claude Shannon était capable de décrire "+
							"la communication écrite entre humain. Il s'agit d'une erreur, "+
							"nous nous sommes fait déposséder d'une certaine subtilité. "+
						"</p>"+
						"<p>"+
							"Nous avons perdu la capacité et le droit d'imaginer ce que l'autre/auteur voulait "+
							"nous dire avant de se rétracter en gommant, en barrant, en recouvrant, en arrachant "+
							"ce mystérieux mot. Nous n'avons plus la liberté d'entrer dans son esprit pour "+
							"y découvrir ce mot masqué, avec plus ou moins d'adresse"+
						"</p>"+
						"<p>"+
							"Pire, ces objets techniques ont fait émerger dans la pratique de l'écriture "+
							"de multiples erreurs, hésitations, reformulations et corrections. "+
							"Celles-çi, bien que plus nombreuses qu'à l'époque de la plume, "+
							"se sont faites radicalement plus discrète. Face aux écrans, "+
							"rien ne dépasse, la performance est sans accroche, lisse et sans sueur. "+
							"Mais lorsqu'il s'agit de rédiger sur un clavier le doute, les cocquilles et l'auto-sensure "+
							"dirigent nos doigts sans tarder vers cette fameuse touche «Backspace»."+
						"</p>"+
						"<p>"+
							"Ici, nous mettons en lumière une part devenue intime et obscure de notre humanité. "+
							"L'archivage et la lecture de nos ratures offre un point de vue singulier "+ 
							"sur la mécanique cérébrale travaillant pour former la communication écrite. "+
						"</p>"
			}],
		}, {
			title:{
				value : "une maison d'édition",
				id : "edition"
			},
			content : [{
				text: 	"Bcksp.es est concu pour être un dispositif "+
						"d'édition de livres intimes. Le contenu de ces livres "+
						"est constitué du texte que vous supprimez durant "+
						"vos navigations dans les espaces numériques. Votre archive compile "+
						"dans l'ordre d'arrivée chaque caratères que vous supprimez "+
						"en appuyant sur la touche backspace."
			},{
				text: 	"Bcksp.es vous considére comme auteur et donc "+
						"en tant que maison d'édition notre rôle est de vous publier dans les limites de votre volonté. "+
						"Vous restez propriétaire de vos suppressions. Bcksp.es vous offre de ce fait les outils "+
						"de collecte, de suppression, de publication et de partage de vos ratures."
			},{
				subtitle:"votre archive",
				text :  "La constitution de votre archive est un processus lent, "+
						"durant lequel votre relation à l'écriture et particulièrement "+
						"à la touche backspace de votre clavier évoluera. "+
						"À certain moment méfiant, vous développerez des astuces "+
						"pour supprimer vos mots sans qu'ils ne soient capturé. "+
						"À d'autre vous serez confiant et ne penserez plus à nous. "+
						"C'est alors que les parties les plus belles et sensibles "+
						"de votre archive se constitueront."
			},{
				text :  "La taille maximum de votre archive est de {$bookMaxChar} charactères "+
						"ce qui est nécéssaire pour la production d'un livre de {$bookMaxPage} pages "+
						"au format poche. Lorsque votre archive atteint cette quantitée "+
						"Le processus d'impression à la demande s'active sur la page «souvenir». "+
						"Nous vous tiendrons informé de cet événement par un eMail. "+
						"Vous avez alors la possibilité de commander l'impression de votre livre. "
			}],
		}, {
			title:{
				value : "vie privée",
				id : "privacy"
			},
			content : [{
				text : 	"Nous vous garrantissons que dans notre projet, vous n'êtes pas "+
						"le produit. Aucun profilage n'a cours sur nos serveurs. "+
						"Nous avons la certitude que les paradigmes qui font "+
						"vivre les gros du web sont inéquitable et donc périmé."
			},{
				text :  "L'archivage de vos suppression est un processus dévoilant des questions sensibles "+
						"relatives au «Big Data» et à la protection des données. "+
						"Nous ne prétendons pas apporter de solutions à ces questions. "+
						"Tout du moins, «Bcksp.es» propose de prendre un point de vue "+
						"sur un de vos flux de données privées. Cela afin de montrer, de rendre sensible "+
						"donc pensable ce monstre informe mal perçue, angoissant ou simplement ignorée."
			}]
		}, { 
			title : {
				value : "sécurité",
				id : "security"
			},
			content : [{
				text : 	"Nous garantissons que tout est fait "+
						"pour sécurisé vos données de manière optimal. "+
						"Tous les algorithmes nécéssaire à la capture, "+
						"au transfert et au stockage de vos données sont Open Source. "+
						"De ce fait, nos activité sont donc potentiellement soumis "+
						"à un audit permanant de toutes personnes désireuses de s'assurer "+
						"de notre sérieux. Si une faille devait être signalée, "+
						"soyez certains qu'elle sera corrigée dans les plus brefs délais."
			},{
				subtitle:"chiffrement sur toute la ligne",
				text :  "<ul>"+
							"<li>"+
								"Toutes les données gérée par bcksp.es sont transférées de façon chiffré "+
								"via les protocols HTTPS et WSS. Notre certificat SSL est produit par "+
								"<a href='https://letsencrypt.org/fr/' target=\"_blank\">Let's Encryp</a> et "+
								"est renouvelé tous les 3 mois."+
							"</li>"+
							"<li>"+
								"Sur nos serveurs, les archives sont chiffrées par l'implémentation de l'algorithme "+
								"<a target=\"_blank\" href=\"https://en.wikipedia.org/wiki/Advanced_Encryption_Standard\">AES</a>, "+
								"de la librairie <a target=\"_blank\" href=\"https://www.npmjs.com/package/crypto-js\">CryptoJS</a>. "+
								"De plus, chaque archive est sécurisée par une clef unique."+
							"</li>"+
							"<li>"+
								"Avez-vous réfléchit aux conditions de conservation de votre livre d'archive à votre domicile?"+
							"</li>"+
						"</ul>"
			}],
		}, {
			title:{
				value : "droit d'auteur",
				id : "licence"
			},
			content : [{
				text: 	"Les données que vous sotockez sur nos serveur sont votre propriété. "+
						"Vous avez la possibilité de consulter et de <a href=\"{$download}\">télécharger vos données</a> "+
						"sans frais et dans la forme que nous possédons. "+
						"Vous avez aussi à tout moment la possibilité de <a href='{$deletion}'>supprimer partiellement ou entièrement</a> "+
						"toute donnée vous appartenant et étant présente sur nos serveurs. "+
						"Néanmoins, vous cédez à «bcksp.es» le droit d'imprimer "+
						"votre archive suivant le protocol décrit dans la section <a href='{$money}'>financement</a>."
			},{
				subtitle:"Licence",
				text: 	"Le <a target=\"_blank\" href=\"https://github.com/oogre/bcksp.es\">code source</a> de l'application web et des extensions est sous licence «creative commons» <a href=\"https://creativecommons.org/licenses/by-sa/4.0/\" rel=\"nofollow\"><img src=\"https://camo.githubusercontent.com/6dcc300ab83c479af6c1c1f004b6f9dad77e7736/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c6963656e73652d434325323042592d2d5341253230342e302d6c69676874677265792e737667\" alt=\"License: CC BY-SA 4.0\" data-canonical-src=\"https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg\" style=\"max-width:100%;\"></a>. "+
						"Cela signifie que vous êtes autorisé à <strong>partager</strong> — copier, distribuer et communiquer le code source par tous moyens et sous tous formats. "+
						"Vous pouvez également <strong>adapter</strong> — remixer, transformer et créer à partir du code source pour toute utilisation, y compris commerciale. "+
						"Bcksp.es ne peut retirer les autorisations concédées par la licence tant que vous appliquez les termes de cette licence. "+
						"Selon les conditions suivantes : "+
						"<ul>"+
							"<li>"+
								"<strong>Attribution</strong> — Vous devez créditer bcksp.es, intégrer un lien vers la licence "+
								"et indiquer si des modifications ont été effectuées à bcksp.es. Vous devez indiquer ces informations "+
								"par tous les moyens raisonnables, sans toutefois suggérer que l'Offrant vous soutient ou soutient la "+
								"façon dont vous avez utilisé son œuvre."+
							"</li>"+
							"<li>"+
								"<strong>Partage dans les mêmes conditions</strong> — Dans le cas où vous effectuez un remix, "+
								"que vous transformez, ou créez à partir du matériel composant l'œuvre originale, "+
								"vous devez diffuser l'œuvre modifiée dans les même conditions, "+
								"c'est à dire avec la même licence avec laquelle l'œuvre originale a été diffusée."+
							"</li>"+
							"<li>"+
								"<strong>Pas de restrictions complémentaires</strong> — Vous n'êtes pas autorisé à "+
								"appliquer des conditions légales ou des mesures techniques qui restreindraient "+
								"légalement autrui à utiliser l'œuvre dans les conditions décrites par la licence."+
							"</li>"+
						"</ul>"
			}]
		}, {
			title:{
				value : "Supprimer vos supressions",
				id : "deletion"
			},
			content : [{
				subtitle:"partiellement",
				text: 	""
			},{
				subtitle:"entièrement",
				text: 	""
			}]
		}, {
			title:{
				value : "financement",
				id : "money"
			},
			content : [{
				text: 	"La capture et l'archivage de vos textes supprimés sont gratuite. "+
						"Le montant qui vous est demandé dans <a href='{$souvenir}'>la boutique souvenir</a> "+
						"correspond au budget nécéssaire pour la production de deux exemplaires, "+
						"une pour vous (numéroté 1/2), une pour nous (numéroté 2/2). Les frais relatif à l'envoi "+
						"sont égallement à votre charge."
			},{
				subtitle:"exemplaire n°1/2",
				text :  "Bcksp.es abandonne tout droit de paternité sur l'exemplaire en votre possession n°1/2."
			},{
				subtitle:"exemplaire n°2/2",
				text :  "Nous avons pour ambition d'exposer comme objet d'art l'exemplaire en notre possession n°2/2. "+
						"Au moment de la commande, vous avez l'oportunité "+
						"de faire jouer vos droit de paternité sur cet l'exemplaire. "+
						"Cela en réclamant que celui-ci ne puise qu'être vu, "+
						"ou qu'il puisse être lu, ou qu'il soit détruit, tout cela dans un context d'exposition. "+
						"Cet exemplaire n°2/2 à la condition que vous n'ayez pas réclamé sa destruction, "+
						"aura le potentiel d'être acheté pour ses valeurs intrinsèques. Dans ce cas, vous serez convié "+
						"à participer à une négociation sur ses conditions de vente et de conservation. Vous jouirez "+
						"en tant que co-auteur d'une partie -à définir ensemble- des bénéfices engendré."
			},{
				subtitle:"exposition",
				text :  "Notre projet bcksp.es ne génère de bénéfice qu'au travers de la transformation "+
						"de votre archive en objet d'art. Nous sommes donc financé par les invitations "+
						"à exposer ce projets, ainsi que par la ventes des exemplaires n°2/2."
			},{
				subtitle:"subsides et donations",
				text :  "De plus bcksp.es est financé également au travers de dont ou de subsides. "+
						"Nous avons d'ores et déjà bénéficié d'un subside de 3.000€ via la Commision "+
						"des Arts Numériques de la Fédération Wallonie-Bruxelles."
				}
			],
		}
	]
});