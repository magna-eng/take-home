# Magna Take-Home Assessment

## Smart Contracts:
- `MagnaToken.sol` -> an example ERC20 token that is deployed for the Airdrop
- `Airdrop.sol` -> a simple airdrop contract that sends ERC20 tokens to an array of addresses

## Contract Setup:
1. Run `yarn` in this directory to install all required dependencies.
2. Split your terminal into 2 windows. 
3. In one, run `yarn hardhat node` to run the hardhat chain locally on your machine. 
4. In the other, run `yarn hardhat run scripts/deploy.ts`. Make sure to take note of the contract addresses that are printed to the console when this command is ran, as you will use these to call the contracts from your dapp. This deploy script does the following:
   1. Deploy the ERC20 token contract and mint tokens to Hardhat Account #0 (listed in the terminal output of the `yarn hardhat node` command).
   2. Deploy the Airdrop contract while passing our ERC20 token's address to the constructor of the Airdrop contract.

## Contract Tests:
We have included a suite of tests for the Airdrop contract that you can refer to for basic contract functionality. These can be ran by running `yarn hardhat test`. Feel free to edit the test cases to better understand the functionality/limitations of the Airdrop contract.