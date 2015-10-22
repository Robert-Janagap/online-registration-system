var gulp        =require( 'gulp' );
var sass        =require( 'gulp-sass' );
var plumber     =require( 'gulp-plumber' );
var sourcemap = require('gulp-sourcemaps');
var prefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var jshint = require('gulp-jshint');
var jshintSylish = require('jshint-stylish');
var htmlify = require('gulp-angular-htmlify');
var minifyHtml = require('gulp-minify-html');
var minifyImage = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var stripDebug = require('gulp-strip-debug');
//styles
gulp.task( 'sass',function(){

	return gulp.src( './src/scss/**/*.scss' )
	    .pipe( plumber() )
		.pipe(sourcemap.init())
	    	.pipe( sass({outputStyle: 'compressed'}) )
	    	.pipe( prefixer('last 2 version') )
	    .pipe(sourcemap.write({addComment: false}))
	    .pipe( gulp.dest( 'public/css/' ) );

	} );

//css minified
gulp.task( 'sass-minify',function(){

	return gulp.src( './src/scss/main.scss' )
	    .pipe( plumber() )
		.pipe(sourcemap.init())
	    	.pipe( sass({outputStyle: 'compressed'}) )
	    	.pipe( prefixer('last 2 version') )
	    	//.pipe( rename({suffix: '.min'}) )
	    .pipe(sourcemap.write({addComment: false}))
	    .pipe( gulp.dest( 'production/css/' ) );

	} );

//javascript
gulp.task( 'js',function(){

	return gulp.src( ['./public/lib/jquery-2.1.4.min.js','./public/lib/angular.min.js', './public/lib/angular-route.min.js', './public/lib/sideBarFixed.js', './public/js/appRoute.js', './public/js/controllers/*.js'] )
	    .pipe( plumber() )
		.pipe(sourcemap.init())
			.pipe(stripDebug())
	    	.pipe(concat('app.js'))
	    	.pipe(ngAnnotate())
	    	.pipe(uglify())
	    	//.pipe(rename({suffix:'.min'}))
	    .pipe(sourcemap.write({addComment: false}))
	    .pipe( gulp.dest( 'production/js' ) );

	} );

//html
gulp.task('html', function(){
	return gulp.src('./public/**/*.html')
		.pipe(htmlify())
		.pipe(minifyHtml())
		//.pipe(rename({suffix:'.min'}))
		.pipe(gulp.dest('production/'));
});
//minify image
gulp.task('imagemin', function(){
	return gulp.src('./public/img/*')
		.pipe(minifyImage({
			progressive: true,
			use: [pngquant()]
			}))
		.pipe(gulp.dest('production/img/'));
});
//javascript linting
gulp.task('linting', function(){
	return gulp.src('./public/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(jshintSylish));
});

gulp.task( 'watching',function(){
    gulp.watch( './src/scss/**/*.scss',[ 'sass' ] );
    //gulp.watch( './public/js/**/*.js',[ 'linting' ] );
	} );

//dev
gulp.task('default', ['watching']);

//production
gulp.task('minify', ['html', 'sass-minify', 'js', 'imagemin']);

