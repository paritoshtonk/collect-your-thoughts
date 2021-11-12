var express = require('express');
const fs = require("fs");
var router = express.Router();
var db = require('../bin/db');

router.get('/', function (req, res, next) {
    console.log("Get Notes");
    var categories = [];
    const query = fs.readFileSync('./scripts/getNotes.sql').toString();
    db.each(query,
        (err, row) => {
            if (row) {
                if (categories.length == 0 ||
                    categories[categories.length - 1].name != row.category_name
                ) {
                    categories.push({ name: row.category_name, id: row.category_id, notes: [] });
                }
                categories[categories.length - 1].notes.push({ id: row.id, title: row.title, body: row.body, html: row.html });
            }
        },
        () => {
            res.json({ status: 'ok', data: categories });
        });
});

router.post('/', function (req, res, next) {
    console.log("Post Note");
    if (req.body.title == null || req.body.category_id == 0 || req.body.title == undefined || req.body.category_id == undefined) {
        res.json({ status: 'error', message: 'Invalid body' });
        return;
    }
    createNote(req.body.title, req.body.body, req.body.html, req.body.category_id, res);
});

router.delete('/:id', function (req, res, next) {
    console.log("Delete Note: " + req.params.id);
    const checkNoteQuery = fs.readFileSync('./scripts/checkNoteExist.sql').toString();
    db.get(checkNoteQuery, [req.params.id], (err, row) => {
        if (row.exists == 0) {
            res.json({ status: 'error', message: 'Note doesnt already exist', exist: false });
        } else {
            const deleteNoteQuery = fs.readFileSync('./scripts/deleteNote.sql').toString();
            db.run(deleteNoteQuery, [req.params.id], (err) => {
                if (err) {
                    res.json({ status: 'error', message: err.message, exist: true });
                } else {
                    res.json({ status: 'ok', message: "Note Deleted Successfully" });
                }
            });
        }
    })
});

router.put('/:id', function (req, res, next) {
    console.log("Put Note: " + req.params.id);
    if (req.params.id != req.body.id) {
        res.json({ status: 'error', message: 'Note id in param and body different.', exist: false });
        return;
    }
    const checkNoteQuery = fs.readFileSync('./scripts/checkNoteExist.sql').toString();
    db.get(checkNoteQuery, [req.params.id], (err, row) => {
        if (row.exists == 0) {
            createNote(req.body.title, req.body.body, req.body.html, req.body.category_id, res);
        } else {
            const updateNoteQuery = fs.readFileSync('./scripts/updateNote.sql').toString();
            db.run(updateNoteQuery, [req.body.title, req.body.body, req.body.html, req.params.id], (err) => {
                if (err) {
                    res.json({ status: 'error', message: err.message, exist: true });
                } else {
                    res.json({ status: 'ok', message: "Note Updated Successfully", exist: true });
                }
            });
        }
    })
});

function createNote(title, body, html, category_id, res) {
    const createNoteScript = fs.readFileSync('./scripts/createNote.sql').toString();
    db.run(createNoteScript, [title, body, html, category_id], (err, row) => {
        res.json({ status: 'ok', message: "Note Created Successfully", exist: false });
    });
}

module.exports = router;