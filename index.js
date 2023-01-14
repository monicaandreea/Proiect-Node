const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/users', require('./routes/api/users'))

app.listen(3000, () => {
    console.log('Server started.')
})

// create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: "nodeprojectdb"
})

db.connect (err => {
    if(err) {
        throw err
    }
    console.log('MySQL connected')
});

// create database
app.get('/createdb', (req, res) => {
    let sql = "CREATE DATABASE nodeprojectdb"
    db.query(sql, err => {
        if(err) {
            throw err;
        }
        res.send("Database Created");
    });
});

//create table

app.get('/createusers', (req, res) => {
    let sql = 'CREATE TABLE users(id int AUTO_INCREMENT, username VARCHAR(255), email VARCHAR(255), PRIMARY KEY(id))'
    db.query(sql, err => {
        if(err){
            throw err
        }
        res.send('Users table created.')
    })
})

//insert  user
app.get('/user1', (req, res) => {
    let post = {username: 'monica1', email: 'monica1@gmail.com'}
    let sql = 'INSERT INTO users SET ?'
    let query = db.query(sql, post, err => {
        if(err){
            throw err
        }
        res.send('User added.')
    })
})