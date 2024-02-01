import os from 'os';
import process from 'process'


const getEOL = () => {
    const defaultEOL = JSON.stringify(os.EOL);
    console.log(`Default End-Of-Line (EOL) for the system: "${defaultEOL}"`)
}

const cpus = () => {
    const cpus = os.cpus();
    const overallCPUs = cpus.length;
    console.log(`Overall amount of CPUs: ${overallCPUs}\n`);

    cpus.forEach((cpu, index) => {
        const { model, speed } = cpu;
        const speedInGHz = (speed / 1000).toFixed(2);

        console.log(`CPU ${index + 1}:`);
        console.log(`  Model: ${model}`);
        console.log(`  Clock Rate: ${speedInGHz} GHz\n`);
    });
}

const getHomeDirectory = () => {
    const homeDirectory = os.homedir();
    console.log(`Home directory: ${homeDirectory}`)
}

const getSystemUsername = () => {
    const systemUsername = process.env.USER || process.env.USERNAME
    console.log(`Current System User Name: ${systemUsername}`);
}

const getCPUArchitecture = () => {
    const cpuArchitecture = process.arch;
    console.log(`Node.js Binary CPU Architecture: ${cpuArchitecture}`);
}


export {
    getEOL,
    cpus,
    getHomeDirectory,
    getSystemUsername,
    getCPUArchitecture
}