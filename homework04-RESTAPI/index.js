const express = require('express');
const joi = require('joi');
const fs = require('fs');
const path = require('path');
const e = require('express');

const app = express();
let uniqueID = 0;
const dataBasePath = path.join(__dirname, './database/users.json');

const userSchema = joi.object({
    firstName: joi.string().min(1).required(),
    secondName: joi.string().min(1).required(),
    age: joi.number().min(0).max(150).required(),
    city: joi.string().min(1).required()
});

app.use((req, res, next) => {
    try {
        const users = JSON.parse(fs.readFileSync(dataBasePath));
    } catch (err) {
        console.log("Initializing database!");
        fs.writeFileSync(dataBasePath, JSON.stringify({ 0: {} }, null, 2));
    }
    next();
});

app.use(express.json());

app.get('/users', (req, res) => {
    const users = JSON.parse(fs.readFileSync(dataBasePath));
    if (users) {
        res.send({ users });
    } else {
        res.status(404);
        res.send({ user: null });
    }
});

app.get('/users/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync(dataBasePath));
    const userID = +req.params.id;
    const user = users[userID];

    if (user) {
        res.send({ user });
    } else {
        res.status(404);
        res.send({ user: null });
    }
});

app.post('/users', (req, res) => {
    const result = userSchema.validate(req.body);
    if (result.error) {
        return res.status(404).send({ error: result.error.details });
    }

    const users = JSON.parse(fs.readFileSync(dataBasePath));
    for (const key of Object.keys(users)) {
        if (uniqueID < +key) uniqueID = +key;

    }
    users[++uniqueID] = req.body;
    fs.writeFileSync(dataBasePath, JSON.stringify(users, null, 2));
    res.send({ id: uniqueID });
    // res.send({ users });
});

app.put('/users/:id', (req, res) => {
    const result = userSchema.validate(req.body);
    if (result.error) {
        return res.status(404).send({ error: result.error.details });
    }

    const users = JSON.parse(fs.readFileSync(dataBasePath));
    const userID = +req.params.id;
    const user = users[userID];

    if (user) {
        user.firstName = req.body.firstName;
        user.secondName = req.body.secondName;
        user.age = req.body.age;
        user.city = req.body.city;
        fs.writeFileSync(dataBasePath, JSON.stringify(users, null, 2));
        res.send({ user });
    } else {
        res.status(404);
        res.send({ user: null });
    }

});

app.delete('/users/:id', (req, res) => {
    const userID = +req.params.id;
    const users = JSON.parse(fs.readFileSync(dataBasePath));
    const user = users[userID];

    if (user) {
        delete users[userID];
        fs.writeFileSync(dataBasePath, JSON.stringify(users, null, 2));
        res.send({ user });
    } else {
        res.status(404);
        res.send({ user: null });
    };
});

const port = 40000;

app.listen(port);
