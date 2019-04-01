module.exports = function (app, db) {
    
    // Update a comment
    // http://localhost:5000/api/comment
    // Sending a JSON body:
    // {
    //     "id": "existing id"
    //     "comment": "ExampleCommentText",
    //     "timestamp": "date",
    // }

    // or an array of comments:
    // [
    //     {...},{...}
    // ]
    app.put('/api/comment/', (req, res) => {

         let data = req.body;

        if (Array.isArray(data.constructor))
            processComments(req, res, db);
         else
            processComment(req, res, db);
    });
};

function processComments(req, res, db){
    for (let comment of req.body) {
        updateComment(comment, res, db);
    }
}

function processComment(req, res, db){
    validateRequest(req, res);
    updateComment(req.body, res, db);
}

function updateComment(req, res, db){
    let comment = req.comment;
    let timestamp = req.timestamp;
    let id = req.id;

    let sql = `update Comments
            set comment = ?, timestamp = ?
            where id = ?;`;

    let values = [comment, timestamp, id];

    db.serialize(function () {
        db.run(sql, values, function (err) {
            if (err){
                console.error(err);
                res.status(500).send(err);
            }
            else
                res.send();
        });
    });
}

function validateRequest(req, res) {
    let fs = require('fs');
    let schema = JSON.parse(fs.readFileSync('app/data/comment-schema-update.json', 'utf8'));

    let JaySchema = require('jayschema');
    let js = new JaySchema();
    let instance = req.body;

    js.validate(instance, schema, function (errs) {
        if (errs) {
            console.error(errs);
            res.status(400).send(errs);
        }
    });
}
