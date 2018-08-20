$(function() {

		$(".set > a").on("click", function(e){
			e.preventDefault();

			$('.t-content').removeClass('content-active');
			$('.t-content:first-child').addClass('content-active');
			$('.tab:first-child').addClass('tab-active');

			if($(this).hasClass('active')){
				$(this).removeClass("active");
				$(this).siblings('.content').slideUp(200);
				$(".set > a i").removeClass("fa-minus").addClass("fa-plus");
			}else{
				$(".set > a i").removeClass("fa-minus").addClass("fa-plus");
				$(this).find("i").removeClass("fa-plus").addClass("fa-minus");
				$(".set > a").removeClass("active");
				$(this).addClass("active");
				$('.content').slideUp(200);
				$(this).siblings('.content').slideDown(200);
			}
		});

		//Табы
		
		var tab = $('.tab');
		tab.on('click', function () {
			$('.t-content').removeClass('content-active');
			$('.t-content[data-tab='+$(this).attr('data-tab')+']').addClass('content-active'); //content с data атрибутом таким же как и у элемента по которому мы кликнули
			tab.removeClass('tab-active');
			$(this).addClass('tab-active');
		});
		//конец табов

});