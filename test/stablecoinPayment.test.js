const Stablecoin = artifacts.require("Stablecoin");
const StablecoinPayment = artifacts.require("StablecoinPayment");

contract("StablecoinPayment", (accounts) => {
    let stablecoin;
    let stablecoinPayment;
    const initialSupply = web3.utils.toWei('1000000', 'ether');
    const deliveryLink = "https://yourdeliverylink.com"; // 替换为实际的发货链接

    beforeEach(async () => {
        // 部署Stablecoin合约
        stablecoin = await Stablecoin.new(initialSupply);

        // 部署StablecoinPayment合约
        stablecoinPayment = await StablecoinPayment.new(stablecoin.address, deliveryLink);
    });

    it("should allow user to pay and emit event", async () => {
        const amount = web3.utils.toWei('100', 'ether');
        await stablecoin.approve(stablecoinPayment.address, amount, { from: accounts[0] });
        const receipt = await stablecoinPayment.receivePayment(amount, { from: accounts[0] });

        assert.equal(receipt.logs.length, 1, "Expected one event to be emitted");
        assert.equal(receipt.logs[0].event, "PaymentReceived", "Expected event to be PaymentReceived");
        assert.equal(receipt.logs[0].args.from, accounts[0], "Expected sender to be accounts[0]");
        assert.equal(receipt.logs[0].args.amount.toString(), amount, "Expected amount to be 100 ether");
        assert.equal(receipt.logs[0].args.deliveryLink, deliveryLink, "Expected delivery link to match");
    });
});