var currentArticle;
var score = 0;
var onionButton = document.getElementById('onion-button');
var notButton = document.getElementById('not-button');
var titleElement = document.getElementById('article-title');
var scoreElement = document.getElementById('score');
var loaderElement = document.getElementById('loader');
var highscoreElement = document.getElementById('high-score');
var snackbarContainer = document.querySelector('#toast-container');
var lastArticleLink = document.getElementById('last-article');
var lastFiftyArticles = [];
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
		var data = {
			message: 'You got it right!',
			timeout: 1000
		};
		snackbarContainer.MaterialSnackbar.showSnackbar(data);
		lastArticleLink.href = currentArticle.url;
		setNewTitle();
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
		var data = {
			message: 'Nope, maybe next time.',
			timeout: 1000
		};
		snackbarContainer.MaterialSnackbar.showSnackbar(data);
		lastArticleLink.href = currentArticle.url;
		setNewTitle();
	}
}, false);

notButton.addEventListener('click', function() {
	if (number === 1) {
		var data = {
			message: 'You got it right!',
			timeout: 1000
		};
		snackbarContainer.MaterialSnackbar.showSnackbar(data);
		lastArticleLink.href = currentArticle.url;
		setNewTitle();
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
		var data = {
			message: 'Nope, maybe next time.',
			timeout: 1000
		};
		snackbarContainer.MaterialSnackbar.showSnackbar(data);
		lastArticleLink.href = currentArticle.url;
		setNewTitle();
	}
}, false);

function setNewTitle() {
	titleElement.style.display = "none";
	loaderElement.style.display = "block";
	number = Math.round(Math.random());
	if (number === 0) {
		reddit.random("theonion").fetch(function(res) {
		    currentArticle = res[0].data.children[0].data;
		    if (lastFiftyArticles.indexOf(currentArticle.title) > 0) {
		    	setNewTitle();
		    } else {
		    	titleElement.innerHTML = currentArticle.title;
			    if (lastFiftyArticles.length < 50) {
			    	lastFiftyArticles.push(currentArticle.title);
			    } else {
			    	lastFiftyArticles.shift();
			    	lastFiftyArticles.push(currentArticle.title);
			    }
			    titleElement.style.display = "block";
			    loaderElement.style.display = "none";
		    }
		});
	} else {
		reddit.random("nottheonion").fetch(function(res) {
		    currentArticle = res[0].data.children[0].data;
		    if (lastFiftyArticles.indexOf(currentArticle.title) > 0) {
		    	setNewTitle();
		    } else {
				titleElement.innerHTML = currentArticle.title;
			    if (lastFiftyArticles.length < 50) {
			    	lastFiftyArticles.push(currentArticle.title);
			    } else {
			    	lastFiftyArticles.shift();
			    	lastFiftyArticles.push(currentArticle.title);
			    }
			    titleElement.style.display = "block";
			    loaderElement.style.display = "none";
		    } 
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