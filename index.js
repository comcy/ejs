define("src/index", ["require", "exports", "express"], function (require, exports, express) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var app = express();
    app.set('view engine', 'ejs');
    app.get('/', function (req, res) {
        res.render('pages/index');
    });
    app.get('/about', function (req, res) {
        res.render('pages/about');
    });
    app.listen(8080);
    console.log('8080 is the magic port');
});
//# sourceMappingURL=index.js.map