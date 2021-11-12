
const fs = require("fs");
const dbFile = "./sqlite.db";
const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(dbFile);

const dataSql = fs.readFileSync('./scripts/createdb.sql').toString();
//Adding the query in ( query ); format so the delimiter is );
const dataArr = dataSql.toString().split(';');
db.serialize(() => {
    if (!exists) {

        console.log('Database doesnot exist.');
        console.log('Creating Database.');
        // db.run runs your SQL query against the DB 
        db.run('PRAGMA foreign_keys=OFF;');
        db.run('BEGIN TRANSACTION;');
        // Loop through the `dataArr` and db.run each query
        dataArr.forEach((query) => {
            if (query) {
                // Add the delimiter back to each query before you run them
                // In my case the it was `);`      
                query += ';';
                db.run(query, (err) => {
                    if (err) throw err;
                });
            }
        });
        db.run('COMMIT;');
        console.log('Database created');
    } else {
        console.log('Database "Category" ready to go!');
        db.each("SELECT * from Category", (err, row) => {
            if (row) {
                console.log(`record: ${row.category_name}`);
            }
        }, () => {
            console.log('Database "Category" Printed');
        });

        console.log('Database "Notes" ready to go!');
        db.each("SELECT * from Notes", (err, row) => {
            if (row) {
                console.log(`record: ${row.title}`);
            }
        }, () => {
            console.log('Database "Notes" Printed');
        });
    }
});

module.exports = db;