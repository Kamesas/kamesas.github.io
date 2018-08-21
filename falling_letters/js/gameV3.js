$(function() {

	var alph      		= $('#textForTraining').text(),
			arr       		= alph.split(''),
			speed     		= 10000,			
			speedRever		= 0,			
			start     		= $('#start'),
			startOverley	= $('#startOverley')			  
			key       		= $('#key'),
			tap	      		= $('#tap'),
			killd     		= $('#killd'),
			AllKilld  		= $('#allkilld'),
			allKilld  		= 0,
			Clicks    		= $('#clicks'),
			win       		= $('#win'),
			lose      		= $('#lose'),			
			preText   		= $('#preText'),
			bottonLine		= $('#bottonLine'),
			bodyGame  		= $('#bodyGame'),			
			clicks    		= 0,
			timer;
	var keycode, keyChar;

	/* lenguige
	==========================*/
	$('#textRu').click(function() {
		alph = $('#textForTraining').text()
		arr  = alph.split('');
		$('#textRu').css('color', 'red');
		$('#textEn, #textUA').css('color', '#fff');
	});

	$('#textEn').click(function() {
		alph = $('#textForTraining2').text();
		arr  = alph.split('');
		$('#textEn').css('color', 'red');
		$('#textRu, #textUA').css('color', '#fff');
	});

	$('#textUA').click(function() {
		alph = $('#textForTraining3').text();
		arr  = alph.split('');
		$('#textUA').css('color', 'red');
		$('#textEn, #textRU').css('color', '#fff');
	});

/* Start game
============================================*/
	Start();	
  $(start).click(function(event) {
  	soundClickSpeed(); 
  	$(startOverley).css('display', 'none'); // прячем установку скорости
  	$(this).fadeOut(); // прячем стартовую кнопку	
  	allClicks(); // запускаем подсчет кликов 			 
  	Game();
  	$('#timer').fadeIn();
  	Timer(); //запускаем таймер	 	 	
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
		var i = 1;		
		var lapIn = setInterval(function() {

			$(key).fadeIn().text(arr[0]).animate({marginTop:"+=800", marginLeft:400},speed);
			$(key).fadeIn().text(arr[0]).animate({marginTop:"+=800", marginLeft: 0},speed);
			$(key).fadeIn().text(arr[0]).animate({marginTop:"+=800", marginLeft: 200},speed);
		
			var pos = $(key).offset();
			var posEnd = $(bottonLine).offset();
			var a = pos.top;
			var b = posEnd.top;	

			if (a > b) {
				soundClickFail();
				$(key).stop(true, false).css({"marginTop":"0", "marginLeft":"50%"}).text(arr[0]);
			 	arr.splice(0,1 );
			 	$(preText).text(alph.slice(i));
			 	i++; 	 
			}

	  	if (key.text()==keyChar) {
	  		soundClick();	  		
  			arr.splice(0,1 );  			 			
  			$(preText).text(alph.slice(i)); 
  			Killd();
  			//InheritBGC (); // изминение фона при несоответствующем клике
  			$(key).stop().css({"marginTop":"0", "marginLeft":"50%"}).text(arr[0]);
  			i++;
	  	}	

	    if (arr == 0) {	     	      
	     	clearInterval(lapIn);     
	     	$(key).stop(true, true).fadeOut();      
	     	$('#tapP, #keyP').fadeOut();      
	     	$(win).fadeIn().click(function() {
	 				location.reload(); 	
	 			});
	 			Reload(); //перезагрузка на enter
	 			fail();
 				$('#textForTraining, #resultGame').fadeIn();	
	    }

	  }, 1); 

	} // end Game()	

	function allClicks() { //подсчитываем все клики по клавишам		
		$(document).keydown(function (e) { //отслеживаем нажатие клавиш			
			if (arr != 0 && e.which != 13 && e.which != 16 && e.which != 17 && e.which != 18) { //на эти клавиши реагировать не будем				
				clicks++;				
				$(Clicks).text(clicks);					

				// $('body').css('background-color', 'red');
				// 	setTimeout(function() {
	   //         $('body').css('background-color', 'rgba(0,0,0, .8)')
		  //       }, 200        
		  //     ); 
			}										
		});
	}

	function fail() {		
		var fail= clicks - allKilld;
		$('#fail').text(fail);
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

	function Timer() { // Секундомер
	  var sec 			= 1,
	  		min 			= 1,
	  		timeSec   = $('#timeSec'),
				timeMin   = $('#timeMin');

	  var timer = setInterval(function() {
	  		$(start).off('click'); //при запуске секудомера отключает событие click у кнопки start
		    $(timeSec).text(sec)
		    if (arr == 0) clearInterval(timer);
		    if (sec == 60) { $(timeMin).text(min); min++; sec=0; }
		    sec++;
		  }, 1000);
	}

	function Start() { //запуск тернажера по нажатию Enter
		$(document).keydown(function (e) { // жмем и проверяем		
			if(e.which == 13){ //если нажат Enter
				$(start).click();	// имитируем нажатие на кнопку start			
			}			
		});
	};

	/* SpeedGame
	====================================*/
	$('#numSpeed').text(speedRever);	

	$('#speedPlus').click(function(e) {	
		soundClickSpeed();	
		speed-=1000;
		speedRever++;
			if (speedRever==10){
				speed = 500; speedRever = 10;					
		  };
		  if (speedRever==11){
				speed = 10000; speedRever = 0;							
		  };
		$('#numSpeed').text(speedRever);
	}); // end SpeedGame

	$('#speedMinus').click(function(e) {	
		soundClickSpeed();		
		speed+=1000;
		speedRever--;
			if (speedRever==-1){
				speed = 500; speedRever = 10;					
		  };
		  if (speedRever==11){
				speed = 10000; speedRever = 0;							
		  };
		$('#numSpeed').text(speedRever);
		console.log(speed)
	}); // end SpeedGame	

	/* Звук 
	====================================*/
	var sound = true;

	$('#sound_btn').click(function() {
		if (sound) {			
			sound = false;
			$(this).html('<i class="fa fa-volume-off" aria-hidden="true"></i>').css('color', 'rgba(243, 243, 243, 0.5)');		
		} else {
			sound = true;
			$(this).html('<i class="fa fa-volume-up" aria-hidden="true"></i>').css('color', '#fff');
		}	
	});

	function soundClick() {
		if(!sound) return false;
	  var audio = new Audio(); // Создаём новый элемент Audio
	  audio.src = '../img/BUTTON1.WAV'; // Указываем путь к звуку "клика"
	  audio.autoplay = true; // Автоматически запускаем
	}
	function soundClickFail() {
		if(!sound) return false;
	  var audio = new Audio(); // Создаём новый элемент Audio
	  audio.src = '../img/bricksfall.wav'; // Указываем путь к звуку "клика"
	  audio.autoplay = true; // Автоматически запускаем
	}	
	function soundClickSpeed() {
		if(!sound) return false;
	  var audio = new Audio(); // Создаём новый элемент Audio
	  audio.src = '../img/click.wav'; // Указываем путь к звуку "клика"
	  audio.autoplay = true; // Автоматически запускаем
	}	
/*==============================================*/

/* полноэкранный режим
	======================================*/
	$('#fullWindow').click(function () {     
			toggleFullScreen();
	});

	// toggle full screen https://htmlhook.ru/html5-fullscreen.html
	function toggleFullScreen() {
		
		if (!document.fullscreenElement && // alternative standard method
		!document.mozFullScreenElement && !document.webkitFullscreenElement) { // current working methods
		if (document.documentElement.requestFullscreen) {
		document.documentElement.requestFullscreen();
		} else if (document.documentElement.mozRequestFullScreen) {
		document.documentElement.mozRequestFullScreen();
		} else if (document.documentElement.webkitRequestFullscreen) {
		document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
		}
		} else {
		if (document.cancelFullScreen) {
		document.cancelFullScreen();
		} else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
		} else if (document.webkitCancelFullScreen) {
		document.webkitCancelFullScreen();
		}
		}

	}

});//load

// function InheritBGC () {
	// 	$('body').css('background-color', 'rgba(0,0,0, .8)');
	// 		setTimeout(function() {
 //         $('body').css('background-color', 'rgba(0,0,0, .8)')
 //        }, 200        
 //      ); 
	// }	

// 	$('html').click(function(e) {  //убиваем на клик мышкой
		// 		e.preventDefault();
		// 	  var offset = $(this).offset();
		// 	  var relativeY = (e.pageY - offset.top);
		// 	  var pos = $(key).offset();
		// 	  var keyH = relativeY;
		// 	  var mouseH = pos.top;
		// 	  var a = keyH - mouseH;		  
		// 	  if (a < 60) {		  
		// 		  arr.splice(0,1 );  			 			
		// 			$(preText).text(alph.slice(i)); 
		// 			Killd();
		// 			InheritBGC ();
		// 			$(key).stop().css({"marginTop":"0", "opacity":"1", "marginLeft":"0"}).text(arr[0]);
		// 			i++;		   															  						
		// 	  }			  
		// });

		// toggle full screen
	// function toggleFullScreen() {
	// if (!document.fullscreenElement && // alternative standard method
	// !document.mozFullScreenElement && !document.webkitFullscreenElement) { // current working methods
	// if (document.documentElement.requestFullscreen) {
	// document.documentElement.requestFullscreen();
	// } else if (document.documentElement.mozRequestFullScreen) {
	// document.documentElement.mozRequestFullScreen();
	// } else if (document.documentElement.webkitRequestFullscreen) {
	// document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
	// }
	// } else {
	// if (document.cancelFullScreen) {
	// document.cancelFullScreen();
	// } else if (document.mozCancelFullScreen) {
	// document.mozCancelFullScreen();
	// } else if (document.webkitCancelFullScreen) {
	// document.webkitCancelFullScreen();
	// }
	// }
	// }

	// // keydown event handler
	// document.addEventListener('keydown', function(e) {
	// if (e.keyCode == 27 || e.keyCode == 70) { // F or Enter key
	// toggleFullScreen();
	// }
	// }, false);

	// $('#fullWindow').click(function () {            
	//   var element = document.body;
	//   var req = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen;	  
	//   if(req)
	//     req.call(element);
	//   else {
 //      var wscript = new ActiveXObject("Wscript.shell");
 //      wscript.SendKeys("{F11}");
	//   }	
	//  //$(this).fadeOut(); 
	//   return false;  
 //  });

 // mozfullscreenerror event handler
// function errorHandler() {
// alert('mozfullscreenerror');
// }
// document.documentElement.addEventListener('mozfullscreenerror', errorHandler, false);

