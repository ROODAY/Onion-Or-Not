var currentArticle;
var score = 0;
var onionButton = document.getElementById('onion-button');
var notButton = document.getElementById('not-button');
var titleElement = document.getElementById('article-title');
var scoreElement = document.getElementById('score');
var loaderElement = document.getElementById('loader');
var highscoreElement = document.getElementById('high-score');
var number;

if (storageAvailable('localStorage')) {
	var highscore = localStorage.getItem('onion-highscore');
	highscoreElement.style.display = "block";
	if (localStorage.getItem('onion-highscore')) {
		highscoreElement.innerHTML = "High Score: " + highscore;
	}
}

setNewTitle();	

onionButton.addEventListener('click', function() {
	if (number === 0) {
		swal({   
			title: "Good job!",   
			text: "You got it right! Check out the actual <a target='_blank' href=" + currentArticle.url + ">article</a>!",
			type: "success",   
			html: true 
		}, setNewTitle);
		score += 1;
		if (highscore !== undefined) {
			if (score > highscore) {
				highscore = score;
				localStorage.setItem('onion-highscore', highscore);
				highscoreElement.innerHTML = "High Score: " + highscore;
			}
		}	
		scoreElement.innerHTML = score;
	} else {
		swal({   
			title: "Nope.",   
			text: "Maybe next time. Check out the actual <a target='_blank' href=" + currentArticle.url + ">article</a>!",
			type: "error",   
			html: true 
		}, setNewTitle);
	}
}, false);

notButton.addEventListener('click', function() {
	if (number === 1) {
		swal({   
			title: "Good job!",   
			text: "You got it right! Check out the actual <a target='_blank' href=" + currentArticle.url + ">article</a>!",
			type: "success",   
			html: true 
		}, setNewTitle);
		score += 1;
		if (highscore !== undefined) {
			if (score > highscore) {
				highscore = score;
				localStorage.setItem('onion-highscore', highscore);
				highscoreElement.innerHTML = "High Score: " + highscore;
			}
		}
		scoreElement.innerHTML = score;
	} else {
		swal({   
			title: "Nope.",   
			text: "Maybe next time. Check out the actual <a target='_blank' href=" + currentArticle.url + ">article</a>!",
			type: "error",   
			html: true 
		}, setNewTitle);
	}
}, false);

function setNewTitle() {
	titleElement.style.display = "none";
	loaderElement.style.display = "block";
	number = Math.round(Math.random());
	if (number === 0) {
		reddit.random("theonion").fetch(function(res) {
		    currentArticle = res[0].data.children[0].data;
		    titleElement.innerHTML = currentArticle.title;
		    titleElement.style.display = "block";
		    loaderElement.style.display = "none";
		});
	} else {
		reddit.random("nottheonion").fetch(function(res) {
		    currentArticle = res[0].data.children[0].data;
		    titleElement.innerHTML = currentArticle.title;
		    titleElement.style.display = "block";
		    loaderElement.style.display = "none";
		});
	}
}

function storageAvailable(type) {
	try {
		var storage = window[type],
			x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	}
	catch(e) {
		return false;
	}
}