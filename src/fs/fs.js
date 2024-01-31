import fs from 'fs';

const cat = async (filePath) => {
    const readableStream = fs.createReadStream(filePath, 'utf-8');

    readableStream.on('data', (chunk) => {
        console.log(chunk);
    })

    readableStream.on('error', function (error) {
        console.log(`error: ${error.message}`);
    })
}

const add = async (filePath) => {
    await fs.promises.writeFile(filePath, "", (err) => {
        if (err) {
            console.error(err)
        }

    });
    console.log('File is created successfully.');
}

export { cat, add }