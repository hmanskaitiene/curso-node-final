import core from 'os';
import process from 'process';
import logger  from '../utils/logger.js';
import config from '../config/config.js';

class InformationService {

    getInformation = ( ) => {
        const info = {
            arguments:process.argv.slice(2),
            platform:process.platform,
            nodeVersion:process.version,
            memoryTotalReserved:process.memoryUsage().rss,
            execPath:process.execPath,
            pid:process.pid,
            proyectPath:process.cwd(),
            cantCpu:core.cpus().length,
        }
        return { status:200, data:{ info,app:config.app } }
    }
    
}

export default InformationService;