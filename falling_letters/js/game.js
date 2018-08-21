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
			clicks    = 0;
	var	fsz  = 36;
	var	mt  = 0;
	var timer;
	var stap = 10;
	var keycode, keyChar;

	Start();
  $(start).click(function(event) {  	
  	steperGame();
  	Timer(); //запускаем таймер
  	allClicks(); // запускаем подсчет кликов
	 	$(this).fadeOut(); // прячем стартовую кнопку	
	 	$(key).fadeIn().text(arr[0]); // показываем первую букву набираемого текста
	 	$(preText).text(alph);
	 	$('#bodyGame').fadeIn(); // показываем тело игры					
		document.onkeypress = function checkKeycode(event) { //при нажатии любой клавиши

			
		  if(!event) var event = window.event;
		  if (event.keyCode) keycode = event.keyCode;
		  if(event.which) keycode = event.which;
			keyChar=String.fromCharCode(keycode);	
		  $(tap).text(keyChar); //записываем нажатую клавишу в id="tap"

		  game(); //запускаем цикл/процесс игры
			
		} //document.onkeypress
	}); //Start

/* Functions for game
===============================*/
	
  function steperGame() {	 	
		var timer = setInterval(function() {	    				   
	    stap--;
	    //fsz+=10;
	    mt+=5;
	    console.log(stap);
	    $(key).css('margin-top', mt+'px');			 		 	
	    if (arr == 0) {
	     	clearInterval(timer);	      
	     	$(win).fadeIn().click(function() {
	 				location.reload(); 	
	 			});	
	    }
	 	  if (mt == 600) {
	     	clearInterval(timer);
	      alert('You Lose!');
	     	$(lose).fadeIn().click(function() {
	 				location.reload(); 	
	 			});	    	    
	   	}	
	        						   
	  }, 1000);		  
	}

	function game() {				
			 	if (key.text()==keyChar) { //если нажата нужная клавиша			 			 			
			 			mt = 0;			 			
			  		minusArrI(); //минусуем первый элемент arr
			  		$(preText).text(arr);	//опказываем текущий элемент arr
			  		Killd(); //подсчитываем и записываем убитые клавиши
			  		InheritBGC (); // оставляем фон по умолчанию при нажатии правильной клавиши ибо если клавиша не правильная фон мигает красным
			 			$(key).text(arr[0]); //показываем новый первый элемент arr
			 			arrEmpty();	// если массив arr пуст заканчиваем игру
			 		}		 			 	
			}

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

	function minusArrI() { //удаляем первый элемент массива	 		
 		arr.splice(0,1 );	 		
  } 

  function arrEmpty() {
		if (arr == 0) {					
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

	


/* Treaning cod
==================================*/

/* game firs version
===============================*/
// for (var i = 0; i < arr.length; i++) {
// 	if (key.text()==keyChar) {//если нажата нужная клавиша
// 		minusArrI();//минусуем первый элемент arr
// 		Killd(); //подсчитываем и записываем убитые клавиши
// 		InheritBGC ();// оставляем фон по умолчанию при нажатии правильной клавиши 
// 		$(killd).text(key.text());//показываем какую клавишу убили													
// 	  $(key).text(arr[i]); //показываем новый первый элемент arr
// 	}
// 	arrEmpty();// если массив arr пуст заканчиваем игру	 
// }	

// var test = new Array(1,2,3,4,5);
// arr.splice(0,1 );
// console.log(arr);arr

// 	var alph = 'олджэ';
// 	var arr = alph.split('');
// 	var getRandomArrIndex = Math.floor( (Math.random() * arr.length) + 0);
// 	var getKey = arr[getRandomArrIndex];
// 	keyChar=String.fromCharCode(keycode);

	// document.onkeypress =	function checkKeycode(event){
 //    var keycode, keyChar;						  
	//     if(!event) var event = window.event;
	//     if (event.keyCode) keycode = event.keyCode;
	//     else if(event.which) keycode = event.which;
	//   	keyChar=String.fromCharCode(keycode);	
	//   	$('.tap').html(keyChar);	  	
	// 	}		

	// $('#addBTN').click(function(){
	//     var text = $('input').val();
	//    $('#textForTraining').text(text);	   
	//     console.log(alph);
 //  });	

 	// var stopsetInterval = setInterval(function() {
	// 	console.log(3);
	// }, 3000);
	// clearInterval(stopsetInterval);

	// $("body").click(function(e) {
	// 	  var offset = $(this).offset();
	// 	  var relativeX = (e.pageX - offset.left);
	// 	  var relativeY = (e.pageY - offset.top);
		 
	// 	  //alert("X: " + relativeX + "  Y: " + relativeY);
	// 	  console.log(relativeY);
	// 	});
/*
=====================================*/

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




