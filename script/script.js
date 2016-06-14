var x 				= 510;
var y 				= 510;
var bomb 			= 40;
var flagBomb		= 0;
var demining		= 0;
var gamePlay		= true;
var startPlay		= false;
var time 			= 0;

var earth = document.getElementById('earth');

function timerStart() {
    document.getElementById('timer').innerHTML = time + 's';
    ++time;
    timer = setTimeout("timerStart()", 1000);
}

function timerStop() {
    clearTimeout(timer);
}

function preparation() {
	flagBomb = 0;
	demining = 0;
	var side = 30;
	flag.innerHTML = flagBomb + " / " + bomb;
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
	timerStop();
	gamePlay = false;
	game.insertAdjacentHTML('afterbegin', '<div id="over">Game over!<span>click for continue</span></div>');
}

function win() {
	timerStop();
	gamePlay = false;
	game.insertAdjacentHTML('afterbegin', '<div id="over">We win!<span>Your record:'+time+'</span><span>click for continue</span></div>');
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

function clickGame(event) {
	if (!startPlay) {
		startPlay = true;
		timerStart();
	}
	if (!gamePlay) {
		gamePlay = true;
		startPlay = false;
		time = 0;
	    document.getElementById('timer').innerHTML = time + 's';
		var gameOver = document.getElementById('over');
		gameOver.parentNode.removeChild(gameOver);
		for(;0<game.childNodes.length;)
	        game.removeChild(game.childNodes[0]);
		preparation();
		return false;
	}
	if (event.target.classList.contains('bomb')) {
		event.target.classList.add('active');
		gameover();
	} else if (!event.target.hasAttribute('numb'))
		spaceField(event.target,parseInt(event.target.id),parseInt(event.target.id.replace(parseInt(event.target.id)+'_','')));
	if (event.target.classList.contains('flag')) {
		event.target.classList.toggle('flag');
		--flagBomb;
		flag.innerHTML = flagBomb + " / " + bomb;
	}
	event.target.classList.add('active');
}

function longTap(event) {
	event = event || window.event;
	event.preventDefault ? event.preventDefault() : event.returnValue = false;
	if (!event.target.classList.contains('active') && flagBomb < bomb) {
		event.target.classList.toggle('flag');
		if (event.target.classList.contains('flag')) {
			++flagBomb;
			if (event.target.classList.contains('bomb'))
				++demining;
		} else {
			--flagBomb;
			if (event.target.classList.contains('bomb'))
				--demining;
		}
	}
	flag.innerHTML = flagBomb + " / " + bomb;
	if (demining == bomb)
		win();
}

preparation();

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) { 
	game.addEventListener('tap',function(event) {
		event.preventDefault();
		clickGame(event);
	});
	game.addEventListener('longtap',function(event) {
		event.preventDefault();
		longTap(event);
	});
} else {
	game.onclick = function(event) {
		clickGame(event);
	}
	game.oncontextmenu = function(event) {
		longTap(event);
	}
	earth.onclick = function(event) {
		var el = document.getElementById('range');
		el.setAttribute('max', game.childNodes.length);
		el.onclick = function(event) {
			for(;0<game.childNodes.length;)
		        game.removeChild(game.childNodes[0]);
			preparation();
		}
		el.addEventListener("input", function() {
			bomb = el.value;
			flag.innerHTML = flagBomb + " / " + bomb;
		}, false);
		el.classList.toggle('active');
	}
}