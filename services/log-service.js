module.exports = LogService;

function LogService(name) {

    function log(level, msg) {
        console.log(`[${level}] ${name}: ${msg}`);
    }

    return {
        debug: msg => log('debug', msg),
        info: msg => log('info', msg),
        warn: msg => log('warn', msg),
        error: msg => log('error', msg),
        fatal: msg => log('fatal', msg)
    }

}
