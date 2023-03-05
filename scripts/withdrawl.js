const { ethers } = require("hardhat");

exports.main = async (account_number, amount) => {
    const Acc = await ethers.getContractFactory("account");

    const acc = await Acc.attach(account_number);

    const mss = await acc.withdraw(parseInt(amount));

    await new Promise(done => setTimeout(() => done(), 5000));

    const balance = parseInt((await acc.getBalance()).toString());
    console.log(balance);

    mss["balance"] = balance;

    return mss;
}