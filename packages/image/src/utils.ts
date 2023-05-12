/* eslint-disable no-console */

import fs from 'fs';
import path from 'path';

import { inputFormats, InputFormats } from './constants.js';

/**
 * The function returns compression options for a given image format.
 *
 * @param imageFormat The format of the image that needs to be compressed, such as
 *                    "jpeg", "png", etc.
 * @param options     The options parameter is an object that contains compression
 *                    options for different image formats. It is expected to have properties for each
 *                    supported image format, where the property name is the format name (e.g. "jpeg",
 *                    "png") and the value is an object containing compression options for that format.
 * @returns either the compression options for the specified image format from the
 * provided options object, or false if no compression options are found for that
 * format.
 */
export function getCompressionOptions( imageFormat, options ) {
	const formatOptions = options[ imageFormat ];

	if ( ! formatOptions ) {
		return false;
	}

	return formatOptions;
}

/**
 * Type guard for image formats
 *
 * @param ext the image format to check
 */
export function asInputFormats( ext: unknown ): ext is InputFormats {
	return inputFormats.includes( ext as InputFormats );
}

/**
 * this function returns an array of image formats in a given folder
 *
 * @param folderPath The folder to search for images in
 * @returns An array of image formats
 */
export function getImageFormatsInFolder( folderPath ): InputFormats[] {
	const imageFormats = new Set< InputFormats >(); // using a Set to store unique image formats

	/**
	 * This function searches for all image files in a given folder
	 *
	 * @param {string} dir The folder to search for images in.
	 */
	function searchForImages( dir ) {
		const files = fs.readdirSync( dir );

		// iterate over each file
		files.forEach( ( file ) => {
			const filePath = path.join( dir, file );

			// Get the stats of the file
			const stats = fs.statSync( filePath );

			// Check if the file is a directory
			if ( stats.isDirectory() ) {
				// Recursively call this function on the subdirectory
				searchForImages( filePath );
			} else {
				// Get the extension of the file
				const ext = path.extname( file ).toLowerCase(); // get the file extension in lowercase

				// Check if the file is an image
				if ( asInputFormats( ext ) ) {
					// check if it's an image file
					imageFormats.add( ext ); // add the image format to the Set
				}
			}
		} );
	}

	// Call this function on the source directory
	searchForImages( folderPath );

	return [ ...imageFormats ]; // convert the Set to an array
}
