import os from 'os';


const getEOL = () => {
    const defaultEOL = JSON.stringify(os.EOL);
    console.log(`Default End-Of-Line (EOL) for the system: "${defaultEOL}"`)
}


export { getEOL }