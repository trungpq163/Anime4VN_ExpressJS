const db = require('../../db');

module.exports.index = (req, res, next) => {

    let homePage = "";
    let querySearch = "";

    let users = db.get('users').value();
    let itemAll = db.get('items').value();

    let page = parseInt(req.query.page) || 1; // default 1
    let perPage = 12;

    let start = (page - 1) * perPage;
    let end = page * perPage;

    var item = [];
    for (var i = itemAll.length - 1; i >= 0; i--) {
        item.push(itemAll[i]);
    }

    let items = item.slice(start, end);

    // pagination
    let countAllPages = Math.ceil(itemAll.length / perPage);
    let allPagesShow = [];
    let dotBefore = false;
    let dotAfter = false;
    let pageNext = 0;
    let pagePrev = 0;

    if (page === 1) {
        pagePrev = 1;
        pageNext = 2;
    }

    if (page === countAllPages) {
        pagePrev = countAllPages - 1;
        pageNext = countAllPages;
    }

    if (page > 1 && page < countAllPages) {
        pageNext = page + 1;
        pagePrev = page - 1;
    }

    if (page + 3 <= countAllPages) {
        dotAfter = true;
    }

    if (page === countAllPages - 2) {
        dotAfter = true;
    }

    if (page >= 3) {
        dotBefore = true;
    }

    if (page < countAllPages && page > 1) {
        allPagesShow = [page - 1, page, page + 1];
    }

    if (countAllPages === 2) {
        allPagesShow = [1, 2];
    }

    if (countAllPages === 3) {
        allPagesShow = [1, 2, 3];
    }

    if (page === 1 && page < countAllPages) {
        if (countAllPages >= 3) {
            allPagesShow = [1, 2, 3];
        }
    }

    if (page === countAllPages - 1 && countAllPages > 3) {
        allPagesShow = [page - 1, page, page + 1];
    }

    if (page === countAllPages && countAllPages > 3) {
        allPagesShow = [page - 2, page - 1, page];
    }


    res.render('index', {
        users: users,
        items: items,
        // pagination
        pageNow: page,
        pagePrev: pagePrev,
        pageNext: pageNext,
        endPage: countAllPages,
        allPagesShow: allPagesShow,
        dotAfter: dotAfter,
        dotBefore: dotBefore,
        homePage: homePage,
        querySearch: querySearch
        //
    });
    next();
}