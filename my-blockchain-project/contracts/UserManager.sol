// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserManager {
    struct User {
        string name;
        uint256 balance;
        bool active;
    }

    mapping(uint256 => User) public users;
    uint256 public userCount;

    event UserCreated(uint256 id, string name, uint256 balance);
    event UserUpdated(uint256 id, string name, uint256 balance, bool active);
    event UserDeleted(uint256 id);

    function createUser(string memory _name, uint256 _balance) public {
        users[userCount] = User(_name, _balance, true);
        emit UserCreated(userCount, _name, _balance);
        userCount++;
    }

    function getUser(uint256 _id) public view returns (User memory) {
        require(_id < userCount, "User not found");
        return users[_id];
    }

    function updateUser(uint256 _id, string memory _name, uint256 _balance, bool _active) public {
        require(_id < userCount, "User not found");
        users[_id] = User(_name, _balance, _active);
        emit UserUpdated(_id, _name, _balance, _active);
    }

    function deleteUser(uint256 _id) public {
        require(_id < userCount, "User not found");
        users[_id].active = false;
        emit UserDeleted(_id);
    }
}
