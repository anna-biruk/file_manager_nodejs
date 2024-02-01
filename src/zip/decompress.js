import fs from 'fs';
import zlib from 'zlib';


const decompress = (pathToFile, pathToDestination) => {
    const readStream = fs.createReadStream(pathToFile);
    const writeStream = fs.createWriteStream(pathToDestination);

    const brotli = zlib.createBrotliDecompress();

    const stream = readStream.pipe(brotli).pipe(writeStream);

    brotli.on('error', (err) => {
        console.error('Decompression error:', err);
    });

    stream.on('finish', () => {
        console.log('File has been decompressed');
    });

}

export default decompress;