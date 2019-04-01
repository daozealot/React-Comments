module.exports = function (app, db) {
    
    // Delete a comment
    // http://localhost:5000/api/comment
    // Sending a JSON body: (ID is needed)
    // {
    //     "id": "12"
    // }

    // or an array of comments:
    // [
    //     {...},{...}
    // ]
    app.delete('/api/comment/', (req, res) => {
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
    updateComment(req.body, res, db);
}

function updateComment(comment, res, db){
    let id = comment.id;

    if(!id){
        res.status(400).send("ID is mandatory");
    } else {
        let sql = `delete from Comments where id = ?;`;
        let values = [id];

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
}

