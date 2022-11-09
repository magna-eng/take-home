import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";
import { expect } from "chai";
import { Airdrop, MagnaToken } from "../typechain-types";

describe("Airdrop", function () {
  let token: MagnaToken;
  let airdrop: Airdrop;

  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let addr3: SignerWithAddress;

  before(async function () {
    [owner, addr1, addr2, addr3] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("MagnaToken");
    token = (await Token.deploy()) as MagnaToken;
    await token.deployed();

    const Airdrop = await ethers.getContractFactory("Airdrop");
    airdrop = (await Airdrop.deploy(token.address)) as Airdrop;
    await airdrop.deployed();
  });

  it("Token contract deployed", async function () {
    expect(token.address).to.properAddress;
  });

  it("Airdrop contract deployed", async function () {
    expect(airdrop.address).to.properAddress;
  });

  it("Airdrop contract has token address", async function () {
    expect(await airdrop.token()).to.equal(token.address);
  });

  it("Reverts if airdropTokens is called by nonowner", async function () {
    await expect(
      airdrop.connect(addr1).airdropTokens([addr1.address], [100])
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("Reverts if airdropTokens is called with different length arrays", async function () {
    await expect(
      airdrop.airdropTokens([addr1.address], [100, 200])
    ).to.be.revertedWith("Airdrop: Recipients and amount length mismatch");
  });

  it("Reverts if airdropTokens is called with insufficient ERC20 allownace", async function () {
    await expect(
      airdrop.airdropTokens([addr1.address], [100])
    ).to.be.revertedWith("ERC20: insufficient allowance");
  });

  it("Airdrop works", async function () {
    const balanceBefore = await token.balanceOf(owner.address);

    await token.approve(airdrop.address, 600);
    await airdrop.airdropTokens(
      [addr1.address, addr2.address, addr3.address],
      [100, 200, 300]
    );

    expect(await token.balanceOf(addr1.address)).to.equal(100);
    expect(await token.balanceOf(addr2.address)).to.equal(200);
    expect(await token.balanceOf(addr3.address)).to.equal(300);
    expect(await token.balanceOf(owner.address)).to.equal(
      balanceBefore.sub(600)
    );
  });
});
