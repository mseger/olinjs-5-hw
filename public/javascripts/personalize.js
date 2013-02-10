$(function (){
	$('#color_personalize').on('submit', function(){
		$.css('background-color', $('#color_personalize'.serialize()));
		$.post("/personalize/color", $('#color_personalize'.serialize()));
		return false;
	})

	#('#quotes_personalize').on('submit', function(){
		$.post("/personalize/quotes", $('#quotes_personalize'.serialize()));
		$(this).remove();
		$(this).children.find("submit").attr('value','Add Quotes to Wall');
		return false;
	})

	#('#quotes_personalize_add').on('submit', function(){
		$.post("/personalize/quotes/add", $('#quotes_personalize_add'.serialize()));
		return false;
	})
})