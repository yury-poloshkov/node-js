const express = require('express');
const joi = require('joi');
const fs = require('fs');
const path = require('path');

const app = express();
let uniqueID = 0;

const users = [
    // {
    //     firstName: 'Ivan',
    //     secondName: 'Ivanov',
    //     age: 35,
    //     city: 'Moscow'
    // },
    // {
    //     firstName: 'Petr',
    //     secondName: 'Petrov',
    //     age: 45,
    //     city: 'Tagil'
    // }
];

const userSchema = joi.object({
    firstName: joi.string().min(1).required(),
    secondName: joi.string().min(1).required(),
    age: joi.number().min(0).max(150).required(),
    city: joi.string().min(1).required()
});

app.use(express.json());

app.get('/users', (req, res) => {
    res.send({ users });
});

app.get('/users/:id', (req, res) => {
    const userID = +req.params.id;
    const user = users.find(user => user.id === userID);

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

    uniqueID += 1;
    users.push({
        id: uniqueID,
        ...req.body
    })
    res.send({ id: uniqueID });
});

app.put('/users/:id', (req, res) => {
    const result = userSchema.validate(req.body);
    if (result.error) {
        return res.status(404).send({ error: result.error.details });
    }

    const userID = +req.params.id;
    const user = users.find(user => user.id === userID);

    if (user) {
        user.firstName = req.body.firstName;
        user.secondName = req.body.secondName;
        user.age = req.body.age;
        user.city = req.body.city;
        res.send({ user });
    } else {
        res.status(404);
        res.send({ user: null });
    }

});

app.delete('/users/:id', (req, res) => {
    const userID = +req.params.id;
    const user = users.find(user => user.id === userID);

    if (user) {
        users.splice(users.indexOf(user), 1);
        res.send({ user });
    } else {
        res.status(404);
        res.send({ user: null });
    };
});

const port = 30001;

app.listen(port);
