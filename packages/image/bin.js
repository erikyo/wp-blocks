#!/usr/bin/env node

import main from './src/image.js';

await main()
	.then( () => {
		console.log( 'The end 🎉' );
	} )
	.catch( ( err ) => {
		console.error( err );
	} );
