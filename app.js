const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const multer = require('multer')

const mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'mydb.cfwgrzzwnov3.us-east-1.rds.amazonaws.com',
    user: 'oaksi',
    password: 'Break1down!',
    database: 'MessagesDB'
});



//app.use(bodyParser.urlencoded({extended: true }))

app.get('/', (req, res) => res.send('Hello World'))

app.get('/index', (req, res) => res.send('<h1>Hello World</h1>'))

app.use(multer().array())
app.post('/', function(req,res){
    connection.connect()
    var response = 'Hello ' + req.body.name + '!'
    
    console.log("hellO")
    
    connection.query('INSERT INTO Messages SET ?',req.body)
    connection.query('SELECT * FROM Messages', function (err, results, fields){
        response += '<table>'
        response += '<tr>'
        response += '<th>ID</th>'
        response += '<th>Name</th>'
        response += '<th>Message</th>'
        response += '</tr>'
        for (var i in results){
            response += '<tr><td>'
            response += results[i].MessageID
            response += '</td><td>'
            response += results[i].Name
            response += '</td><td>'
            response += results[i].Message
            response += '</td></tr>'
        }
        response += '</table>'
        console.log(response)
        res.send(response)
    })
    
    
    connection.end()
})

app.listen(3000, () => console.log('listening on port 3000'))