import React, { useState } from "react";
import "./UserList.style.css";
import UserModal from "./UserModal";
import userService from "../Services/userService";

const UserList = ({ list, onDelete, setRefresh }) => {
    const [balanceUpdates, setBalanceUpdates] = useState("");

    const handleInputChange = (userId, amount) => {
        setBalanceUpdates({ ...balanceUpdates, [userId]: amount });
    };
    const handleAddBalance = async (id, balance) => {
        if (parseInt(balance) <= 0) {
            alert("Amount must be greater than 0");
            setBalanceUpdates({ ...balanceUpdates, [id]: "" });
            return;
        }
        let response = await userService.addBalance(id, balance);
        if (response.ok) {
            // Refresh the user list
        } else {
            // Handle errors
            alert("Error updating balance");
        }
        setRefresh((val) => !val);
        setBalanceUpdates({ ...balanceUpdates, [id]: "" });
    };
    const handleRemoveBalance = async (id, balance) => {
        const user = list.find((user) => user.id === id);

        if (parseInt(balance) > user.balance) {
            alert("Cannot remove more balance than there is");
            setBalanceUpdates({ ...balanceUpdates, [id]: "" });
            return;
        }

        let response = await userService.removeBalance(id, balance);
        if (response.ok) {
            // Refresh the user list
        } else {
            // Handle errors
            alert("Error updating balance");
        }
        setRefresh((val) => !val);
        setBalanceUpdates({ ...balanceUpdates, [id]: "" });
    };
    const [showModal, setShowModal] = useState(false);
    const onCloseModal = () => {
        setShowModal(false);
    };
    const [showUserData, setShowUserData] = useState(null);

    const viewUser = (user) => {
        setShowUserData(user);
        setShowModal(true);
    };
    return (
        <div>
            <article>
                <h3 className="list-header">Bank users list</h3>
            </article>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Balance</th>
                        <th>Funds Update</th>
                        <th>User Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {list
                        .sort((a, b) => a.lastName.localeCompare(b.lastName))
                        .map((user) => (
                            <tr key={user.id}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.balance.toFixed(2)}</td>
                                <td>
                                    <input
                                        type="number"
                                        value={balanceUpdates[user.id] || ""}
                                        onChange={(e) =>
                                            handleInputChange(
                                                user.id,
                                                e.target.value
                                            )
                                        }
                                    />
                                    <button
                                        className="balance-update-btn"
                                        onClick={() =>
                                            handleAddBalance(
                                                user.id,
                                                balanceUpdates[user.id]
                                            )
                                        }
                                    >
                                        Add
                                    </button>
                                    <button
                                        className="balance-update-btn"
                                        onClick={() =>
                                            handleRemoveBalance(
                                                user.id,
                                                balanceUpdates[user.id]
                                            )
                                        }
                                    >
                                        Remove
                                    </button>
                                </td>
                                <td>
                                    <div>
                                        <input
                                            className="actions-btn"
                                            type="button"
                                            value="View"
                                            onClick={() => viewUser(user)}
                                        />

                                        <input
                                            className="actions-btn"
                                            disabled={user.balance > 0}
                                            type="button"
                                            value="Delete"
                                            onClick={() => onDelete(user.id)}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            {showModal && showUserData !== null && (
                <UserModal onClose={onCloseModal} user={showUserData} />
            )}
        </div>
    );
};

export default UserList;
