const Stablecoin = artifacts.require("Stablecoin");
const StablecoinPayment = artifacts.require("StablecoinPayment");

module.exports = async function (deployer) {
    // 部署Stablecoin合约
    const initialSupply = web3.utils.toWei('1000000', 'ether');
    await deployer.deploy(Stablecoin, initialSupply);
    const stablecoinInstance = await Stablecoin.deployed();

    // 获取Stablecoin合约地址
    const stablecoinAddress = stablecoinInstance.address;

    // 部署StablecoinPayment合约
    const deliveryLink = "https://yourdeliverylink.com"; // 替换为实际的发货链接
    await deployer.deploy(StablecoinPayment, stablecoinAddress, deliveryLink);
};