// SPDX-License-Identifier: MIT
pragma solidity =0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Airdrop is Ownable {
    address public token;

    constructor(address _token) {
        token = _token;
    }

    function airdropTokens(
        address[] memory _recipients,
        uint256[] memory amount
    ) external onlyOwner {
        require(
            _recipients.length == amount.length,
            "Airdrop: Recipients and amount length mismatch"
        );
        for (uint256 i = 0; i < _recipients.length; i++) {
            IERC20(token).transferFrom(msg.sender, _recipients[i], amount[i]);
        }
    }
}
