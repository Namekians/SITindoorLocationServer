//mongod --port 27017 --dbpath=./data
var mongo = require('mongoskin');
var MongoClient = mongo.MongoClient;
var db = MongoClient.connect('mongodb://localhost:27017/test');


var DAO = {};





DAO.quickFind = function quickFind(targetCollection, query, callback) {

    db.collection(targetCollection).find(query).toArray(function(err, docs) {
        if (err) {
            throw err;
        }
        callback(docs);
        db.close();
    });

}

DAO.quickInsert = function quickInsert(targetCollection, query, doc, callback) {
    db.collection(targetCollection).update(query, doc, function(err) {
        if (err) {
            throw err;
        }
        callback();
        db.close();
    });

}


module.exports = DAO





function query(db, targetCollection, query, fields) {

    db.collection(targetCollection).find(query, fields).toArray(function(err, docs) {
        if (err) {
            throw err;
        }
        console.log(docs);
        db.close();
    });

}

function insert(db, targetCollection, doc) {

    db.collection(targetCollection).c(doc, {
        w: 1
    }, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(JSON.stringify(doc))
        db.close();
    });

}

function update(db, targetCollection, query, newData) {

    db.collection(targetCollection).update(query, newData, function(err) {
        if (err) {
            throw err;
        }
        db.close();
    });

}

function remove(db, targetCollection, query) {
    db.collection(targetCollection).remove(query, function(err) {
        if (err) {
            throw err;
        }
        db.close();
    });
}

function count(db, targetCollection, query) {
    db.collection(targetCollection).count(query, function(err, count) {
        if (err) {
            throw err;
        }
        console.log(count);
        db.close();
    });
}

function aggregate(db, targetCollection, pipelines) {
    db.collection(targetCollection).aggregate(pipelines).toArray(function(err, result) {
        console.log(result[0].avg.toFixed(2));
        db.close();
    });
}
