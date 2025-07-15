const { getNamedAccounts, deployments } = require("hardhat");

module.exports = async({getNamedAccounts, deployments}) => {
    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts();

    console.log("Deploying contract...");

    const fundme = await deploy("Fundme",{
        from:deployer,
        args:[],
        logs:true
    });

    console.log(`Fundme deployed at ${fundme.address}`);
};

module.exports.tags = ["all", "fundme"];