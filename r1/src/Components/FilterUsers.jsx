import React from "react";

const FilterUsers = ({ userList, setFilteredUsers }) => {
    const filterWithBalance = () => {
        console.log(userList);
        const usersWithBalance = userList.filter((user) => user.balance > 0);
        console.log(usersWithBalance);
        setFilteredUsers(usersWithBalance);
    };
    const filterWithNoBalance = () => {
        const usersWithNoBalance = userList.filter(
            (userList) => userList.balance === 0
        );
        setFilteredUsers(usersWithNoBalance);
    };
    const clearFilter = () => {
        setFilteredUsers(userList);
    };
    return (
        <div>
            <p className="filter-btn-text">Filter by:</p>
            <button className="filter-btn" onClick={filterWithNoBalance}>
                Zero balance
            </button>
            <p className="filter-btn-text">,</p>
            <button className="filter-btn" onClick={filterWithBalance}>
                Positive balance
            </button>
            <p className="filter-btn-text">or</p>
            <button className="filter-btn" onClick={clearFilter}>
                Show all clients
            </button>
        </div>
    );
};

export default FilterUsers;
