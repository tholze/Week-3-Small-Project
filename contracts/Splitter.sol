pragma solidity ^0.4.3;

/// @title Small Project
/// @author Tino Holzer
contract Splitter {
	address public A;
	address public B;
	address private owner;

	/// @notice Constructor
	/// @dev Constructor, will set you to the owner of the contract
	/// @param AA The first address that will receive half of the sent amount
	/// @param BB The second address that will receive the second half of the sent amount
	function Splitter(address AA, address BB){
		owner = msg.sender;
		A = AA;
		B = BB;
	}

	/// @notice get the contracts balance
	/// @return The contracts balance
	function getBalance() returns(uint balance) {
		return this.balance;
	}

	/// @notice kill the contract
	function killMe() returns (bool success) {
		if (msg.sender == owner) {
			suicide(owner);
			return true;
		}
	}

	///@notice fallback function, splits the balance of the contract to address A and B
	function () payable{
		uint amount1 = this.balance / 2;
		uint amount2 = this.balance - amount1;
		
		if (!A.send(amount1)) {
			throw;
			}
		if (!B.send(amount2)) {
			throw;
		}
	}
}