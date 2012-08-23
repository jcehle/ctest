var DebugObj = function()
{
	this.winWidth = 0;
	this.winHeight = 0;
	this.vidHeight = 0;
}

var debugObj = new DebugObj();
var gui = new dat.GUI();
var model = {};

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
	
	var videoFile = "";
	
	switch (vidId)
	{
		case 0: //CHANGE SRC
		videoFile = "http://localhost/vids/coolmore/dte/Vet Hospital_1.mp4";
		console.log('change source ' + videoFile);
		break;
		
		case 1: //fade In
		videoFile = "http://localhost/vids/coolmore/dte/salmon.mp4";
		console.log('change source vid ' + videoFile);
		break;
		
		default:
		videoFile = "http://localhost/vids/coolmore/dte/space_1.mp4";
		console.log('change src vid3 ' + videoFile);
		break;
	}
	
	$('#contentVideo source').attr('src', videoFile);
	$('#contentVideo')[0].load();
	$('#contentVideo')[0].play();
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

function onFadeOut(e) {
	console.log("REMOVE LISTERS! out.");
};

function onFadeIn(e) {
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