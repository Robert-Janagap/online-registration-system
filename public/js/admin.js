( function ( $ ) {

    //show assestment view
    $( '.assestment--overlayShow, .assestment_formView, .assestment--overlayClose' ).on( 'click',function ( event ){

        event.preventDefault();
        $( '.assestment--overlay' ).toggle();

    } );
    $('.department_add--show,.curriculum--overlayClose,.curriculum_add--overlay').on('click',function(event) {
        event.preventDefault();
        $('.curriculum_year,.curriculum_add--overlay').toggle();
    });

    $('.newDepartment--show, .newDepartment--overlay').on('click', function(e){
    	$('.newDepartment').toggle(300);
        $('.newDepartment--overlay').slideToggle(200);
    });
    $('.departmentList--close').on('click', function(e){
        $('.departmentList').slideUp();
    });
} )( jQuery );
