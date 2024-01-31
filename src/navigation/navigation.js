import path from 'path';
import fs from 'fs';

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

export { up, ls }