Create Table Category(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_name TEXT
);

Create Table Notes(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    body TEXT,
    html TEXT,
    category_id INTEGER,
    FOREIGN KEY (category_id) REFERENCES Category (id)
);

Insert into
    Category(category_name)
VALUES
    ("Personal"),
    ("Work"),
    ("Misc");