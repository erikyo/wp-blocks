import fs from 'fs';
import ini from 'ini';

import { inputFormats } from './constants.js';

/**
 * Get the script options from the configuration file.
 */
export function getIniOptions() {
	let iniOptions;
	const options = {
		compressionOptions: {},
		srcDir: '',
		distDir: '',
	};

	try {
		// Get the compression options in the configuration file
		iniOptions = ini.parse( fs.readFileSync( './.image', 'utf-8' ) );
	} catch ( err ) {
		console.log(
			'image: No configuration file found. Please read the ReadMe to know more about!'
		);
	}

	if ( Object.keys( iniOptions ).length ) {
		options.srcDir = iniOptions?.paths?.in ?? '';
		options.distDir = iniOptions?.paths?.out ?? '';

		// parse known options
		inputFormats
			// remove the dot from the start of each string by using the .substring() method
			.map( ( format ) => format.substring( 1 ) )
			// then parse the options for each format
			.forEach( ( format ) => {
				options.compressionOptions[ format ] = {
					compress: iniOptions[ format ] ? 'yes' : 'no',
					compressor:
						iniOptions?.[ format ]?.compressor ??
						( format === 'jpg' ? 'mozjpeg' : 'webp' ),
					quality: iniOptions?.[ format ]?.quality ?? 80,
					progressive:
						format === 'jpg'
							? iniOptions?.[ format ]?.progressive ?? true
							: null,
					options:
						format === 'svg'
							? iniOptions?.[ format ]?.options ?? []
							: null,
				};
			} );
	}
	return options;
}
