var x 				= 510;
var y 				= 510;
var bomb 			= 40;

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

function gameover() {
	alert('Game over!');
}

function spaceField(el) {
	if (el != null && !el.classList.contains('active') && !el.hasAttribute('numb')) {
		el.classList.add('active');
		var iCur = parseInt(el.id);
		var jCur = parseInt(el.id.replace(iCur+'_',''));
		spaceField(document.getElementById((iCur+1)+'_'+jCur));
		spaceField(document.getElementById((iCur-1)+'_'+jCur));
		spaceField(document.getElementById(iCur+'_'+(jCur+1)));
		spaceField(document.getElementById(iCur+'_'+(jCur-1)));
		spaceField(document.getElementById((iCur+1)+'_'+(jCur+1)));
		spaceField(document.getElementById((iCur+1)+'_'+(jCur-1)));
		spaceField(document.getElementById((iCur-1)+'_'+(jCur+1)));
		spaceField(document.getElementById((iCur-1)+'_'+(jCur-1)));
	} else if (el != null && el.hasAttribute('numb')) {
		var iCur = parseInt(el.id);
		var jCur = parseInt(el.id.replace(iCur+'_',''));
		for (var iRow = iCur-1; iRow < iCur+2; ++iRow)
			for (var jColumn = jCur-1; jColumn < jCur+2; ++jColumn)
				el.classList.add('active');
	}
}

preparation();

game.onclick = function(event) {
	event = event || window.event;
	event.preventDefault ? event.preventDefault() : event.returnValue = false;
	if (event.target.classList.contains('bomb')) {
		event.target.classList.add('active');
		gameover();
	} else if (!event.target.hasAttribute('numb'))
		spaceField(event.target,parseInt(event.target.id),parseInt(event.target.id.replace(parseInt(event.target.id)+'_','')));
	event.target.classList.add('active');
}

game.oncontextmenu = function(event) {
	event = event || window.event;
	event.preventDefault ? event.preventDefault() : event.returnValue = false;
	if (!event.target.classList.contains('active'))
		event.target.classList.toggle('flag');
};