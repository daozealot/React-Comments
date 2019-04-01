module.exports = function(app, db) {

  // Load comments by ID: http://localhost:5000/api/comments/id/$id
  // example: http://localhost:5000/api/comments/id/15
  app.get('/api/comments/id/:id', (req, res) => {
    processData(res, "SELECT * FROM Comments where id == "+req.params.id);
  });

  // Load all comments: http://localhost:5000/api/comments/
  app.get('/api/comments', (req, res) => {
    processData(res, "SELECT * FROM Comments");
  });

  // Load comments: http://localhost:5000/api/comments/sort/$direction/$attribute
  // example: http://localhost:5000/api/comments/sort/asc/timestamp
  //          http://localhost:5000/api/comments/sort/desc/timestamp
  // $attribute = ['id', 'comment', 'timestamp']*
  // $direction [ASC or DESC]C]*
  // * the direction is checked and when wrong will return a 401 business error.
  app.get('/api/comments/sort/:direction/:way', (req, res) => {
    let way = req.params.way;
    let direction = req.params.direction;

    if(direction !== "asc" &&
        direction !== "desc"){
      res.status(404).send("Sorting direction invalid!");
    }

    processData(res, "SELECT * FROM Comments order by " + way + " " + direction);
  });


  function processData(res, sql){
    db.serialize(function() {
      db.all(sql, 
        function(err, rows) {
          if(err){
            console.error(err);
            res.status(500).send(err);
          } else {
            sendData(res, rows, err);
          }
      });
    });
  }

  function sendData(res, data, err){
    if (data[0]) {
      res.send(data);
    } else {
      res.send([]);
    }
  }
};
