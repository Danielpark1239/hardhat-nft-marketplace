const { ethers, deployments, network } = require("hardhat")
const fs = require("fs")

const frontendContractsFile = "../nextjs-nft-marketplace-moralis/constants/networkMapping.json"

module.exports = async function () {
    if (process.env.UPDATE_FRONTEND) {
        console.log("Updating frontend...")
        await updateContractAddresses()
        console.log("Frontend updated!")
    }
}

async function updateContractAddresses() {
    await deployments.fixture("nftmarketplace")
    const nftMarketplace = await ethers.getContract("NftMarketplace")
    const chainId = network.config.chainId.toString()
    const contractAddresses = JSON.parse(fs.readFileSync(frontendContractsFile, "utf8"))
    if (chainId in contractAddresses) {
        if (!contractAddresses[chainId]["NftMarketplace"].includes(nftMarketplace.address)) {
            contractAddresses[chainId]["NftMarketplace"].push(nftMarketplace.address)
        }
    } else {
        contractAddresses[chainId] = { NftMarketplace: [nftMarketplace.address] }
    }
    fs.writeFileSync(frontendContractsFile, JSON.stringify(contractAddresses))
}

module.exports.tags = ["all", "frontend"]
