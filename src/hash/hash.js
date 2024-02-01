import crypto from 'crypto';
import fs from 'fs'

const hash = async (filePath) => {
    const hash = crypto.createHash('sha256');
    const fileStream = fs.createReadStream(filePath);

    fileStream.on('data', (data) => {
        hash.update(data);
    });

    fileStream.on('end', () => {
        const hexHash = hash.digest('hex');
        console.log(`Hash: ${hexHash}`);
    });

    fileStream.on('error', (error) => {
        console.error(`Error reading file: ${error.message}`);
    });

}

export { hash }