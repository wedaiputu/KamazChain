// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TransactionLogger {
    struct Transaction {
        uint256 agent_id;
        uint256 total_jumlah;
        uint256 total_harga;
    }

    Transaction[] public transactions;

    event TransactionLogged(uint256 agent_id, uint256 total_jumlah, uint256 total_harga);

    function logTransaction(uint256 agent_id, uint256 total_jumlah, uint256 total_harga) public {
        transactions.push(Transaction(agent_id, total_jumlah, total_harga));
        emit TransactionLogged(agent_id, total_jumlah, total_harga);
    }

    function logTransactionsBatch(
        uint256[] calldata agent_ids,
        uint256[] calldata total_jumlahs,
        uint256[] calldata total_hargas
    ) public {
        require(
            agent_ids.length == total_jumlahs.length && total_jumlahs.length == total_hargas.length,
            "Array length mismatch"
        );

        for (uint256 i = 0; i < agent_ids.length; i++) {
            transactions.push(Transaction(agent_ids[i], total_jumlahs[i], total_hargas[i]));
            emit TransactionLogged(agent_ids[i], total_jumlahs[i], total_hargas[i]);
        }
    }

    function getTransaction(uint256 index) public view returns (Transaction memory) {
        require(index < transactions.length, "Out of range");
        return transactions[index];
    }

    function getTransactionCount() public view returns (uint256) {
        return transactions.length;
    }

    function getAllTransactions() public view returns (Transaction[] memory) {
        return transactions;
    }
}
