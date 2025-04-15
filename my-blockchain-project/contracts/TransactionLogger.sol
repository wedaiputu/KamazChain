// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TransactionLogger {
    struct Transaction {
        string agentId;
        uint256 jumlah;
        uint256 totalPrice;
    }

    Transaction[] public transactions;

    event TransactionLogged(string agentId, uint256 jumlah, uint256 totalPrice);

    function logTransaction(string memory agentId, uint256 jumlah, uint256 totalPrice) public {
        transactions.push(Transaction(agentId, jumlah, totalPrice));
        emit TransactionLogged(agentId, jumlah, totalPrice);
    }

    function getTransaction(uint256 index) public view returns (Transaction memory) {
        require(index < transactions.length, "Out of range");
        return transactions[index];
    }

    function getTransactionCount() public view returns (uint256) {
        return transactions.length;
    }
}
