const { ethers, deployments, network } = require("hardhat")
const { moveBlocks } = require("../utils/move-blocks")

async function mint() {
    await deployments.fixture(["basicnft"])
    const basicNft = await ethers.getContract("BasicNFT")

    console.log("Minting...")
    const mintTx = await basicNft.mintNFT()
    const mintTxReceipt = await mintTx.wait(1)
    const tokenId = mintTxReceipt.events[0].args.tokenId
    console.log(`Token ID: ${tokenId}`)
    console.log(`NFT Addres: ${basicNft.address}`)

    if ((network.config.chainId = "31337")) {
        await moveBlocks(2, (sleepAmount = 1000))
    }
}

mint()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
