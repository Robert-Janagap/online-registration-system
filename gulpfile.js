var gulp        =require( 'gulp' );
var sass        =require( 'gulp-sass' );
var plumber     =require( 'gulp-plumber' );
var sourcemap = require('gulp-sourcemaps');

gulp.task( 'sass',function(){

return gulp.src( 'src/scss/main.scss' )
	.pipe(sourcemap.init())
    	.pipe( plumber() )
    	.pipe( sass() )
    .pipe(sourcemap.write())
    .pipe( gulp.dest( 'public/css/' ) );

	} );

gulp.task( 'watching',function(){
    gulp.watch( 'src/scss/**/*.scss',[ 'sass' ] );
	} );

gulp.task('default', ['watching']);

