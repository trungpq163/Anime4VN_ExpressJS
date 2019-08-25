const db = require("../../db");

module.exports.index = (req, res, next) => {
    let homePage = "";
    let querySearch = "";

    let users = db.get("users").value();

    // item update
    let itemAll = db.get("items").value();

    let page = parseInt(req.query.page) || 1; // default 1
    let perPage = 12;

    let start = (page - 1) * perPage;
    let end = page * perPage;

    let item = [];
    for (let i = itemAll.length - 1; i >= 0; i--) {
        item.push(itemAll[i]);
    }

    let items = item.slice(start, end);

    // item anime
    let itemsAnimeAll = db.get("itemsAnime").value();

    let perPageAnime = 8;
    let startAnime = (page - 1) * perPageAnime;
    let endAnime = page * perPageAnime;

    let itemAnime = [];
    for (let i = itemsAnimeAll.length - 1; i >= itemsAnimeAll.length - 8; i--) {
        itemAnime.push(itemsAnimeAll[i]);
    }

    //let itemsAnime = itemAnime.slice(startAnime, endAnime);
    let itemsAnime = itemAnime;
    // item anime random
    let itemAnimeRandom = [];
    //   var itemRandom =
    //     itemsAnimeAll[Math.floor(Math.random() * itemsAnimeAll.length)];

    for (let i = itemsAnimeAll.length - 1; i >= itemsAnimeAll.length - 8; i--) {
        itemAnimeRandom.push(
            itemsAnimeAll[Math.floor(Math.random() * itemsAnimeAll.length)]
        );
    }

    // pagination itemUpdate
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

    // favorite
    let userId = req.signedCookies.userId;
    let userFavorite = db.get('favorite').filter({
        userId: userId
    }).value();

    let arrFavorite = [];
    for (let i = 0; i < userFavorite.length; i++) {
        arrFavorite.push(userFavorite[i].url);
    }

    res.render("index", {
        users: users,
        items: items,
        itemsAnime: itemsAnime,
        itemAnimeRandom: itemAnimeRandom,
        // pagination
        pageNow: page,
        pagePrev: pagePrev,
        pageNext: pageNext,
        endPage: countAllPages,
        allPagesShow: allPagesShow,
        dotAfter: dotAfter,
        dotBefore: dotBefore,
        homePage: homePage,
        querySearch: querySearch,
        //
        arrFavorite: arrFavorite
    });


    next();
};

module.exports.info = (req, res, next) => {
    let url = req.params.url;

    let items = db
        .get("itemsAnime")
        .find({
            url: url
        })
        .value();

    res.render("info/index", {
        items: items
    });

    next();
};

module.exports.playvideo = (req, res, next) => {
    let url = req.params.url;
    let ep = req.params.ep;

    let itemsAll = db.get("items").value();
    let itemFind = itemsAll.find(item => {
        return item.url === url && item.epvideo === ep;
    });

    // pagination
    let countItemsPagination = db.get('items').filter({
        url: url
    }).value();

    let lengthCountItemsPagination = countItemsPagination.length;

    let countItemsArr = [];
    for (let i = 1; i < lengthCountItemsPagination; i++) {
        countItemsArr = i;
    }

    res.render("video/home", {
        itemFind: itemFind,
        countItemsPagination: countItemsPagination
    });
    next();
};

module.exports.genre = (req, res, next) => {
    let genreRoute = req.params.genre;
    let items = db.get('itemsAnime').filter({
        genre: genreRoute
    }).value();

    res.render('genre/home', {
        items: items
    });
    next();
};

module.exports.season = (req, res, next) => {
    let seasonRoute = req.params.season;
    let items = db.get('itemsAnime').filter({
        season: seasonRoute
    }).value();
    res.render('season/home', {
        items: items
    });
    next();
};

module.exports.year = (req, res, next) => {
    let yearRoute = req.params.year;
    let items = db.get('itemsAnime').filter({
        year: yearRoute
    }).value();
    res.render('year/home', {
        items: items
    });
    next();
};

module.exports.favorite = (req, res, next) => {
    let animeId = req.params.id;
    let userId = req.signedCookies.userId;
    let anime = db.get('itemsAnime').find({
        id: animeId
    }).value();

    // validate data
    let favorite = db.get('favorite').find({
        userId: userId,
        id: animeId
    }).value();

    if (favorite !== undefined) {
        res.render('favorite/err', {
            errors: [
                'Bạn đã thêm phim này rùi.'
            ],
            values: req.body
        });
        return;
    }

    // write date
    db.get('favorite')
        .push({
            userId: userId,
            id: anime.id,
            title: anime.title,
            ortherTitle: anime.ortherTitle,
            scores: anime.scores,
            status: anime.status,
            genre: anime.genre,
            genreOrther: anime.genreOrther,
            season: anime.season,
            year: anime.year,
            url: anime.url,
            image: anime.image,
            backGround: anime.backGround
        }).write();

    res.redirect('/favorite/user/' + userId);
}

module.exports.userFavorite = (req, res, next) => {
    let userId = req.params.id;
    let items = db.get('favorite').filter({
        userId: userId,
    }).value();
    res.render('favorite/home', {
        items: items,
    });
    next();
}

module.exports.getDeleteFavorite = (req, res, next) => {
    let userId = req.signedCookies.userId;
    let animeId = req.params.id;

    let favoriteItem = db.get('favorite').find({
        userId: userId,
        id: animeId
    }).value();

    db.get('favorite')
        .remove({
            id: favoriteItem.id
        })
        .write();

    res.redirect('/');
    next();
}