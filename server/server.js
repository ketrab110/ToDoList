const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');



app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "toDoList"
});

/*app.get('/', function (req, res) {  
    
    con.connect((err) => {
        con.query(`SELECT * FROM items`, (err, result) => {
            if (result.length)
                res.json(true);
            else
                res.json(false);
        })


    })

})*/


con.connect((err) => {
  if (err)
    throw err
  console.log('mysql connection');
})




app.get('/date', cors(), (req, res) => { 
    con.query(`SELECT * FROM items`, function (err, result, fields) {      
      if (err) throw err;     
      res.json(JSON.parse(JSON.stringify(result)));
    });
    
  });
  
app.get('/add', cors(), (req, res) => { 
  const { content } = req.query
  console.log(content)
    con.query(`INSERT INTO items (content) VALUES ('${content}') `, function (err, result, fields) {      
      if (err) throw err;     
      res.json(JSON.parse(JSON.stringify(result)));
    });
    
});
  
app.get('/remove', cors(), (req, res) => { 
  const { id } = req.query
  console.log(id)
    con.query(`DELETE FROM items WHERE id=${id} `, function (err, result, fields) {      
      if (err) throw err;     
      res.json(JSON.parse(JSON.stringify(result)));
    });
    
  });
 
  /*app.get('/edit', cors(), (req, res) => { 
    const { id,content } = req.query
    console.log(id)
      con.query(`UPDATE items SET content='${content}' WHERE id=${id}`, function (err, result, fields) {      
        if (err) throw err;     
        res.json(JSON.parse(JSON.stringify(result)));
      });
      
    });*/



app.listen(3001)