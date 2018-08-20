$(function() {

	$('.btmMenu').click(function(event) {
		$('.menu').fadeToggle();
	});

	var result = $('.result');

	$('.result').click(function(event) {
		var mg = $('.mg').text();
		var v = $('.v').text();
		var vCefix = $('.vCefix').text(); //cefix
		var littleBut = $('.littleBut').text();		
		var bigBut = $('.bigBut').text();
		var verybigBut = $('.verybigBut').text();
		var weight = $('.weight').val();
		var mg_sut = $('.mg_sut');
		var biger40 = $('.biger40');
		var weith40 = $('.weith40');
		var bodyAntiBiot = $('.bodyAntiBiot');
		var res = weight * mg;	

		var ml24_1 =  (res * 5 / littleBut).toFixed(1);		
		var ml2 =  (ml24_1 / 2).toFixed(1);
		var ml3 =  (ml24_1 / 3).toFixed(1);

		var ml24_2 =  (res * 5 / bigBut).toFixed(1);
		var ml2_2 =  (ml24_2 / 2).toFixed(1);
		var ml3_2 =  (ml24_2 / 3).toFixed(1);

		var ml24_3 =  (res * 5 / verybigBut).toFixed(1);
		var ml2_3 =  (ml24_3 / 2).toFixed(1);
		var ml3_3 =  (ml24_3 / 3).toFixed(1);

		var flOnDayLittle = (v / ml24_1).toFixed(1);
		var flOnDayBig = (v / ml24_2).toFixed(1);
		var flOnDayVeryBig = (v / ml24_3).toFixed(1);				
		var FLVCefix = (vCefix / ml24_1).toFixed(1); 

		var littleFl = $('.littleFl');
		var bigFl = $('.bigFl');
		var verybigFl = $('.verybigFl');
		
		if (weight > 40) {
			bodyAntiBiot.fadeOut('fast');
			biger40.fadeIn('slow');
			result.text("Рассчитать");
		}else{

			biger40.fadeOut('fast');
			bodyAntiBiot.fadeIn('slow');
			result.text(res + "мг/сут");
			mg_sut.text(res + "мг/сут");

			
			$('.ml').html(ml24_1);
			$('.ml2').html(ml2);
			$('.ml3').html(ml3);
			$('.naSkolkoHvatitButulki').html(flOnDayLittle);
			littleFl.text(littleBut);	
		

			$('.ml_2').html(ml24_2);
			$('.ml2_2').html(ml2_2);
			$('.ml3_2').html(ml3_2);
			$('.naSkolkoHvatitButulki_2').html(flOnDayBig);
			bigFl.text(bigBut);

			
			$('.ml_3').html(ml24_3);
			$('.ml2_3').html(ml2_3);
			$('.ml3_3').html(ml3_3);
			$('.naSkolkoHvatitButulki_3').html(flOnDayVeryBig);
			verybigFl.text(verybigBut);

			$('.resFLVCefix').text(FLVCefix);	

		}
	});
	


});