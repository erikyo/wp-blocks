#!/usr/bin/env node
import { getCliOptions } from './args.js';
import { convertImages } from './compression.js';
import { getIniOptions } from './ini.js';
import { getPromptOptions } from './promps.js';

/**
 * Prompts the user for the source and destination directories
 * then runs a function that converts the images.
 *
 * @returns Promise that resolves when the image conversion is complete
 */
export default async function main() {
	// Get the cli options
	let options = getCliOptions();

	// Get the options from the ini file
	options = getIniOptions( options );

	// Prompt the user for the script options
	options = await getPromptOptions( options );

	// Start the timer
	const startTime = Date.now();

	// Then convert the images in the source directory
	convertImages( options ).then( () => {
		// Print the time elapsed
		console.log(
			'The end 🎉 - Time elapsed:',
			( Date.now() - startTime ) / 1000,
			'seconds'
		);
	} );
}
