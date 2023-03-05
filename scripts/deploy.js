// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

exports.main = async ()=>{
  const account = await hre.ethers.getContractFactory("account");
  // console.log(1);
  const acc = await account.deploy({value: 0});
  // console.log(2);
  await acc.deployed();
  // console.log(3);
  console.log(
    "Account created successfully and deployed to " + acc.address
  );

  return acc.address;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

// module.exports = main;
