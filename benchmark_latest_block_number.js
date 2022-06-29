import request from './perform-receipt-request.js'
import helper from './helper.js'

setInterval(checkBlocksNumber, 100)

var latestObservedBlockNumber = 0

const node = helper.parseInputJSONRPCArgs()

async function checkBlocksNumber() {
    try {
        var blockData = await request.getLatestBlock(node.host, node.port, node.path)
        if (latestObservedBlockNumber !== blockData.blockNumber) {
            latestObservedBlockNumber = blockData.blockNumber
            console.log(JSON.stringify(blockData))
        }
    } catch (err) {
        console.log(err)
    }
}