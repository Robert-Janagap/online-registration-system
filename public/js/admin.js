( function ( $ ) {

    //show assestment view
    $( '.assestment--overlayShow, .assestment_formView, .assestment--overlayClose' ).on( 'click',function ( event ){

        event.preventDefault();
        $( '.assestment--overlay' ).toggle();
        console.log( 'obj' );

    } );

    $( '.department_subjects--show, .department_subjects--close, .department--overlay' ).on( 'click',function ( event ){

        console.log('obj');
        event.preventDefault();
        $( '.department_subjects, .department--overlay' ).toggle();
    } );

} )( jQuery );
