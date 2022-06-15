const { ethers, network } = require("hardhat")
const { moveBlocks } = require("../utils/move-blocks")

const TOKENID = 2

async function buyItem() {
    const nftMarketplace = await ethers.getContract("NftMarketplace")
    const basicNft = await ethers.getContract("BasicNFT")
    const listing = await nftMarketplace.getListing(basicNft.address, TOKENID)
    const price = listing.price.toString()
    const tx = await nftMarketplace.buyItem(basicNft.addres, TOKENID, { value: price })
    await tx.wait(1)

    console.log("Bought NFT!")
    if ((network.config.chainId = "31337")) {
        await moveBlocks(2, (sleepAmount = 1000))
    }
}

buyItem()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
