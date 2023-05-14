import yargs from 'yargs';

import { defaultConfigFile, defaultDist, defaultSrc } from './constants.js';
import { scriptOptions } from './types.js';

/**
 * Get the command-line options
 */
export function getCliOptions(): scriptOptions {
	// Check for command-line arguments
	const argv = yargs( process.argv.slice( 2 ) )
		.usage( 'Usage: $0 [options]' )
		.option( 'in', {
			alias: 'i',
			describe: 'Source directory',
			type: 'string',
		} )
		.option( 'out', {
			alias: 'o',
			describe: 'Destination directory',
			type: 'string',
		} )
		.option( 'config', {
			alias: 'c',
			describe: 'Configuration File',
			type: 'string',
		} )
		.option( 'interactive', {
			alias: 'i',
			describe: 'Interactive mode',
			type: 'boolean',
		} )
		.option( 'verbose', {
			alias: 'v',
			type: 'boolean',
			description: 'Run with verbose logging',
		} )
		.help( 'h' )
		.alias( 'h', 'help' )
		.parseSync();

	return {
		srcDir: argv.in ?? defaultSrc,
		distDir: argv.out ?? defaultDist,
		configFile: argv.config ?? defaultConfigFile,
		interactive: argv.interactive ?? false,
		verbose: argv.verbose ?? false,
		compressionOptions: undefined,
	};
}
