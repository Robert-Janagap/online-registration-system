var express =require( 'express' ),
	http =require( 'http' ),
	path =require( 'path' ),
	app =express();
	port =process.env.PORT ||3000;
//set config
app.set( 'views',path.join( __dirname,'app/views' ) );
app.set( 'view engine','ejs' );

//use middleware
app.use( express.static( path.join( __dirname,'/public' ) ) ); //find the public link directory

//define routes
var index =require( './app/routes/index.js' ),
	curriculum =require( './app/routes/curriculum.js' );
//for admin
app.use( '/',index );
app.use( '/curriculum',curriculum );

//server listening
http.createServer( app ).listen( port,function (){

    console.log( 'the server now listen at port ' +port );

} );
