const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("Token", function () {
    async function deployContract() {
        const [deployer, owner] = await ethers.getSigners();
        const Contract = await ethers.getContractFactory("TokenSample");
        const initAmount = 10000 * 10000;
        const contract = await Contract.deploy(owner.address, initAmount);
        await contract.deployed();
        return { contract, deployer, owner, initAmount };
    };
    describe("deploy", function () {
        it("owner", async function () {
            const { contract, name, symbol, deployer, owner, initAmount } = await loadFixture(deployContract);
            expect(await contract.owner()).to.equal(owner.address);
        });
        it("name", async function () {
            const { contract, name, symbol, deployer, owner, initAmount } = await loadFixture(deployContract);
            expect(await contract.name()).to.equal("Token Sample");
        });
        it("symbol", async function () {
            const { contract, name, symbol, deployer, owner, initAmount } = await loadFixture(deployContract);
            expect(await contract.symbol()).to.equal("TSC");
        });
        it("initAmount", async function () {
            const { contract, name, symbol, deployer, owner, initAmount } = await loadFixture(deployContract);
            expect(await contract.totalSupply()).to.equal(initAmount);
        });
    });
    describe("onlyOwner", function () {
        it("mint <owner>", async function () {
            const { contract, name, symbol, deployer, owner, initAmount } = await loadFixture(deployContract);
            const totalSupply = await contract.totalSupply();
            const mintAmount = 100;
            await contract.connect(owner).mint(mintAmount);
            expect(await contract.totalSupply()).to.equal(totalSupply.add(mintAmount));
        });
        it("mint <not owner>", async function () {
            const { contract, name, symbol, deployer, owner, initAmount } = await loadFixture(deployContract);
            const mintAmount = 100;
            await expect(contract.connect(deployer).mint(mintAmount)).to.rejected;
        });
        it("burn <owner>", async function () {
            const { contract, name, symbol, deployer, owner, initAmount } = await loadFixture(deployContract);
            const totalSupply = await contract.totalSupply();
            const burnAmount = 100;
            await contract.connect(owner).burn(burnAmount);
            expect(await contract.totalSupply()).to.equal(totalSupply.sub(burnAmount));
        });
        it("burn <not owner>", async function () {
            const { contract, name, symbol, deployer, owner, initAmount } = await loadFixture(deployContract);
            const burnAmount = 100;
            await expect(contract.connect(deployer).burn(burnAmount)).to.rejected;
        });
    });
    describe("deploy fail", function () {
        it("deploy zero address", async function () {
            const Contract = await ethers.getContractFactory("TokenSample");
            const initAmount = 1000 * 1000;
            const zeroAddress = "0x0000000000000000000000000000000000000000";
            await expect(Contract.deploy(zeroAddress, initAmount)).to.rejected;
        });
    });
});