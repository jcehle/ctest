var DebugObj = function()
{
	this.winWidth = 0;
	this.winHeight = 0;
	this.vidHeight = 0;
}

var debugObj = new DebugObj();
var gui = new dat.GUI();
var model = {};
var queuedVidVO = {};

$(document).ready(function() {
	gui.add(debugObj, 'winWidth').listen();
	gui.add(debugObj, 'winHeight').listen();
	initVideos();
	updateGUI();
	loadModelData();
});

$(window).load(function() {
	positionShadow();
});

$(window).resize(function() {
	positionShadow();
	updateGUI();
});

function loadModelData() {
	console.log('load some data()');
	$.getJSON('model/movies.json', function(data){
		model = data;
		console.log( model.movies.cm01 );
//		model = $.
	});
}

function onModelDataLoaded(data) {
	console.log('model loaded: 	' + data);
}

function updateGUI() {
	debugObj.winWidth = $(window).width();
	debugObj.winHeight = $(window).height();
};

function initVideos(){
	console.log("adding video listeners.");
	
	/*
	 *	BG Video
	 */
	var bgVid = $('#bgVideo');
	
	bgVid.on('playing', function(e){
		console.log("bg playing: ");
	});

	bgVid.on('ended', function(e){
		console.log('bg vid ended');
		fadeContentVidIn();
	});

	bgVid.on('timeupdate', function(e){
		//console.log('upate time.');
	});
	bgVid[0].play();
	
	
	/*
	 * Content Video
	 */
	var contentVid = $('#contentVideo');
	
	contentVid.on('ended', function(e){
		console.log('VIDEO ENDED');
	});
	
	contentVid.on('playing', function(e){
		positionShadow();
	});
	
	contentVid[0].play();
};

function changeVideo(vidId) {
	var contentVid = $('#contentVideo');
	var shadow = $('#contentVideoShadow');
	var bgVid = $('#bgVideo');
		
	var contentVidFile, bgVidFile;
	
	//fade everything out
	TweenMax.to($('#contentVideo'), 1.5, {css:{opacity:0}, onComplete:onFadeOut, ease:Power3.easeOut});
	TweenMax.to($('#contentVideoShadow'), 1.5, {css:{opacity:0}, ease:Power3.easeOut});
	TweenMax.to($('#bgVideo'), 1.5, {css:{opacity:0}, ease:Power3.easeOut});
	
	switch (vidId)
	{
		case 0: //CHANGE SRC
			if(model.movies.cm01) {
				queuedVidVO = model.movies.cm01;
				console.log(model.movies.cm01);
			};
		break;
		
		case 1: 
		if(model.movies.cm02) {
			queuedVidVO = model.movies.cm02;
			console.log(model.movies.cm02);
		};
		break;
		
		default:
		if(model.movies.cm03) {
			queuedVidVO = model.movies.cm03;
			console.log(model.movies.cm03);
		};
		break;
	}
};

function fadeOut( element, callback ) {
	if(!element.hasClass('fadeOut')) {
		if(callback) {
			console.log('im adding listener...');
			element.on('webkitTransitionEnd', callback);
		}
		element.removeClass('fadeIn').addClass('fadeOut');
	}
};

function fadeIn( element, callback) {
	if(!element.hasClass('fadeIn')) {
		if(callback) {
			console.log('im adding listener...');
			element.on('webkitTransitionEnd', callback);
		}
		element.removeClass('fadeOut').addClass('fadeIn');
	}
};

function onFadeOut() {
	console.log("ON fade out");
	console.log(queuedVidVO.contentVid);
	
	$('#contentVideo source').attr('src', queuedVidVO.contentVid);
	$('#bgVideo source').attr('src', queuedVidVO.bgVid);	

	$('#contentVideo')[0].load();
	$('#bgVideo')[0].load();

	$('#bgVideo')[0].play();

	TweenMax.to($('#bgVideo'), 1.5, {css:{opacity:1}, ease:Power3.easeOut});	
};

function fadeContentVidIn() {
	$('#contentVideo')[0].play();
	TweenMax.to($('#contentVideo'), 1.5, {css:{opacity:1}, ease:Power3.easeOut});
	TweenMax.to($('#contentVideoShadow'), 1.5, {css:{opacity:1}, ease:Power3.easeOut});
}

function onFadeIn(e) {
	console.log("on fade in");
};

function somethingFaded(e) {
	console.log(e.currentTarget + " completed animating");
};

function positionShadow(){
	var vid = $('#contentVideo');
	var pos = vid.position();
	$('#contentVideoShadow').css({
		position: "absolute", top: vid.height() + "px"
	});
};

function inspect(obj){
	for (var key in obj){
		console.log(key + " -> " + obj[key]);
	}
};