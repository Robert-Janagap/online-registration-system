(function($){
	
	$(window).on('scroll', function(event) {
		var wScroll = $(this).scrollTop();
		
		var sideBarFixed = (wScroll > $('header').offset().top) ? $('.admin_sidebar').addClass('admin_sidebar--fixed') : $('.admin_sidebar').removeClass('admin_sidebar--fixed');
	});
})(jQuery);