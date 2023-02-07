async function main() {
  const [deployer, owner] = await ethers.getSigners();
  const Contract = await ethers.getContractFactory("TokenSample");
  const initAmount = 10000 * 10000;
  const contract = await Contract.deploy(owner.address, initAmount);
  await contract.deployed();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
