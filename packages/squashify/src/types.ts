import { Config as SvgoConfig } from 'svgo';

import { Compressor, InputFormats } from './constants.js';

export interface CompressionOptions {
	compress: string;
	compressor?: Compressor;
	quality?: number;
	progressive?: string;
	plugins?: SvgoConfig[];
}

export interface scriptOptions {
	srcDir: string;
	distDir: string;
	configFile: string;
	verbose: boolean;
	interactive: boolean;
	compressionOptions?: { [ key in InputFormats ]: CompressionOptions };
}
