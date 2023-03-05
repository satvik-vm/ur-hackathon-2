pragma solidity ^0.8.17;

contract crowd_funding{
    string head;
    address account_number;
    // int creation_date;
    // int time;    //TODO: add time component
    int total_amount;
    int current_amount;

    constructor(int amount, string memory title){
        account_number = address(this);
        total_amount = amount;
        head = title;
        current_amount = 0;
    }

    function deposit(int amount) public returns (bool){
        if(current_amount + amount < total_amount){
            return false;
        }
        else{
            current_amount += amount;
            return true;
        }
    }

    function getBalance() public view returns (int){
        return total_amount;
    }
}