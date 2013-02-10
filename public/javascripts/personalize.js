$(function (){
	$('#color_personalize').on('submit', function(){
		$.css('background-color', $('#color_personalize'.serialize()));
		$.post("/personalize/color", $('#color_personalize'.serialize()));
		return false;
	})

	#('#quotes_personalize').on('submit', function(){
		console.log("we're here");
		$.post("/personalize/quotes", $('#quotes_personalize'.serialize()));
		$(this).remove();
		$(this).children.find("submit").attr('value','Add Quotes to Wall');
		return false;
	})
})