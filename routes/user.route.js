const express = require('express');

//router basically acts like a mini app.
const router = express.Router();



let users = [
    {
        'id':0,
        'name': 'a',
        'age': 2
    },
    {
        'id':1,
        'name': 'b',
        'age': 3
    }
]
//all endpoints do not require /users/ anymore

router.get('/', function(req,res) {
    return res.send(users);
})

router.get('/:id', function(req,res) {
    let id = req.params.id;
    return res.send(users[id]);
})

router.post('/', function(req,res) {
    users.push(req.body);
    return res.send(users);
})

router.put('/:index', function(req,res){
    let index = req.params.index;
    users[index] = req.body;
    return res.send(users);
})

router.delete('/last', function(req,res){
    res.send(users.pop());
})
//make it available to be used in index.js
module.exports = router;