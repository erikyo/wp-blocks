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
	const iniOptions = getIniOptions();

	const cliOptions = getCliOptions();

	const options = await getPromptOptions( {
		srcDir: cliOptions.srcDir ?? iniOptions.srcDir,
		distDir: cliOptions.distDir ?? iniOptions.distDir,
		compressionOptions: iniOptions.compressionOptions,
	} );

	// Start the timer
	const startTime = Date.now();

	// Then convert the images in the source directory
	convertImages( options );

	// Print the time elapsed
	console.log(
		'Time elapsed:',
		( Date.now() - startTime ) / 1000,
		'seconds'
	);
}
