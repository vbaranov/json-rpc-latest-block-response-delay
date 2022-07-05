import moment from 'moment'

function parseInputJSONRPCArgs() {
    const args = process.argv.slice(2)
    return {
        'host': args[0],
        'port': args[1] || '8545',
        'path': args[2] || '/'
    }
}

function parseInputWSArgs() {
    const args = process.argv.slice(2)
    return {
        'endpoint': args[0]
    }
}

function isHexString(input) {
    const startsWith0x = typeof input === 'string' && input.startsWith('0x')
    const re = /[0-9A-Fa-f]{6}/g
    return startsWith0x && re.test(input) ? true : false
}

function generateResponse(block) {
    const blockNumber = isHexString(block.number) ? block.number && parseInt(block.number, 16) : block.number
    const blockTimestampUnix = isHexString(block.timestamp) ? block.timestamp && parseInt(block.timestamp, 16) : block.timestamp
    const blockTimestamp = moment.unix(blockTimestampUnix)
    const blockTimestampFormatted = blockTimestamp.format()
    const currentTimestamp =  moment()
    const currentTimestampFormatted =  currentTimestamp.format()
    const delay = moment.duration(currentTimestamp.diff(blockTimestamp)).asSeconds() + ' sec'
    const numOfTransactions = block.transactions && block.transactions.length
    return { blockNumber, blockTimestamp: blockTimestampFormatted, currentTimestamp: currentTimestampFormatted, delay, numOfTransactions }
}

export default { parseInputJSONRPCArgs, parseInputWSArgs, generateResponse }