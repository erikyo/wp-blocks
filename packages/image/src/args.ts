import yargs from "yargs";

/**
 * Get the command-line options
 */
export function getCliOptions() {
	// Check for command-line arguments
	const argv = yargs( process.argv.slice( 2 ) )
		.usage( 'Usage: $0 [options]' )
		.option( 'in', {
			alias: 'i',
			describe: 'Source directory',
			demandOption: true,
			type: 'string',
		} )
		.option( 'out', {
			alias: 'o',
			describe: 'Destination directory',
			demandOption: true,
			type: 'string',
		} )
		.help( 'h' )
		.alias( 'h', 'help' )
		.parseSync();

	return argv;
}
