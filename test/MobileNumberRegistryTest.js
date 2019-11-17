const MobileNumberRegistry = artifacts.require("MobileNumberRegistry");


contract("MobileNumberRegistry", async accounts => {
    let firstAccount = accounts[0];
    let secondAccount = accounts[1];
    let thirdAccount = accounts[2];
    let fourthAccount = accounts[3];
    let fifthAccount = accounts[4];

    it("sets an owner", async() => {
        let mr = await MobileNumberRegistry.deployed();
        assert.equal(await mr.getOwner.call(), firstAccount);
    });

    it("sets an owner as administrator", async() => {
        let mr = await MobileNumberRegistry.deployed();
        assert.equal(await mr.isAdministrator.call(firstAccount), true);
    });
});