const http = require('http');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const helper = require('./helper/helper');

const hostname = '127.0.0.1';
const port = 3000;

//helper
helper.hello();
helper.hello1();
helper.hello2('Dau');

//mongo db
mongoose.connect('mongodb://dophu17:1@ds125255.mlab.com:25255/node-todo');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  	// we're connected!
  	console.log('mongo db connected');
  	var todoSchema = new Schema({
  		text: String,
  		isDone: Boolean
  	});
  	var Todo = mongoose.model('Todo', todoSchema);

  	//get all
  	var where = {};
  	// where['text'] = 'Dau Hu Thom';
  	// where['isDone'] = false;
  	console.log(where);
  	Todo.find(where, function(err, data) {
  		if ( err ) return console.log(err);
  		console.log(data);
  	});

  	//save
  	// Todo.create({ text: 'Dau Hu Thom', isDone: false }, function(err, data){
  	// 	if ( err ) return console.log(err);
  	// 	console.log(data);
  	// });
});

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});