import { useState, useEffect } from "react";
import "./Home.style.css";
import UserList from "./UserList";
import { dummyUserList } from "./UserData";
import AddUser from "./AddUser";
import calculateTotalFunds from "../functions/calculateTotalFunds";
import FilterUsers from "./FilterUsers";
import userService from "../Services/userService";

const Home = () => {
    const [userList, setUserList] = useState(dummyUserList);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [shownPage, setShownPage] = useState("list");
    const [refresh, setRefresh] = useState(true);
    useEffect(() => {
        const fetchUsers = async () => {
            const users = await userService.fetchUsers();
            if (!users) {
                alert("No users found");
            }
            updateLists(users);
        };
        fetchUsers();
    }, [refresh]);
    const addUserClickHandler = () => {
        setShownPage("add");
    };
    const showListPage = () => {
        setShownPage("list");
    };
    const deleteUser = async (data) => {
        await userService.destroyUser(data);
        setRefresh((val) => !val);
    };
    const addUser = (data) => {
        updateLists([...userList, data]);
        setRefresh((val) => !val);
    };
    const updateLists = (userList) => {
        setUserList(userList);
        setFilteredUsers(userList);
    };
    return (
        <>
            <article className="article-header">
                <header>
                    <div className="header-center">
                        <h1>HW Bank U3</h1>
                    </div>
                    <div className="statistics">
                        <div className="client-number">
                            We have {userList.length} clients!
                        </div>
                        <div>
                            We are holding{" "}
                            {calculateTotalFunds(userList).toFixed(2)} €
                        </div>
                    </div>
                </header>
            </article>
            <section className="section-content">
                {shownPage === "list" && (
                    <>
                        <input
                            type="button"
                            value="New client"
                            onClick={addUserClickHandler}
                            className="add-user-btn"
                        />
                        <FilterUsers
                            userList={userList}
                            setFilteredUsers={setFilteredUsers}
                        />
                        <UserList
                            list={filteredUsers}
                            onDelete={deleteUser}
                            setRefresh={setRefresh}
                        />
                    </>
                )}
                {shownPage === "add" && (
                    <AddUser onBack={showListPage} onAddUser={addUser} />
                )}
            </section>
        </>
    )
}

export default Home;
