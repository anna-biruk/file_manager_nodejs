import fs from 'fs';
import zlib from 'zlib'

const compress = (filePath, outputFile) => {
    const readStream = fs.createReadStream(filePath);
    const writeStream = fs.createWriteStream(outputFile);

    const brotli = zlib.createBrotliCompress();
    const stream = readStream.pipe(brotli).pipe(writeStream);

    stream.on('finish', () => {
        console.log('File has been compressed');
    });
}

export default compress;