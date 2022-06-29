import https from 'https'
import http from 'http'
import helper from './helper.js'

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
                    const response = helper.generateResponse(respJSON.result)
                    resolve(response)
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