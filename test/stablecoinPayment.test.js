const StablecoinPayment = artifacts.require("StablecoinPayment");

contract("StablecoinPayment", (accounts) => {
    let stablecoinPayment;
    const deliveryLink = "https://yourdeliverylink.com"; // 替换为实际的发货链接
    const stablecoinAddress = accounts[0]; // 使用Ganache中的第一个地址作为stablecoinAddress
    const amount = web3.utils.toWei('100', 'ether'); // 示例支付金额

    beforeEach(async () => {
        // 部署StablecoinPayment合约
        stablecoinPayment = await StablecoinPayment.new(stablecoinAddress, deliveryLink);
    });

    it("should allow user to pay and emit event", async () => {
        const receipt = await stablecoinPayment.receivePayment(amount, { from: accounts[0] });
        console.log(`Receipt: ${receipt.logs[0].event}
         TransactionHash: ${receipt.receipt.transactionHash}
         From: ${receipt.receipt.from}
         To: ${receipt.receipt.to}
         Amount: ${receipt.logs[0].args.amount.toString()}
         DeliveryLink: ${receipt.logs[0].args.deliveryLink}
         GasUsed: ${receipt.receipt.gasUsed}`);
        assert.equal(receipt.logs.length, 1, "Expected one event to be emitted");
        assert.equal(receipt.logs[0].event, "PaymentReceived", "Expected event to be PaymentReceived");
        assert.equal(receipt.logs[0].args.from, accounts[0], "Expected sender to be accounts[0]");
        assert.equal(receipt.logs[0].args.amount.toString(), amount, "Expected amount to be 100 ether");
    });
});