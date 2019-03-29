pragma solidity ^0.5.2;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol';
import './Test20.sol';

contract Test721 is ERC721Full {

    event Debug(address token);

    constructor(string memory _name, string memory _symbol) ERC721Full(_name, _symbol) public {
    }

    function mint(string memory _name, string memory _symbol) public {
        uint nextId = totalSupply();
        super._mint(msg.sender, nextId);
        Test20 token = new Test20(_name, _symbol, msg.sender);
        emit Debug(address(token));
    }
}
