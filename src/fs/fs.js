import fs from 'fs';
import path from 'path'

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
const rn = async (oldName, newName) => {
    fs.rename(oldName, newName, () => {
        console.log('File renamed')
    })

}

const cp = async (pathToFile, pathToNewDirectory) => {
    if (pathToFile === undefined) {
        console.log('Path to file has not been set');
        return;
    }
    if (pathToNewDirectory === undefined) {
        console.log('Path to new directory has not been set');
        return;
    }

    const stats = fs.statSync(pathToFile);

    if (stats.isDirectory()) {
        // Handle copying all files within the directory to the new directory
        const files = fs.readdirSync(pathToFile);
        files.forEach(file => {
            const sourcePath = path.join(pathToFile, file);
            const destinationPath = path.join(pathToNewDirectory, file);
            cp(sourcePath, destinationPath);
        });
    } else {
        // Copy the file to the new directory
        const readableStream = fs.createReadStream(pathToFile, 'utf-8');
        const writableStream = fs.createWriteStream(path.join(pathToNewDirectory, path.basename(pathToFile)));
        readableStream.pipe(writableStream);
    }
    console.log("File has been copied succesfully")
}

export { cat, add, rn, cp }