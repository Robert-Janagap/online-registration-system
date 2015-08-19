( function ( $ ) {

    $( '.assestment_formView' ).on( 'click',function ( event ){

        event.preventDefault();
        $( '.assestment_form' ).slideToggle( 400 );

    } );
    $( '.departmentAdd--show, .btn--close' ).on( 'click',function ( event ) {

        $( '.departmentAdd, .overlay' ).toggle();

    } );

} )( jQuery );
