import fs from 'fs';
import path from 'path'

const cat = async (filePath) => {
    if (filePath === undefined) {
        console.log('Path to file has not been set');
        return;
    }
    const readableStream = fs.createReadStream(filePath, 'utf-8');

    readableStream.on('data', (chunk) => {
        console.log(chunk);
    })

    readableStream.on('error', function (error) {
        console.log(`error: ${error.message}`);
    })
}

const add = async (filePath) => {
    if (filePath === undefined) {
        console.log('Path to file has not been set');
        return;
    }
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
        const sourceStream = fs.createReadStream(pathToFile, 'utf-8');
        const destinationStream = fs.createWriteStream(path.join(pathToNewDirectory, path.basename(pathToFile)));
        sourceStream.pipe(destinationStream);

    }
    console.log("The file has been copied successfully")

}

const mv = async (pathToFile, pathToNewDirectory) => {
    if (pathToFile === undefined) {
        console.log('Path to file has not been set');
        return;
    }
    if (pathToNewDirectory === undefined) {
        console.log('Path to new directory has not been set');
        return;
    }

    const sourceStream = fs.createReadStream(pathToFile);
    const destinationPath = path.join(pathToNewDirectory, path.basename(pathToFile));
    const destinationStream = fs.createWriteStream(destinationPath);

    sourceStream.pipe(destinationStream);

    sourceStream.on('end', () => {
        fs.unlinkSync(pathToFile);
        console.log(`File moved from ${pathToFile} to ${destinationPath}`);
    });

    sourceStream.on('error', (err) => {
        console.error(`Error moving file: ${err.message}`);
    });
}

const rm = async (pathToFile) => {
    if (pathToFile === undefined) {
        console.log('Path to file has not been set');
        return;
    }

    fs.unlink(pathToFile, (err) => {
        if (err) {
            console.log(`Error deleting file:${err}`)
        } else {
            console.log("File deleted")
        }
    })
}

export { cat, add, rn, cp, mv, rm }