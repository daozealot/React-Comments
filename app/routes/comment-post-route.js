module.exports = function (app, db) {
    
    // Add new comment
    // http://localhost:5000/api/comment
    // Sending a JSON body:
    // {
    //     "comment": "ExampleCommentText",
    //     "timestamp": "date",
    // }

    // or an array of comments:
    // [
    //     {...},{...}
    // ]
    app.post('/api/comment/', (req, res) => {

         let data = req.body;

        if (Array.isArray(data.constructor))
            processComments(req, res, db);
         else
            processComment(req, res, db);
    });
};

function processComments(req, res, db){
    for (let comment of req.body) {
        insertComment(comment, res, db);
    }
}

function processComment(req, res, db){
    validateAndInsertRequest(req, res, db);
}

function insertComment(req, res, db){
    let comment = req.comment;
    let timestamp = req.timestamp;

    let sql = `insert into Comments (comment, timestamp) 
            VALUES 
            (?, ?);`;

    let values = [comment, timestamp];

    db.serialize(function () {
        db.run(sql, values, function (err) {
            if (err){
                console.error(err);
                res.status(500).send(err);
            } else {
                res.send();
            }
        });
    });
}

function validateAndInsertRequest(req, res, db) {
    let fs = require('fs');
    let schema = JSON.parse(fs.readFileSync('app/data/comment-schema.json', 'utf8'));

    let JaySchema = require('jayschema');
    let js = new JaySchema();
    let instance = req.body;

    if (req.body.id) {
        res.status(400).send("ID cannot be submmited");
        return;
    }

    js.validate(instance, schema, function (errs) {
        if (errs) {
            console.error(errs);
            res.status(400).send(errs);
        } else {
            insertComment(req.body, res, db);
        }
    });
}
