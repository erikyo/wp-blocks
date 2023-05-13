import yargs from 'yargs';

/**
 * Get the command-line options
 */
export function getCliOptions(): {
	srcDir: string | undefined;
	distDir: string | undefined;
} {
	// Check for command-line arguments
	const argv = yargs( process.argv.slice( 2 ) )
		.usage( 'Usage: $0 [options]' )
		.option( 'in', {
			alias: 'i',
			describe: 'Source directory',
			type: 'string',
			demandOption: false,
		} )
		.option( 'out', {
			alias: 'o',
			describe: 'Destination directory',
			type: 'string',
			demandOption: false,
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
		srcDir: argv.in ?? undefined,
		distDir: argv.out ?? undefined,
	};
}
