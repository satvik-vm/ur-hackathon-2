const { ethers } = require("hardhat")

exports.main = async (account_number) => {
    const Acc = await ethers.getContractFactory("account");

    const acc = await Acc.attach(account_number);

    const balance = parseInt((await acc.getBalance()).toString());

    return balance;
}