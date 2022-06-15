const { ethers, deployments, network } = require("hardhat")
const { moveBlocks } = require("../utils/move-blocks")

const TOKENID = 1

async function cancel() {
    await deployments.fixture(["nftmarketplace", "basicnft"])
    const nftMarketplace = await ethers.getContract("NftMarketplace")
    const basicNft = await ethers.getContract("BasicNFT")
    const tx = await nftMarketplace.cancelListing(basicNft.address, TOKENID)
    await tx.wait(1)
    console.log("NFT Canceled!")
    if (network.config.chainId == "31337") {
        await moveBlocks(2, (sleepAmount = 1000))
    }
}

cancel()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
