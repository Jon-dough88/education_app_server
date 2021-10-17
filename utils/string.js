const Crypto = require('crypto');


const randomString = (size = 21) => {
    return Crypto
    .randomBytes(size)
    .toString('hex')
    .slice(0, size )

}

console.log(randomString())


module.exports = randomString;