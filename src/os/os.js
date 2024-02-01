import os from 'os';


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
export { getEOL, cpus }