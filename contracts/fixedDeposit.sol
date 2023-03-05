pragma solidity ^0.8.17;

import "./account.sol";
contract fixedDeposit{
    uint amount;
    uint time;
    address savings_contract_address;
    address account_number;
    address main_account_number;

    constructor(uint __amount, uint __time, address __account_number){
        amount = __amount;
        time = __time;
        main_account_number = __account_number;
        account_number = address(this);
    }

    function check() public view returns (bool){
        if(block.timestamp > time)  return true;
        else return false;
    }

    function transfer_amount(address add) public returns (bool){
        // TODO: SEE HOW TO DETERMINE CONTRACT THROUGH ADDRESS
    }
}