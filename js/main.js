var currentArticle;
var score = 0;
var onionButton = document.getElementById('onion-button');
var notButton = document.getElementById('not-button');
var titleElement = document.getElementById('article-title');
var scoreElement = document.getElementById('score');
var loaderElement = document.getElementById('loader');
var number;

setNewTitle();	

onionButton.addEventListener('click', function() {
	if (number === 0) {
		swal({   
			title: "Good job!",   
			text: "You got it right! Check out the actual <a href=" + currentArticle.url + ">article</a>!",
			type: "success",   
			html: true 
		}, setNewTitle);
		score += 1;
		scoreElement.innerHTML = score;
	} else {
		swal({   
			title: "Nope.",   
			text: "Maybe next time. Check out the actual <a href=" + currentArticle.url + ">article</a>!",
			type: "error",   
			html: true 
		}, setNewTitle);
	}
}, false);

notButton.addEventListener('click', function() {
	if (number === 1) {
		swal({   
			title: "Good job!",   
			text: "You got it right! Check out the actual <a href=" + currentArticle.url + ">article</a>!",
			type: "success",   
			html: true 
		}, setNewTitle);
		score += 1;
		scoreElement.innerHTML = score;
	} else {
		swal({   
			title: "Nope.",   
			text: "Maybe next time. Check out the actual <a href=" + currentArticle.url + ">article</a>!",
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