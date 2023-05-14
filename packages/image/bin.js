import main from './build/index.js';

await main().catch( ( err ) => {
	console.error( err );
} );
