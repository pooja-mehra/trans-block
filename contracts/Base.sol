pragma solidity >=0.4.22 <0.9.0;

contract Base{
    address private _owner;

    constructor() public{
    _owner = msg.sender;
  }

    function owner() public view returns(address) {
    return _owner;
  }

  /**
  * @dev Throws error if called by any account other than the owner.
  */
  modifier onlyOwner() {
    require(isOwner());
    _;
  }

 /**
  * @return true if `msg.sender` is the owner of the contract.
  */
  function isOwner() public view returns(bool) {
    return msg.sender == _owner;
  }
  
}