let fs = require('fs');
let sqlSchema = fs.readFileSync('app/data/comment-schema.sql').toString();

module.exports = function(db) {
    db.serialize(function() {
        db.run(sqlSchema);
    });
};


