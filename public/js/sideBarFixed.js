(function($){
	
	$(window).on('scroll', function(event) {
		var wScroll = $(this).scrollTop();
		// console.log($('footer').offset().top);
		// console.log(wScroll);
		// console.log($(window).height());
		// if(wScroll > $(window).height() - $('footer').offset().top){
		// 	console.log('ok dookie');
		// }
		var sideBarFixed = (wScroll > $('header').offset().top) ? $('.admin_sidebar').addClass('admin_sidebar--fixed') : $('.admin_sidebar').removeClass('admin_sidebar--fixed');
		// var sideBarFixedFooter = (wScroll > $('footer').offset().top - $(window).height()) ? $('.admin_sidebar').removeClass('admin_sidebar--fixed') : $('.admin_sidebar').addClass('admin_sidebar--fixed');
	});
	
})(jQuery);