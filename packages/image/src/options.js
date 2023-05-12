/* eslint-disable no-console */
import fs from 'fs';

import prompts from 'prompts';

import { compressors, svgOptions } from './constants.js';

/**
 * Prompts the user for the source directory
 *
 * @type prompts.PromptObject<string>
 */
export const srcDirQuestion = {
	type: 'text',
	name: 'srcDir',
	message: 'Enter the source directory:',
	initial: './src/images',
	validate: async ( value ) => {
		try {
			// Check if the path exists
			const stats = await fs.promises.stat( value );
			if ( ! stats.isDirectory() ) {
				return 'Path is not a directory';
			}
			return true;
		} catch ( error ) {
			return 'Path does not exist';
		}
	},
};

/**
 * Prompts the user for the source and destination directories
 *
 * @type prompts.PromptObject<string>
 */
export const distDirQuestion = {
	type: 'text',
	name: 'distDir',
	message:
		'Enter the destination directory (same path as source to override existing images):',
	initial: './images',
};

/**
 * The function prompts the user for the source and destination directories
 *
 * @type prompts.PromptObject<string>[]
 */
const promptsToAskforSVGs = [
	{
		type: 'select',
		name: 'compress',
		message: `Would you like to compress ".svg" files with SVGO?`,
		choices: [
			{
				title: 'Yes, with default options',
				value: 'default',
			},
			{ title: 'Yes, with custom options', value: 'custom' },
			{ title: 'No', value: 'no' },
		],
	},
	{
		type: ( _prev, _values ) => {
			if ( _values.compress === 'custom' ) {
				return null; // Skip this question
			}
			return 'multiselect';
		},
		name: 'plugins',
		message: 'Which SVGO plugins do you want to use?',
		choices: svgOptions,
		hint: '- Space to select. Return to submit',
	},
];

/**
 * The function prompts the user for the image compression options for different image formats
 *
 * @param {any} format The image format
 * @returns {prompts.PromptObject<string>[]} An array of prompts
 */
const promptsToAsk = ( format ) => [
	{
		type: 'select',
		name: 'compress',
		message: `Would you like to compress ${ format } files?`,
		choices: [
			{ title: 'Yes', value: 'yes' },
			{ title: 'No', value: 'no' },
		],
	},
	{
		type: ( _prev, _values ) => {
			if ( _values.compress === 'no' ) {
				return null; // Skip this question
			}
			return 'select';
		},
		name: 'compressor',
		message: `Which compressor would you like to use for ${ format } files?`,
		choices: compressors.map( ( comp ) => ( {
			title: comp,
			value: comp,
		} ) ),
	},
	{
		type: ( _prev, _values ) => {
			if ( _values.compress === 'no' || _values.compressor === '.png' ) {
				return null; // Skip this question
			}
			return 'number';
		},
		name: 'quality',
		message: 'Enter the quality (1-100):',
		initial: 75,
		min: 1,
		max: 100,
	},
	{
		type: ( _prev, _values ) => {
			if (
				_values.compress === 'no' ||
				( _values.compressor !== 'mozjpeg' &&
					_values.compressor !== 'jpeg' )
			) {
				return null; // Skip this question
			}
			return 'number';
		},
		name: 'progressive',
		message: 'Progressive jpeg:',
		initial: true,
	},
];

/**
 * This function prompts the user for options to compress different image formats,
 * including SVG files with custom SVGO plugins.
 *
 * @param {Object} imageFormats - An array of image file formats (e.g. ['.jpg', '.png', '.svg'])
 *                              that the function will prompt the user about compressing.
 * @returns {Promise} an object containing compression options for different image formats. The
 * options are obtained through a series of prompts that ask the user whether they want
 * to compress each format, which compressor to use (if applicable), and the quality
 * level (if applicable). For SVG files, the user can also choose which SVGO plugins to
 * use for compression.
 */
export async function getImageCompressionOptions( imageFormats ) {
	const options = {};

	for ( const format of imageFormats ) {
		console.log( '=='.concat( format, '==' ) );
		let response = {};
		// If the format is SVG

		if ( format === '.svg' ) {
			response = await prompts( promptsToAskforSVGs );
		} else {
			response = await prompts( promptsToAsk( format ) );
		}

		if ( response.compress === 'no' ) {
			console.log( `Skipping ${ format } files...` );
			continue;
		}

		options[ format ] = response;
	}

	return options;
}
