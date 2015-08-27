( function ( $ ) {

    //show assestment view
    $( '.assestment--overlayShow, .assestment_formView, .assestment--overlayClose' ).on( 'click',function ( event ){

        event.preventDefault();
        $( '.assestment--overlay' ).toggle();
        console.log( 'obj' );

    } );
    //show curriculum add form
    $( '.department_add--show, .curriculum--overlayClose, .department_add--overlay' ).on( 'click',function ( event ) {

        $( '.curriculum_year, .department_add--overlay' ).toggle();

    } );

    $( '.department_subjects--show, .department_subjects--close, .department--overlay' ).on( 'click',function ( event ){

        console.log('obj');
        event.preventDefault();
        $( '.department_subjects, .department--overlay' ).toggle();
    } );

    //appending courses
    $('.append_course').on('click', function(){
        $('<tr><td><input type="text" class="input_name" ng-model="curriculum_new.course_name"> </td> <td> <input type="text" class="input_des" ng-model="curriculum_new.course_des"> </td> <td> <input type="number" class="input_units" max="4" min="1" ng-model="curriculum_new.year_level"> </td> <td> <input type="number" class="input_units" max="3" min="1" ng-model="curriculum_new.term" value="2"> </td> <td> <button>delete</button> </td> </tr>').insertAfter('.department_add_courses');
    });
} )( jQuery );
