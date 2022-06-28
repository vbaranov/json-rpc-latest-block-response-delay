import https from 'https'
import http from 'http'
import moment from 'moment'

const getLatestBlock = (rpcHost, rpcPort, rpcPath) => {
    return new Promise((resolve, reject) => {
        const params = {
            'jsonrpc': '2.0',
            'method': 'eth_getBlockByNumber',
            'params': ['latest', false],
            'id': 1
        }
    
        const data = JSON.stringify(params)
    
        const options = {
            hostname: rpcHost,
            port: rpcPort,
            path: rpcPath,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        }
    
        const protocol = rpcPort == '443' ? https : http
        const req = protocol.request(options, res => {
            var body = ''
          
            res.on('data', chunk => {
                body += chunk;
            })
    
            res.on('end', function() {
                const respJSON = JSON.parse(body)
    
                if (respJSON && respJSON.result) {
                    const blockNumber = respJSON.result.number && parseInt(respJSON.result.number, 16)
                    const blockTimestamp = moment.unix(respJSON.result.timestamp && parseInt(respJSON.result.timestamp, 16))
                    const blockTimestampFromatted = blockTimestamp.format()
                    const currentTimestamp =  moment()
                    const currentTimestampFormatted =  currentTimestamp.format()
                    const delay = moment.duration(currentTimestamp.diff(blockTimestamp)).asSeconds() + ' sec'
                    const numOfTransactions = respJSON.result.transactions.length
                    resolve({ blockNumber, blockTimestamp: blockTimestampFromatted, currentTimestamp: currentTimestampFormatted, delay, numOfTransactions })
                } else {
                    reject('Response or response result is null')
                }
            })
        })
        req.on('error', error => {
            reject(error)
        })
      
        req.write(data)
        req.end()
    })
}

export default { getLatestBlock }