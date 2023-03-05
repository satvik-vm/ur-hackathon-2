pragma solidity ^0.8.17;

contract savings{
    uint balance = 0;
    address owner;

    constructor(uint amount){
        balance = amount;
        owner = payable(msg.sender);
    }

    function deposit(uint amount) public {
        balance += amount;
    }

    function withdraw(uint amount) public{
        if(msg.sender == owner){
            if(balance > amount){
                balance -= amount;
            }
        }
    }

    function get_balance() public view returns (uint){
        return balance;
    }
}