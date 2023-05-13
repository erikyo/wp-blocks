# @wp-blocks/image

## What is this?
A Node.js command-line tool to compress and optimize images, using different algorithms to reduce file size.

## Why Use This?
If you have a large number of images in a folder that need to be compressed and optimized, this package can be a lifesaver. With just one command, you can easily reduce the size of your images, making them load faster on your website. Whether you need to compress JPGs, optimize SVGs, or generate compressed AVIF or WebP images, this package has got you covered. It's a simple and effective way to make your website more efficient and your users happier. Give it a try and see the difference it can make!

## Requirements

- Node.js version 14 or above
- npm or yarn package manager

## Installation

1. Clone the repository or download the source code as a ZIP file.
2. Open a terminal and navigate to the project directory.
3. Run `npm install` or `yarn install` command to install the required dependencies.

## Usage

To use the script, run the following command:

```
node ./bin.js
```

The script will prompt you to enter the source and destination directory paths. After entering the directories, the script will show the list of image formats available in the source directory. You can choose the compression options for each format.

### Supported Image Formats

The script supports the following image formats:

- AVIF (.avif)
- WEBP (.webp)
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- SVG (.svg)
- TIFF (.tiff)

### Available Compression Options

- AVIF: `libvips`
- WEBP: `libwebp`
- JPEG: `libjpeg`
- MOZJPEG: `mozjpeg`
- PNG: `pngquant`
- SVG: `svgo`

### Configuration

The script can be configured using command-line arguments or an INI file.

#### Command-Line Arguments
The following command-line arguments are available:

--in <path>: Specifies the path to the input directory.

--out <path>: Specifies the path to the output directory.

--help: Shows the help message.

#### INI File
The script also supports an INI file named .image in the project directory. The file should have the following sections and keys:

[path] This section contains the in and out keys, which specify the input and output directories, respectively.

[format] This section specifies the compression options for a specific image format, where <format> is one of the supported formats listed above. The available keys are compressor and quality for most formats, and options for SVGs.
Here's an example .image file:

```ini
[path]
in = ./src/images
out = ./images

[jpg]
compressor = mozjpeg
quality = 85
progressive = true

[png]
compressor = webp
quality = 80

[svg]
options = CleanupAttrs, RemoveDoctype, RemoveXMLProcInst, RemoveComments, RemoveMetadata, RemoveXMLNS, RemoveEditorsNSData, RemoveTitle, RemoveDesc, RemoveUselessDefs, RemoveEmptyAttrs, RemoveHiddenElems, RemoveEmptyContainers, RemoveEmptyText, RemoveUnusedNS, ConvertShapeToPath, SortAttrs, MergePaths, SortDefsChildren, RemoveDimensions, RemoveStyleElement, RemoveScriptElement, InlineStyles, removeViewBox, removeElementsByAttr, cleanupIDs, convertColors, removeRasterImages, removeUselessStrokeAndFill, removeNonInheritableGroupAttrs,
```

## License

This script is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more information.
