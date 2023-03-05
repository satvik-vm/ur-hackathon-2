const { ethers } = require("hardhat")
const getBalance = require("./getBalance");

exports.main = async (account_number, amount) => {
    console.log("Amount to be deposited: " + amount);
    const Acc = await ethers.getContractFactory("account");

    const acc = await Acc.attach(account_number);

    var mss = await acc.deposit(parseInt(amount));

    await new Promise(done => setTimeout(() => done(), 5000));

    const balance = parseInt((await acc.getBalance()).toString());

    mss["balance"] = balance;

    return mss;
}