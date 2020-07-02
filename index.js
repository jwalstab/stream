const express = require('express');
var expressLayouts = require('express-ejs-layouts');
const app = express();
const path = require('path');
const multer = require('multer');
const logger = require('morgan');
const serveIndex = require('serve-index')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, /*file.fieldname + '-' +*/ Date.now() + "___" + file.originalname); //+ path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });
//const upload = multer({dest: 'uploads/'});

app.use(logger('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname,'public')));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use('/fileServ', express.static('public'), serveIndex('public', {'icons': true}));

app.get('/', function(req,res) {
    return res.send("Main GET return")
})

app.post('/testUpload', upload.single('file'), function(req,res) {
    console.log('storage location is ', req.hostname +'/' + req.file.path);
    return res.send(req.file);
})

app.get('/uploadform', (req, res) => {
    res.render('upload');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server is up and running on port ', port);
});











//const debug = require('debug')('myapp:server');
//if end point is /users/, use the router.
//app.use('/users', userRouter);