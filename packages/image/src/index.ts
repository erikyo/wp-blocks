#!/usr/bin/env node
import prompts from 'prompts';

import { convertImages } from './compression.js';
import {
	distDirQuestion,
	getImageCompressionOptions,
	srcDirQuestion,
} from './options.js';
import { getImageFormatsInFolder } from './utils.js';
import {getIniOptions} from "./ini.js";
import {getCliOptions} from "./args.js";


/**
 * Prompts the user for the source and destination directories
 * then runs a function that converts the images.
 *
 * @returns Promise that resolves when the image conversion is complete
 */
export default async function main() {
	let { srcDir, distDir, compressionOptions } = getIniOptions();

	const cliOptions = getCliOptions();

	console.log(cliOptions);

	// If the source directory is not specified, prompt the user
	if ( ! srcDir ) {
		const response = await prompts( srcDirQuestion );
		srcDir = response.srcDir;
	}

	// If the destination directory is not specified, prompt the user
	if ( ! distDir ) {
		const response = await prompts( distDirQuestion );
		distDir = response.distDir;
	}

	// If the compression options are not specified, prompt the user
	if ( compressionOptions ) {
		// Get the image formats
		const imageFormats = getImageFormatsInFolder( srcDir );

		// If no image formats are found, return
		if ( ! imageFormats.length ) {
			console.log( 'No image formats found in the source directory' );
			return;
		}

		// Prompt the user for compression options
		compressionOptions = await getImageCompressionOptions( imageFormats );
	}

	// Start the timer
	const startTime = Date.now();

	// Then convert the images in the source directory
	convertImages( srcDir, distDir, compressionOptions );

	// Print the time elapsed
	console.log(
		'Time elapsed:',
		( Date.now() - startTime ) / 1000,
		'seconds'
	);
}
