const MobileNumberRegistry = artifacts.require("MobileNumberRegistry");


contract("MobileNumberRegistry", async accounts => {
    let firstAccount = accounts[0];
    let secondAccount = accounts[1];
    let thirdAccount = accounts[2];
    let fourthAccount = accounts[3];
    let fifthAccount = accounts[4];

    let mr;

    beforeEach(async () => {
        mr = await MobileNumberRegistry.new();
    });

    it("sets an owner", async() => {
        assert.equal(await mr.getOwner.call(), firstAccount);
    });

    it("sets an owner as administrator", async() => {
        assert.equal(await mr.isAdministrator.call(firstAccount), true);
    });

    it("add administrator by owner", async() => {
        await mr.addAdministrator(secondAccount);
        await mr.addAdministrator(thirdAccount);
        assert.equal(await mr.isAdministrator.call(secondAccount), true);
        assert.equal(await mr.isAdministrator.call(thirdAccount), true);
    });

    it("delete administrator by owner", async() => {
        await mr.deleteAdministrator(thirdAccount);
        assert.equal(await mr.isAdministrator.call(secondAccount), false);
    });


    it("add mobile number data by owner", async() => {
        await mr.deleteAdministrator(secondAccount);
        assert.equal(await mr.isAdministrator.call(secondAccount), false);
    });

    it("add administrator by non owner", async() => {
        let newMr = await MobileNumberRegistry.new({from: secondAccount});

        try {
            await newMr.addAdministrator(thirdAccount);
            assert.fail();
        } catch (err) {
            assert.ok(/revert/.test(err.message));
        }
    });

    it("delete administrator by non owner", async() => {
        let newMr = await MobileNumberRegistry.new({from: secondAccount});

        try {
            await newMr.deleteAdministrator(thirdAccount);
            assert.fail();
        } catch (err) {
            assert.ok(/revert/.test(err.message));
        }
    });


    it("add mobile number by administrator", async() => {

    });


    it("delete mobile number by administrator", async() => {

    });

    it("add mobile number by non administrator", async() => {

    });


    it("delete mobile number by non administrator", async() => {

    });

    it("verify mobile number", async() => {

    });
});