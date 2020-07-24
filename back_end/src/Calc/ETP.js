const db = require('../configs/mysql.js');

exports.getStuff = () =>{
    var test
    db.all(`select * from data`,(err,row)=>{
        if(err) reject (err);
        test = row[0];
        return test.json(row[0])
    });
}