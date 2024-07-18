const express = require('express');

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

app.use(express.json())

app.get('/users', (req, res) => {
    res.send({ users });
});

app.post('/users', (req, res) => {
    uniqueID += 1;
    users.push({
        id: uniqueID,
        ...req.body
    })
    res.send({ id: uniqueID });
})

app.put('/users/:id', (req, res) => {
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

const port = 30000;

app.listen(port)
