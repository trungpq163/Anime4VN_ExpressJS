const shortid = require("shortid");
const db = require("../../db");

module.exports = function (req, res, next) {
    if (!req.signedCookies.sessionId) {
        let sessionId = shortid.generate();
        let number = "1";
        res.cookie("sessionId", sessionId, {
            signed: true
        });
        db.get("view").push({
            number: number,
            id: sessionId
        }).write();
    }
    next();
};