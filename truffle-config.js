var HDWalletProvider = require("truffle-hdwallet-provider");
var fs = require('fs')
const MNEMONIC = fs.readFileSync("mnemonic.txt").toString();

module.exports = {
  networks: {
    development :{
      host : "127.0.0.1",
      port : 8545,
      network_id : "*"
    },

    ropsten: {
      provider: function() {
        return new HDWalletProvider(MNEMONIC, "https://ropsten.infura.io/v3/856d01c63cc84e50a65266e7e3c38a70")
      },
      network_id: 3,
      gas: 4000000      //make sure this gas allocation isn't over 4M, which is the max
    }
  }
}