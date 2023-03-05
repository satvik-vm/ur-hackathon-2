pragma solidity ^0.8.17;

contract account{
    address account_number;
    int amount;

    constructor(){
        account_number = address(this);
        amount = 500;
    } 

    function deposit(int money) public{
        amount = amount + money;
    }

    function withdraw(int money) public{
        if(money > amount){
            amount = 0;
        }
        if(money <= amount){
            amount -= money;
        }
    }

    function getBalance() view public returns (int){
        return amount;
    }
} 