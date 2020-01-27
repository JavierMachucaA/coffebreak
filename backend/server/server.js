const express = require("express");
const app = express();
const config = require("dotenv").config();
const mongoose = require('mongoose')
const bodyParser = require('body-parser');

const port = process.env.PORT;
// const dbUri =`mongodb://${process.env.USERDB}:${process.env.PASSDB}@${process.env.DBURI}/${process.env.COLLECTION}`
const dbUri ='mongodb://admin:admin123@localhost:27017/coffe';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(dbUri,{ useNewUrlParser: true,useUnifiedTopology: true  },
    (err,res)=>{
        console.log("Base de datos Conectada ...")
    }
)

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(require('../routes/index.route'));

app.get("/usersdb",(err,res) => {
    find('users',{}, function (err, docs) {
        res.json(docs);
    });
});
// Listen on port 5000
app.listen(port, () => {
  console.log(`Server is booming on port ${port}
Visit http://localhost:${port}`);
});

function find (name, query, cb) {
    mongoose.connection.db.collection(name, function (err, collection) {
       collection.find(query).toArray(cb);
   });
}