( function ( $ ) {
	//show assestment view
    $( '.assestment--overlayShow, .assestment_formView, .assestment--overlayClose' ).on( 'click',function ( event ){

        event.preventDefault();
        $( '.assestment--overlay' ).toggle();
        console.log('obj');

    } );
    //show curriculum add form
    $( '.departmentAdd--show, .curriculum--overlayClose, .departmentAdd--overlay' ).on( 'click',function ( event ) {

        $( '.departmentAdd, .departmentAdd--overlay' ).toggle();

    } );


} )( jQuery );
