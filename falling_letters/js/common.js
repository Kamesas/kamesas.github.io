$(function() {
	
	$('button').click(function() {
		$('#myMenu > ul').slideToggle();
	});

	// $('#myMenu li').click(function() {
	// 	//$('#myMenu ul li').children('ul').slideToggle()
	// 	$(this).children("ul").slideToggle()
	// });
	
	$('#myMenu > ul > li:has(ul)').click(function() {		
		$(this).children("ul").slideToggle();		
	});


});