var x 				= 510;
var y 				= 510;
var bomb 			= 40;
var colorSide 		= "#000";



var game 	= document.getElementById('game');


function preparation() {
	var side = 30;
    for (var i = 0; i < x; i += side)
        for (var j = 0; j < y; j += side)
        	game.insertAdjacentHTML('beforeend', '<div id="'+i/side+'_'+j/side+'" style="left:'+j+'px;top:'+i+'px;"></div>');

	for (var i = 0; i < bomb; ++i, document.getElementById(iCur + '_' + jCur).classList.add('bomb')) {
		for (var iCur = Math.floor(Math.random()*x/side,1),jCur = Math.floor(Math.random()*y/side,1); document.getElementById(iCur + '_' + jCur).classList.contains('bomb');iCur = Math.floor(Math.random()*x/side,1), jCur = Math.floor(Math.random()*y/side,1));
		for (var iRow = iCur-1; iRow < iCur+2; ++iRow) {
			for (var jColumn = jCur-1; jColumn < jCur+2; ++jColumn) {
				var el = document.getElementById(iRow + '_' + jColumn);
				if (el != null && el.hasAttribute('numb')) {
					var buf = el.getAttribute('numb');
					el.setAttribute('numb', ++buf);
				} else if (el != null) {
					el.setAttribute('numb',1);
				}
			}

		}
	}
	for (var i = 0, arrayBomb = document.getElementsByClassName('bomb'); i < bomb; ++i)
		arrayBomb[i].removeAttribute('numb');
}

preparation();




