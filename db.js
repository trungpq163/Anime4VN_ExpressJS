const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');

db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({
        users: [],
        admin: [],
        keyAdmin: [],
        items: [],
        itemsAnime: []
    })
    .write();

module.exports = db;