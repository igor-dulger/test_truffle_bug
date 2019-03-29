pragma solidity ^0.5.2;

import 'openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol';

contract Test20 is ERC20, ERC20Detailed {
    constructor(string memory _name, string memory _symbol, address _owner) ERC20Detailed(_name, _symbol, 18) public {
        _mint(_owner, 100*10**18);
    }
}
