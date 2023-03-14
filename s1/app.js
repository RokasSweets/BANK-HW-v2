const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const app = express();
const port = 3003;

app.use(cors());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());
app.get("/users", (req, res) => {
    let allData = fs.readFileSync("./data/users.json", "utf8");
    allData = JSON.parse(allData);
    res.json(allData);
});

app.post("/users", (req, res) => {
    let allData = fs.readFileSync("./data/users.json", "utf8");
    allData = JSON.parse(allData);
    const id = uuidv4();
    const data = {
        id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        balance: req.body.balance,
    };
    allData.push(data);
    allData = JSON.stringify(allData);
    fs.writeFileSync("./data/users.json", allData, "utf8");
    res.json({
        message: { text: "New user is saved", type: "success" },
    });
});
app.delete("/users/:id", (req, res) => {
    let allData = fs.readFileSync("./data/users.json", "utf8");
    allData = JSON.parse(allData);
    console.log(req.params.id);
    let deletedData = allData.filter((d) => req.params.id !== d.id);
    deletedData = JSON.stringify(deletedData);
    fs.writeFileSync("./data/users.json", deletedData, "utf8");
    res.json({ message: { text: "The user was deleted", type: "danger" } });
});
// app.put("/users/:action/:id", (req, res) => {
//     let allData = fs.readFileSync("./data/users.json", "utf8");
//     allData = JSON.parse(allData);
//     let editedData;
//     if (req.params.action == "add") {
//         editedData = allData.map((d) =>
//             req.params.id === d.id
//                 ? { ...d, number: d.number + req.body.number }
//                 : { ...d }
//         );
//     } else if (req.params.action == "rem") {
//         editedData = allData.map((d) =>
//             req.params.id === d.id
//                 ? { ...d, number: d.number - req.body.number }
//                 : { ...d }
//         );
//     }
//     editedData = JSON.stringify(editedData);
//     fs.writeFileSync("./data/users.json", editedData, "utf8");

//     res.json({ message: { text: "Number was edited", type: "info" } });
// });
app.patch("/users/:id/balance", (req, res) => {
    const userId = decodeURI(req.params.id);
    const amount = parseInt(req.body.balance);
    // read the JSON file
    const users = JSON.parse(fs.readFileSync("./data/users.json", "utf8"));

    // find the user with the matching ID
    const user = users.find((u) => u.id === userId);

    // if user is not found, return an error
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    // update the user's balance
    user.balance += amount;

    // write the updated data back to the JSON file
    fs.writeFileSync("./data/users.json", JSON.stringify(users, null, 2));

    // return the updated user data
    res.json(user);
});

app.listen(3003, () => {
    console.log(`Server running on port ${port}`);
});
