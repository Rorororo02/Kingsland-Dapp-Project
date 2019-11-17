pragma solidity ^0.5.8;

import "truffle/Assert.sol";
import "../contracts/MobileNumberRegistry.sol";
import "truffle/DeployedAddresses.sol";

contract MobileNumberRegistryTest {

    function testSettingAnOwnerDuringCreation() public {
        MobileNumberRegistry mr = new MobileNumberRegistry();
        Assert.equal(mr.getOwner(), address(this), "The owner is different from the deployer");
    }

    function testSettingOwnerOfDeployedContract() public {
        MobileNumberRegistry mr = MobileNumberRegistry(DeployedAddresses.MobileNumberRegistry());
        Assert.equal(mr.getOwner(), msg.sender, "The owner is different from the deployed");
    }

    function testSettingAnOwnerAsAdminDuringCreation() public {
        MobileNumberRegistry mr = new MobileNumberRegistry();
        Assert.equal(mr.isAdministrator(address(this)), true, "The owner is not set as administrator!");
    }

    function testSettingOwnerOfDeployedContractAsAdmin() public {
        MobileNumberRegistry mr = MobileNumberRegistry(DeployedAddresses.MobileNumberRegistry());
        Assert.equal(mr.isAdministrator(msg.sender), true, "The owner is different from the deployed and not an administrator");
    }
}