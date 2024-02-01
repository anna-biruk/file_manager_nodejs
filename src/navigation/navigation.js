import path from 'path';
import fs from 'fs';
import { promises as fsPromises } from 'fs';

const up = async (dir) => {
    return path.join(dir, '../')
}

const ls = async (dir) => {
    const files = await fs.promises.readdir(dir, { withFileTypes: true })
    const filteredFiles = files.filter((file) => file.isDirectory() || file.isFile());

    const filesArray = filteredFiles
        .filter((file) => file.isFile())
        .map((file) => ({ Name: file.name, Type: "file" }));

    const foldersArray = filteredFiles
        .filter((file) => file.isDirectory())
        .map((file) => ({ Name: file.name, Type: 'directory' }));

    console.table([...foldersArray, ...filesArray])
}

const cd = async (directory, newPath) => {
    const targetPath = path.resolve(directory, newPath);

    try {
        await fsPromises.access(targetPath, fsPromises.constants.R_OK | fsPromises.constants.X_OK);
        process.chdir(targetPath);
        return true
    } catch (error) {
        console.error(`Error changing directory to ${targetPath}: ${error.message}`);
        return false
    }
};


export { up, ls, cd }