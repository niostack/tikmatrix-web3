const StablecoinPayment = artifacts.require("StablecoinPayment");

module.exports = async function (deployer, network, accounts) {
    // 使用Ganache中的第一个地址作为stablecoinAddress
    const stablecoinAddress = accounts[0];

    // 发货链接
    const deliveryLink = "https://yourdeliverylink.com"; // 替换为实际的发货链接

    // 部署StablecoinPayment合约
    await deployer.deploy(StablecoinPayment, stablecoinAddress, deliveryLink);
};