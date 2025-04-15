// scripts/deploy.js

const hre = require("hardhat");

async function main() {
  const TransactionLogger = await hre.ethers.getContractFactory("TransactionLogger");
  const contract = await TransactionLogger.deploy();
  await contract.waitForDeployment();

  console.log("✅ Contract deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
