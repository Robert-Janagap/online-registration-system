( function ( $ ) {

    $( '.assestment--overlayShow, .assestment_formView, .assestment--overlayClose' ).on( 'click',function ( event ){

        event.preventDefault();
        $( '.assestment--overlay' ).toggle();

    } );
    // $('.department_add--show,.curriculum--overlayClose,.curriculum_add--overlay').on('click',function(event) {
    //     event.preventDefault();
    //     $('.curriculum_year,.curriculum_add--overlay').toggle();
    //     console.log('ok dokie');
    // });
    // toggle curriculum info
    $('.newDepartment--show, .newDepartment--overlay').on('click', function(e){
    	$('.newDepartment').toggle(300);
        $('.newDepartment--overlay').slideToggle(200);
    });
    // close curriculum info
    $('.departmentList--close').on('click', function(e){
        $('.departmentList').slideUp();
    });
    // close course subjects
    $('.course_subjects--close').on('click', function(e){
        $('.course_subjects').toggle();
    });
} )( jQuery );
