$(function() {

	var alph      = $('#textForTraining').text(),
			arr       = alph.split(''),
			start     = $('#start'),			  
			key       = $('#key'),
			tap	      = $('#tap'),
			killd     = $('#killd'),
			AllKilld  = $('#allkilld'),
			allKilld  = 0,
			Clicks    = $('#clicks'),
			win       = $('#win'),
			lose      = $('#lose'),			
			preText   = $('#preText'),
			bottonLine= $('#bottonLine'),
			bodyGame  = $('#bodyGame'),			
			clicks    = 0,
			timer;
	var keycode, keyChar;

	Start();
  $(start).click(function(event) {  	
  	Game();
  	Timer(); //запускаем таймер
  	allClicks(); // запускаем подсчет кликов
	 	$(this).fadeOut(); // прячем стартовую кнопку		 	
	 	$(preText).text(alph); // показываем набираемый текст
	 	$(bodyGame).fadeIn(); // показываем тело игры	

		document.onkeypress = function checkKeycode(event) { //при нажатии любой клавиши			
		  if(!event) var event = window.event;
		  if (event.keyCode) keycode = event.keyCode;
		  if(event.which) keycode = event.which;
			keyChar=String.fromCharCode(keycode);	
		  $(tap).text(keyChar); //записываем нажатую клавишу в id="tap"			
		} //document.onkeypress

	}); //Start

/* Functions for game
===============================*/	
  function Game() {

		var lapIn = setInterval(function() {		
			$(key).fadeIn().text(arr[0]).animate({marginTop:"+=600",opacity:"0"},5000);
			
			var pos = $(key).offset();
			var posEnd = $(bottonLine).offset();
			var a = pos.top;
			var b = posEnd.top - 30;		

			if (a > b) {
				$(key).stop(true, false).css({"marginTop":"0", "opacity":"1"}).text(arr[0]);
			 	arr.splice(0,1 );
			 	$(preText).text(arr);			 
			}

	  	if (key.text()==keyChar) {
  			arr.splice(0,1 );  			 			
  			$(preText).text(arr);
  			Killd();
  			InheritBGC ();
  			$(key).stop().css({"marginTop":"0", "opacity":"1"}).text(arr[0]);															  						
	  	}	  	  

	    if (arr == 0) {	     	      
	     	clearInterval(lapIn);     
	     	$(key).stop(true, true);	      
	     	$(win).fadeIn().click(function() {
	 				location.reload(); 	
	 			});
	 			Reload(); //перезагрузка на enter
 				$('#textForTraining').fadeIn();	
	    }

	  }, 1);  	

	} // end steperGame()

	function Start() { //запуск тернажера по нажатию Enter
		$(document).keydown(function (e) { // жмем и проверяем		
			if(e.which == 13){ //если нажат Enter
				$(start).click();	// имитируем нажатие на кнопку start			
			}			
		});
	}

	function allClicks() { //подсчитываем все клики по клавишам
		$(document).keydown(function (e) { //отслеживаем нажатие клавиш
			if (arr != 0 && e.which != 13 && e.which != 16 && e.which != 17 && e.which != 18) { //на эти клавиши реагировать не будем							
				clicks++;
				$(Clicks).text(clicks);
				fail();	

				$('body').css('background-color', 'red');
					setTimeout(function() {
	           $('body').css('background-color', 'rgba(0,0,0, .8)')
		        }, 200        
		      ); 
			}				
		});
	}

	function Killd() { 	//подсчитываем количество "убитых" клавишь 		
 		allKilld ++;
		$(AllKilld).text(allKilld);	//записываем в количество в id="allkilld"		 		
  } 	

  function arrEmpty() {
		if (arr == 0) {
			clearInterval(lapIn);     
	    $(key).stop(true, true);					
 			$(win).fadeIn().click(function() {
 				location.reload(); 	
 			});
 			Reload();
 			$('#textForTraining').fadeIn();
	 	}	 		
	}	

	function Reload() {
		$(document).keydown(function (e) {			
			if(e.which == 13){
				Reload()
				$(win).click();	
			}			
		});
	}

	function InheritBGC () {
		$('body').css('background-color', 'rgba(0,0,0, .8)');
			setTimeout(function() {
         $('body').css('background-color', 'rgba(0,0,0, .8)')
        }, 500        
      ); 
	}	

	function fail() {		
		var fail= clicks - allKilld;
		$('#fail').text(fail);
	}

	function Timer() { // Секундомер
	  var sec 			= 1,
	  		min 			= 1,
	  		timeSec   = $('#timeSec'),
				timeMin   = $('#timeMin');

	  var timer = setInterval(function() {
	  		$(start).off('click'); //при запуске секудомера отключает событие click у кнопки start
		    $(timeSec).text(sec)
		    if (arr == 0) clearInterval(timer);
		    if (sec == 59) { $(timeMin).text(min); min++; sec=-1; }
		    sec++;
		  }, 1000);
	}

});//load