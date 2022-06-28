import helper from './perform-receipt-request.js'

setInterval(checkBlocksNumber, 100)

var latestObservedBlockNumber = 0

const node = parseInputArgs()

async function checkBlocksNumber() {
    try {
        var blockData = await helper.getLatestBlock(node.host, node.port, node.path)
        if (latestObservedBlockNumber !== blockData.blockNumber) {
            latestObservedBlockNumber = blockData.blockNumber
            console.log(blockData)
        }
    } catch (err) {
        console.log(err)
    }
}

function parseInputArgs() {
    const args = process.argv.slice(2)
    return {
        'host': args[0],
        'port': args[1],
        'path': args[2]
    }
}