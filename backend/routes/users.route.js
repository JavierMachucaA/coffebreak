const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

app.get("/usersdb",(err,res) => {
    find('users',{}, function (err, docs) {
        res.json(docs);
    });
});

function find (name, query, cb) {
    mongoose.connection.db.collection(name, function (err, collection) {
       collection.find(query).toArray(cb);
   });
}

module.exports = app;