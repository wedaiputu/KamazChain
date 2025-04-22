// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DetailTransactionLogger {
    struct DetailTransaksi {
        uint256 id;
        uint256 transaksi_id;
        string server;
        string user;
        string ipAddress;
        string mac;
        string uptime;
        string bytes_in;
        string bytes_out;
        string time_left;
        string login_by;
        string comment;
        string created_at;
        string updated_at;
    }

    DetailTransaksi[] public detailTransaksis;

    event DetailTransactionLogged(uint256 id, uint256 transaksi_id);

    function logDetailTransactionsBatch(
        uint256[] calldata ids,
        uint256[] calldata transaksi_ids,
        string[] calldata servers,
        string[] calldata users,
        string[] calldata ipAddresses,
        string[] calldata macs,
        string[] calldata uptimes,
        string[] calldata bytes_in,
        string[] calldata bytes_out,
        string[] calldata time_left,
        string[] calldata login_by,
        string[] calldata comments,
        string[] calldata created_ats,
        string[] calldata updated_ats
    ) public {
        uint256 minLength = _minArrayLength(
            ids.length,
            transaksi_ids.length,
            servers.length,
            users.length,
            ipAddresses.length,
            macs.length,
            uptimes.length,
            bytes_in.length,
            bytes_out.length,
            time_left.length,
            login_by.length,
            comments.length,
            created_ats.length,
            updated_ats.length
        );

        for (uint256 i = 0; i < minLength; i++) {
            detailTransaksis.push(
                DetailTransaksi({
                    id: ids[i],
                    transaksi_id: transaksi_ids[i],
                    server: servers[i],
                    user: users[i],
                    ipAddress: ipAddresses[i],
                    mac: macs[i],
                    uptime: uptimes[i],
                    bytes_in: bytes_in[i],
                    bytes_out: bytes_out[i],
                    time_left: time_left[i],
                    login_by: login_by[i],
                    comment: comments[i],
                    created_at: created_ats[i],
                    updated_at: updated_ats[i]
                })
            );

            emit DetailTransactionLogged(ids[i], transaksi_ids[i]);
        }
    }

    function _minArrayLength(
        uint256 a,
        uint256 b,
        uint256 c,
        uint256 d,
        uint256 e,
        uint256 f,
        uint256 g,
        uint256 h,
        uint256 i,
        uint256 j,
        uint256 k,
        uint256 l,
        uint256 m,
        uint256 n
    ) private pure returns (uint256) {
        uint256 min = a;
        if (b < min) min = b;
        if (c < min) min = c;
        if (d < min) min = d;
        if (e < min) min = e;
        if (f < min) min = f;
        if (g < min) min = g;
        if (h < min) min = h;
        if (i < min) min = i;
        if (j < min) min = j;
        if (k < min) min = k;
        if (l < min) min = l;
        if (m < min) min = m;
        if (n < min) min = n;
        return min;
    }

    function getAllDetailTransactions() public view returns (DetailTransaksi[] memory) {
        return detailTransaksis;
    }
}
