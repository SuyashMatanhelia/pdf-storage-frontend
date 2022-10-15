var express = require('express');
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
var multer = require('multer');

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

var firebase = require('firebase/app');
var firebaseStorage = require('firebase/storage')

var app = express();
var port = process.env.PORT || 4000;

var mysql = require('mysql');
var conn = mysql.createConnection({
  host: 'localhost', 
  user: 'root',     
  password: '',      
  database: 'pdf-storage' 
}); 
conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});

const firebaseConfig = {
   apiKey: "AIzaSyD6eii6uUD34l3HLtrqcrdpdqYbYE2Vi98",
   authDomain: "pdf-stora.firebaseapp.com",
   projectId: "pdf-stora",
   storageBucket: "pdf-stora.appspot.com",
   messagingSenderId: "694305933691",
   appId: "1:694305933691:web:0b80888cfb40dee7f4d5de",
   measurementId: "G-JW1691MMMP"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const storage = firebaseStorage.getStorage(firebaseApp);

const ref = firebaseStorage.ref(storage, "images");


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
  
app.get('/', (req, res) => {
    res.send('Node js file upload rest apis');
});

const upload = multer({ dest: "./temp/data/uploads/" });
 
app.post('/upload', upload.single('file'), async (req, res) => {
   const { college, course, subject, semester } = req.body;
   const file = req.file;
   if (!file) {
      return res.status(400).send({ message: 'Please upload a file.' });
   }

   var path = file.path;
   path = path.split("\\");
   path = path[0]+"/"+path[1]+"/"+path[2]+"/"+path[3];

   console.log(path);

   var sql = "INSERT INTO `pdf-collection` (`id`, `name`, `url`, `college`, `course`, `subject`, `semester`) VALUES ("+null+", '"+ file.originalname +"', '"+ path +"', '"+ college +"', '"+ course +"', '"+ subject +"', "+ semester +");";
   conn.query(sql, function(err, result) {
       if(err) {
         return res.status(400).json({ message: err })
       }
       return res.send({ message: 'File is successfully stored.', result });
    });
});

app.get('/retrieve', async (req, res) => {
   const { college, course, subject, semester } = req.query;
   console.log(college)
   var sql = "SELECT * FROM `pdf-collection` WHERE `college` = '" + college +"' OR `course` = '" + course +"' OR `subject` = '" + subject + "'" +" OR `semester` = '" + semester + "'";
   console.log(sql)
   conn.query(sql, function(err, result) {
      if(err) {
        return res.status(400).json({ message: err })
      }
      return res.send({ message: 'File(s) retrieved', result });
   });
})
 
app.listen(port, () => {
    console.log('Server started on: ' + port);
});