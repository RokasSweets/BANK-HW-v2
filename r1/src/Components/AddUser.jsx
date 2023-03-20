import React from "react";
import { useState } from "react";
import "./UserForm.style.css";
import userService from "../Services/userService";

const AddUser = ({ onBack, onAddUser }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const onFirstNameChangeHandler = (e) => {
        setFirstName(e.target.value);
    };
    const onLastNameChangeHandler = (e) => {
        setLastName(e.target.value);
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        const data = {
            firstName,
            lastName,
            balance: 0,
        };
        let response = await userService.addNewUser(data);
        if (response.ok) {
            // Display a success message to the user
            alert("User added successfully");
        } else {
            // Handle errors
            alert("Error adding user");
        }
        onAddUser(data);
        onBack();
    };
    return (
        <div className="form-container">
            <div>
                <h3>New Client Form</h3>
            </div>
            <form onSubmit={onSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Enter Your first name"
                        value={firstName}
                        onChange={onFirstNameChangeHandler}
                    ></input>
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Enter Your last name"
                        value={lastName}
                        onChange={onLastNameChangeHandler}
                    ></input>
                </div>
                <div>
                    <input type="button" value="Back" className="adduser-btn" onClick={onBack}></input>
                    <input
                        disabled={firstName.length < 2 || lastName.length < 2}
                        className="adduser-btn"
                        type="submit"
                        value="Add User"
                    ></input>
                </div>
            </form>
        </div>
    );
};

export default AddUser;
