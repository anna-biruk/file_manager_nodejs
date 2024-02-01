import * as os from "os";
import { up, ls } from "./navigation/navigation.js";
import readline from 'readline';
import { cat, add, rn } from "./fs/fs.js";

const run = () => {

    let currentDirectory = os.homedir();

    const args = process.argv.slice(2)
    let username = "";



    args.forEach((arg) => {
        if (arg.startsWith('--username=')) {
            username = arg.split('=')[1];
        }
    });

    const currentLocation = () => {
        process.stdout.write(`You are currently in ${currentDirectory}\n`);
    }

    if (username) {
        console.log(`Welcome to the File Manager, ${username}!`)
        currentLocation()
    }

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    rl
        .on('SIGINT', () => {
            console.log(`Thank you for using File Manager, ${username}, goodbye!`)
            process.exit(1)
        })
        .on("line", async (input) => {
            const userInput = input.trim()
            switch (userInput) {
                case "up":
                    if (await up(currentDirectory)) {
                        currentDirectory = await up(currentDirectory)
                    }
                    currentLocation();
                    break;
                case "ls":
                    ls(currentDirectory);
                    currentLocation()
            }

            if (userInput.startsWith("cat")) {
                const fileName = userInput.split(" ")[1];
                const pathToFile = `${currentDirectory}\\${fileName}`
                cat(pathToFile)
                currentLocation()
            } else if (userInput.startsWith('add')) {
                const fileName = userInput.split(" ")[1];
                const pathToFile = `${currentDirectory}\\${fileName}`
                add(pathToFile)
                currentLocation()
            }
            else if (userInput.startsWith("rn")) {
                const oldFileName = userInput.split(" ")[1];
                const newFileName = userInput.split(" ")[2];
                const oldPath = `${currentDirectory}\\${oldFileName}`;
                const newPath = `${currentDirectory}\\${newFileName}`;
                rn(oldPath, newPath);
                currentLocation();
            }
        })

}

run()