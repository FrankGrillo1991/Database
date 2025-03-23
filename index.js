const express = require('express');
const app = express();
const sqlite3 = require('sqlite3');

// Connecting Database
let db = new sqlite3.Database(":memory:" , (err) => {
    if(err) {
        console.log("Error Occurred - " + err.message)
    } else {
        console.log("DataBase Connected");
    }
})

app.get('/' , (req , res) => {
    res.send("GeeksforGeeks");
})

// Server Running
app.listen(4000, () => {
    console.log("Server started");

    // Query
    var createQuery = 'CREATE TABLE GFG ( ID NUMBER , NAME VARCHAR(100));';
    var insertQuery = 'INSERT INTO GFG (ID, NAME) VALUES (1 , "GeeksforGeeks");'
    var selectQuery = 'SELECT * FROM GFG ;'

    // Running Query
    db.run(createQuery, (err) => {
        if(err) return;

        // Success
        console.log("Table Created");
        db.run(insertQuery , (err) => {
            if(err) return;

            // Success
            console.log("Insertion Done");
            db.all(selectQuery, (err, data) => {
                if(err) return;

                // Success 
                console.log(data);
            });
        });
    });
})