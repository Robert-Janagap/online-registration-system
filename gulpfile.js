var gulp        =require( 'gulp' );
var sass        =require( 'gulp-sass' );
var plumber     =require( 'gulp-plumber' );
var browserSync =require( 'browser-sync' );
//var nodemon = require('gulp-nodemon');
gulp.task( 'sass',function(){

    return gulp.src( 'src/scss/main.scss' )
    .pipe( plumber() )
    .pipe( sass() )
    .pipe( gulp.dest( 'public/css/' ) );

	} );
gulp.task( 'sass-watch',[ 'sass' ],browserSync.reload );
gulp.task( 'watching',function(){

    browserSync( {
        proxy : 'localhost:3000'
    } );
    gulp.watch( 'src/scss/**/*.scss',[ 'sass-watch' ] );

	} );
//testing
//gulp.task('develop', function(cb){
//	var started = false;
//	return nodemon({
//		script: 'server.js',
//		ext: 'ejs js'
//		})
//		.on('start', function(){
//			if(!started){
//				cb();
//				started = true;
//			}
//			})
//	});
