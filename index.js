const express = require('express');
var expressLayouts = require('express-ejs-layouts');
const app = express();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const logger = require('morgan');
const serveIndex = require('serve-index')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/assets')
    },
    filename: (req, file, cb) => {
        //cb(null, /*file.fieldname + '-' +*/ Date.now() + "___" + file.originalname); //+ path.extname(file.originalname))
        console.log(file.originalname);
        cb(null, file.originalname);
    }
});

const mUpload = multer({ storage: storage });
//const upload = multer({dest: 'uploads/'});

app.use(logger('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use('/fileServ', express.static('public'), serveIndex('public', { 'icons': true }));

const port = process.env.PORT || 80;
app.listen(port, () => {
    console.log('Server is up and running on port ', port);
});




app.get('/', function (req, res) {
    return res.send("Main GET return")
})

app.post('/testUpload', mUpload.single('file'), function (req, res) {
    console.log('storage location is ', req.hostname + '/' + req.file.path);
    return res.send(req.file);
})

app.get('/uploadform', (req, res) => {
    res.render('upload');
});


app.get('/video/:name', function (req, res) {
    //const path = 'public/assets/' + req.params.name + '.mp4'
    const path = 'public/assets/' + req.params.name;
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-")
        const start = parseInt(parts[0], 10)
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize - 1
        const chunksize = (end - start) + 1
        const file = fs.createReadStream(path, { start, end })
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        }
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        }
        res.writeHead(200, head)
        fs.createReadStream(path).pipe(res)
    }
});

app.get('/getmovielist', function (req, res) {
    var fileNames = [];
    fs.readdir('public/assets/', (err, files) => {
        if (files === undefined){
            console.log("files is undefined");
            res.send("ERROR files empty");
            return;
        };
        files.forEach(file => {
            fileNames.push(file);
        });
        res.send(fileNames);
    });
});










//const debug = require('debug')('myapp:server');
//if end point is /users/, use the router.
//app.use('/users', userRouter);