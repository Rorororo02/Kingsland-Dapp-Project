const MobileNumberRegistry = artifacts.require("MobileNumberRegistry");


contract("MobileNumberRegistry", async accounts => {
    let firstAccount = accounts[0];
    let secondAccount = accounts[1];
    let thirdAccount = accounts[2];

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
        assert.isTrue(await mr.isAdministrator.call(secondAccount));
        assert.isTrue(await mr.isAdministrator.call(thirdAccount));
    });

    it("delete administrator by owner", async() => {
        await mr.deleteAdministrator(thirdAccount);
        assert.isFalse(await mr.isAdministrator.call(secondAccount));
    });

    it("don't allow add administrator by non owner", async() => {
        let newMr = await MobileNumberRegistry.new({from: secondAccount});

        try {
            await newMr.addAdministrator(thirdAccount);
            assert.fail();
        } catch (err) {
            assert.ok(/revert/.test(err.message));
        }
    });

    it("don't allow delete administrator by non owner", async() => {
        let newMr = await MobileNumberRegistry.new({from: secondAccount});

        try {
            await newMr.deleteAdministrator(thirdAccount);
            assert.fail();
        } catch (err) {
            assert.ok(/revert/.test(err.message));
        }
    });

    it("add mobile number data by administrator", async() => {
        try {
            await mr.addMobileNumber("mobileNumberHash1","lastName1", "firstName1", "photoHash1");
        } catch(err) {
            assert.fail(/revert/.test(err.message));
        }

        let result = await mr.checkMobileNumber.call("mobileNumberHash1");

        assert.notEqual(result[0], "");
        assert.notEqual(result[1], "");
        assert.notEqual(result[2], "");

    });

    it("don't allow add mobile number data non--owner/non-administrator", async() => {
        let newMr = await MobileNumberRegistry.new({from: thirdAccount});

        try {
            await newMr.addMobileNumber("mobileNumberHash3","lastname3", "firstName3", "photoHash3");
            assert.fail();
        } catch (err) {
            assert.ok(/revert/.test(err.message));
        }
    });

    it("verify mobile number", async() => {
        await mr.addMobileNumber("mobileNumberHash1","lastName1", "firstName1", "photoHash1");
        let result = await mr.checkMobileNumber.call("mobileNumberHash1");

        assert.equal("firstName1", result[0]);
        assert.equal("lastName1", result[1]);
        assert.equal("photoHash1", result[2]);


    });
});