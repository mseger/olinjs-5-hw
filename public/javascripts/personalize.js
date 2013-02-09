$(function (){
	$('#color_personalize').on('submit', function(){
		$.css('background-color', $('#color_personalize'.serialize()));
		$.post("/personalize/color", $('#color_personalize'.serialize()));
		return false;
	})
})