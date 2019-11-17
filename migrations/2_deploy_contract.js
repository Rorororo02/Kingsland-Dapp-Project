var MobileNumberRegistry = artifacts.require("MobileNumberRegistry.sol");

module.exports = function(deployer) {
    deployer.deploy(MobileNumberRegistry);
  };