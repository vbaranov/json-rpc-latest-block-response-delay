import Web3 from "web3"
import helper from './helper.js'

const node = helper.parseInputWSArgs()
var web3 = new Web3(new Web3.providers.WebsocketProvider(node.endpoint))


async function subscribeToBlocks() {
    web3.eth.subscribe('newBlockHeaders', (err, block) => {
        if (err) return console.log(err)
        const response = helper.generateResponse(block)
        console.log(JSON.stringify(response))
    });
}

subscribeToBlocks();