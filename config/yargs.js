
import yargs from 'yargs'
const argv = yargs(process.argv.slice(2)).argv
/*
let argv = yargs
    .option('p', {
        alias: 'port',
        type: 'number',
        description: "Puerto a utilizar",
    })
    .option('m', {
        alias: 'modo',
        type: 'string',
        description: "Modo a ejecutarse : fork o cluster",
    }).argv;
*/
export default argv;