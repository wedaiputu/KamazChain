const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contract from address:", deployer.address);

  // const Contract = await hre.ethers.getContractFactory("TransactionLogger");
  const Contract = await hre.ethers.getContractFactory("DetailTransaction");
  const contract = await Contract.deploy();

  await contract.waitForDeployment();
  console.log("Contract deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
